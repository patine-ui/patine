import { DisclosureLabel } from '@/core/components/DisclosureLabel';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { focusOutline } from '@/core/utils/focus.utils';
import { ACCORDION_DESIGN } from './accordion.constants';
import { styles } from './accordion.styles';
import type { AccordionTriggerProps } from './accordion.types';
import { useAccordionTrigger } from './hooks/useAccordionTrigger';

/**
 * The heading that opens and closes its item. Its chevron can be any icon (`icon`, `renderIcon`), on either side or none
 * (`iconPosition`), turned or still (`rotation`). On the web, up and down arrows, Home and End move between headings.
 */
export const AccordionTrigger = ({
  children,
  style,
  labelStyle,
  onFocus,
  onBlur,
  icon,
  renderIcon,
  iconPosition,
  rotation,
  ...rest
}: AccordionTriggerProps) => {
  const { accordion, item, ref, focus, keys } = useAccordionTrigger();
  const { theme } = accordion;
  const look = ACCORDION_DESIGN[theme.design];

  return (
    <Touchable
      ref={ref}
      theme={theme}
      role="button"
      id={item.triggerId}
      aria-controls={item.contentId}
      aria-expanded={item.open}
      aria-disabled={item.disabled}
      disabled={item.disabled}
      onPress={() => accordion.toggle(item.value)}
      {...keys}
      focusable={!item.disabled}
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
        item.disabled && { opacity: DISABLED_OPACITY },
        focus.focusVisible && focusOutline(theme.colors.primary),
        style,
      ]}
    >
      <DisclosureLabel
        open={item.open}
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
