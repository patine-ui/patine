import { cloneElement, isValidElement } from 'react';
import { Animated, View } from 'react-native';

import { useCollapse } from '@/core/animation';
import { DisclosureLabel } from '@/core/components/DisclosureLabel';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { focusOutline } from '@/core/utils/focus.utils';
import { hasShorthand } from '@/core/utils/shorthand.utils';
import { CollapsibleContext, useCollapsibleContext } from './CollapsibleContext';
import { COLLAPSIBLE_DESIGN } from './collapsible.constants';
import { styles } from './collapsible.styles';
import type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps, SlotProps } from './collapsible.types';
import { useCollapsible } from './hooks/useCollapsible';

/**
 * A section that shows and hides its content. Give it a `trigger` and its children are the content; or compose a
 * CollapsibleTrigger and the CollapsibleContent it opens for full control.
 */
export const Collapsible = (props: CollapsibleProps) => {
  const {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    disabled: _disabled,
    theme: themeProp,
    design,
    trigger,
    children,
    ...rest
  } = props;
  const { theme } = useComponentTheme(themeProp, design);
  const ctx = useCollapsible(props, theme);
  return (
    <CollapsibleContext.Provider value={ctx}>
      <View {...rest}>
        {hasShorthand(trigger) ? (
          <>
            <CollapsibleTrigger asChild={isValidElement(trigger)}>{trigger}</CollapsibleTrigger>
            <CollapsibleContent>{children}</CollapsibleContent>
          </>
        ) : (
          children
        )}
      </View>
    </CollapsibleContext.Provider>
  );
};

/**
 * Opens and closes its Collapsible. Draws its label with a chevron that can be any icon (`icon`, `renderIcon`), on either side
 * or none (`iconPosition`), turned or still (`rotation`). With `asChild`, its one child is the trigger.
 */
export const CollapsibleTrigger = ({
  children,
  asChild = false,
  style,
  labelStyle,
  icon,
  renderIcon,
  iconPosition,
  rotation,
  onFocus,
  onBlur,
  ...rest
}: CollapsibleTriggerProps) => {
  const ctx = useCollapsibleContext();
  const focus = useFocusVisible();
  const { theme } = ctx;
  const look = COLLAPSIBLE_DESIGN[theme.design];

  if (asChild && isValidElement<SlotProps>(children))
    return cloneElement(children, {
      id: ctx.triggerId,
      'aria-expanded': ctx.open,
      'aria-controls': ctx.contentId,
      disabled: ctx.disabled || children.props.disabled,
      onPress: (...args: never[]) => {
        children.props.onPress?.(...args);
        ctx.toggle();
      },
    });

  return (
    <Touchable
      ref={ctx.triggerRef}
      theme={theme}
      role="button"
      id={ctx.triggerId}
      aria-controls={ctx.contentId}
      aria-expanded={ctx.open}
      aria-disabled={ctx.disabled}
      disabled={ctx.disabled}
      onPress={ctx.toggle}
      onFocus={(e) => {
        focus.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focus.onBlur();
        onBlur?.(e);
      }}
      {...rest}
      style={[
        styles.trigger,
        { minHeight: look.minHeight, gap: theme.spacing.sm, paddingVertical: theme.spacing.sm, borderRadius: theme.radius.sm },
        ctx.disabled && { opacity: DISABLED_OPACITY },
        focus.focusVisible && focusOutline(theme.colors.primary),
        style,
      ]}
    >
      <DisclosureLabel
        open={ctx.open}
        theme={theme}
        look={look}
        options={{ icon, renderIcon, iconPosition, rotation }}
        labelStyle={labelStyle}
      >
        {children}
      </DisclosureLabel>
    </Touchable>
  );
};

/** What the Collapsible shows while open. Its height animates open and shut (at once with reduce motion), and it unmounts once closed. */
export const CollapsibleContent = ({ style, children, ...rest }: CollapsibleContentProps) => {
  const { open, theme, contentId, triggerId } = useCollapsibleContext();
  const collapse = useCollapse(open, theme.animation.duration);
  if (!collapse.mounted) return null;
  return (
    <Animated.View
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      aria-hidden={!open}
      style={[styles.collapse, { height: collapse.height }]}
    >
      <View onLayout={collapse.onContentLayout} style={style} {...rest}>
        {children}
      </View>
    </Animated.View>
  );
};
