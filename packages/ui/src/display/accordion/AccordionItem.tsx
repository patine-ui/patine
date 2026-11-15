import { StyleSheet, View } from 'react-native';

import { AccordionItemContext, useAccordion } from './AccordionContext';
import type { AccordionItemProps } from './accordion.types';
import { itemIds } from './accordion.utils';

/** One section: an AccordionTrigger, then its AccordionContent. A line separates it from the next. */
export const AccordionItem = ({ value, disabled = false, style, children, ...rest }: AccordionItemProps) => {
  const accordion = useAccordion();
  const ids = itemIds(accordion.baseId, value);
  const item = {
    value,
    open: accordion.open.includes(value),
    disabled: accordion.disabled || disabled,
    triggerId: ids.trigger,
    contentId: ids.content,
  };
  return (
    <AccordionItemContext.Provider value={item}>
      <View style={[{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: accordion.theme.colors.border }, style]} {...rest}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
};
