import { Children, cloneElement, type ReactElement, type Ref, useCallback, useEffect, useId, useRef, useState } from 'react';
import { type HostInstance, useWindowDimensions } from 'react-native';

import { usePresence } from '@/core/animation/hooks/usePresence';
import { IS_WEB } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { FloatingModal } from '@/overlays/popover/components/FloatingModal';
import { FloatingPanel } from '@/overlays/popover/components/FloatingPanel';
import { POPOVER_SIDE } from '@/overlays/popover/popover.constants';
import type { Size } from '@/overlays/popover/popover.types';
import { chain, liftToTopLayer, type TopLayerNode } from '@/overlays/popover/popover.utils';
import type { AnchorRect } from '@/overlays/sheet/sheet.types';
import { toLocalRect } from '@/overlays/sheet/sheet.utils';
import { useTooltip } from './hooks/useTooltip';
import { TOOLTIP_DESIGN } from './tooltip.constants';
import { styles, themed } from './tooltip.styles';
import type { TooltipChildProps, TooltipProps } from './tooltip.types';

/**
 * A short label for the element it wraps: on hover or keyboard focus on the web, on a long press on touch screens. It only
 * adds to the trigger's own accessible name: on the web the trigger points to it with `aria-describedby`.
 */
export const Tooltip = ({
  content,
  children,
  side = POPOVER_SIDE.top,
  align,
  sideOffset,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  style,
  theme: themeProp,
  design,
  testID,
}: TooltipProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = TOOLTIP_DESIGN[theme.design];
  const tooltip = useTooltip({ open, defaultOpen, onOpenChange, delayDuration });
  const { mounted, progress } = usePresence({ visible: tooltip.open, duration: theme.animation.duration });
  const windowSize = useWindowDimensions();
  const id = useId();
  const child = Children.only(children) as ReactElement<TooltipChildProps & { ref?: Ref<HostInstance> }>;
  const own = child.props;
  const ours = tooltip.triggerProps;
  // The trigger itself is measured, not the view around it: a trigger placed on its own (a floating button, absolutely
  // positioned) leaves that view empty at the parent's edge. The wrapper is the fallback for a child that doesn't pass refs.
  const wrapper = useRef<HostInstance>(null);
  const node = useRef<HostInstance | null>(null);
  const triggerRef = useCallback(
    (el: HostInstance | null) => {
      node.current = el;
      const theirs = own.ref;
      if (typeof theirs === 'function') theirs(el);
      else if (theirs) (theirs as { current: HostInstance | null }).current = el;
    },
    [own.ref]
  );
  const [rect, setRect] = useState<AnchorRect | null>(null);
  useEffect(() => {
    if (tooltip.open)
      (node.current ?? wrapper.current)?.measureInWindow((x, y, width, height) =>
        setRect({
          x,
          y,
          width,
          height,
        })
      );
  }, [tooltip.open]);
  // On the web the bubble goes to the browser's top layer, so no bar or card it's inside can cover or clip it.
  const lift = useCallback((el: HostInstance | null) => {
    liftToTopLayer(el as unknown as TopLayerNode | null);
  }, []);

  const trigger = cloneElement(child, {
    ref: triggerRef,
    onHoverIn: ours.onHoverIn && chain(own.onHoverIn, ours.onHoverIn),
    onHoverOut: ours.onHoverOut && chain(own.onHoverOut, ours.onHoverOut),
    onFocus: ours.onFocus && chain(own.onFocus, ours.onFocus),
    onBlur: ours.onBlur && chain(own.onBlur, ours.onBlur),
    onPressIn: chain(own.onPressIn, ours.onPressIn),
    onLongPress: chain(own.onLongPress, ours.onLongPress),
    'aria-describedby': IS_WEB && tooltip.open ? id : own['aria-describedby'],
  });

  const bubble = (area: Size, at: AnchorRect, ready: boolean) => (
    <FloatingPanel
      ref={IS_WEB ? lift : undefined}
      id={id}
      role="tooltip"
      pointerEvents="none"
      testID={testID}
      trigger={at}
      area={area}
      side={side}
      align={align}
      sideOffset={sideOffset ?? look.sideOffset}
      progress={progress}
      ready={ready}
      arrowColor={look.arrow ? theme.colors[look.background] : undefined}
      style={[IS_WEB && styles.webFixed, look.raised && [styles.raised, themed(theme).raised], themed(theme).bubble, style]}
    >
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text theme={themeOverride} size={look.textSize} color={look.foreground}>
          {content}
        </Text>
      ) : (
        content
      )}
    </FloatingPanel>
  );

  const screenArea = { x: 0, y: 0, ...windowSize };
  return (
    <ThemeScope theme={themeOverride}>
      <View ref={wrapper} collapsable={false}>
        {trigger}
      </View>
      {mounted && rect ? (
        IS_WEB ? (
          bubble(screenArea, rect, true)
        ) : (
          <FloatingModal visible={tooltip.open} onClose={tooltip.close}>
            {(area) => bubble(area ?? screenArea, toLocalRect(rect, area ?? screenArea), !!area)}
          </FloatingModal>
        )
      ) : null}
    </ThemeScope>
  );
};
