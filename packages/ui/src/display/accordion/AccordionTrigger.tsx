import { DisclosureLabel } from '@/core/components/DisclosureLabel';
import { Touchable } from '@/core/primitives/Touchable';
import { ACCORDION_DESIGN } from './accordion.constants';
import { styles, themed } from './accordion.styles';
import type { AccordionTriggerProps } from './accordion.types';
import { useAccordionTrigger } from './hooks/useAccordionTrigger';

/**
 * The heading that opens and closes its item. Its chevron can be any icon (`icon`, `renderIcon`), on either side or none
 * (`iconPosition`), turned or still (`rotation`). On the web, up and down arrows, Home and End move between headings.
 */
export const AccordionTrigger = ({
  children,
  style,
  styles: slots,
  icon,
  renderIcon,
  iconPosition,
  rotation,
  ...rest
}: AccordionTriggerProps) => {
  const { accordion, item, ref, keys } = useAccordionTrigger();
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
      disabled={item.disabled}
      onPress={() => accordion.toggle(item.value)}
      {...keys}
      focusable={!item.disabled}
      {...rest}
      style={[styles.trigger, themed(theme).trigger, style]}
    >
      <DisclosureLabel
        open={item.open}
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
