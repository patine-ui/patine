import { Children, cloneElement, type ReactElement, useEffect, useId } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { usePresence } from '@/core/animation/hooks/usePresence';
import { IS_WEB } from '@/core/core.constants';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { FloatingModal } from '@/overlays/popover/components/FloatingModal';
import { FloatingPanel } from '@/overlays/popover/components/FloatingPanel';
import { POPOVER_SIDE } from '@/overlays/popover/popover.constants';
import type { Size } from '@/overlays/popover/popover.types';
import { chain } from '@/overlays/popover/popover.utils';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';
import type { AnchorRect } from '@/overlays/sheet/sheet.types';
import { toLocalRect } from '@/overlays/sheet/sheet.utils';
import { useTooltip } from './hooks/useTooltip';
import { TOOLTIP_DESIGN, TOOLTIP_MAX_WIDTH } from './tooltip.constants';
import { styles } from './tooltip.styles';
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
  const { ref, rect, measure } = useAnchor();
  useEffect(() => {
    if (tooltip.open) measure();
  }, [tooltip.open, measure]);

  const child = Children.only(children) as ReactElement<TooltipChildProps>;
  const own = child.props;
  const ours = tooltip.triggerProps;
  const trigger = cloneElement(child, {
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
      style={[
        IS_WEB && styles.webFixed,
        look.raised && [styles.raised, { borderColor: theme.colors.border, boxShadow: theme.shadows.md }],
        {
          maxWidth: TOOLTIP_MAX_WIDTH,
          backgroundColor: theme.colors[look.background],
          borderRadius: theme.radius[look.radius],
          paddingHorizontal: look.paddingX,
          paddingVertical: look.paddingY,
        },
        style,
      ]}
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
    <>
      <View ref={ref} collapsable={false}>
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
    </>
  );
};
