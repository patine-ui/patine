import { cloneElement, isValidElement } from 'react';

import { useCollapse } from '@/core/animation';
import { DisclosureLabel } from '@/core/components/DisclosureLabel';
import { Touchable } from '@/core/primitives/Touchable';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { hasShorthand } from '@/core/utils/shorthand.utils';
import { CollapsibleContext, useCollapsibleContext } from './CollapsibleContext';
import { COLLAPSIBLE_DESIGN } from './collapsible.constants';
import { styles, themed } from './collapsible.styles';
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
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const ctx = useCollapsible(props, theme);
  return (
    <ThemeScope theme={themeOverride}>
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
    </ThemeScope>
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
  styles: slots,
  icon,
  renderIcon,
  iconPosition,
  rotation,
  ...rest
}: CollapsibleTriggerProps) => {
  const ctx = useCollapsibleContext();
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
      disabled={ctx.disabled}
      onPress={ctx.toggle}
      {...rest}
      style={[styles.trigger, themed(theme).trigger, style]}
    >
      <DisclosureLabel
        open={ctx.open}
        theme={theme}
        look={look}
        options={{ icon, renderIcon, iconPosition, rotation }}
        labelStyle={slots?.label}
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
    <AnimatedView role="region" id={contentId} aria-labelledby={triggerId} aria-hidden={!open} style={[styles.collapse, collapse.style]}>
      <View onLayout={collapse.onContentLayout} style={style} {...rest}>
        {children}
      </View>
    </AnimatedView>
  );
};
