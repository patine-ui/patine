import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import type { AccordionProps } from './accordion.types';
import { listItemValue } from './accordion.utils';
import { useAccordionState } from './hooks/useAccordionState';

/**
 * Stacked sections that open and close. Give it `items` ({ title, content }), or compose AccordionItems, each an
 * AccordionTrigger and its AccordionContent, for full control. One open at a time unless `type="multiple"`.
 */
export const Accordion = (props: AccordionProps) => {
  // Everything that isn't the accordion's own goes on the View; `collapsible` only exists on the single type.
  const {
    type: _type,
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    collapsible: _collapsible,
    disabled: _disabled,
    theme: themeProp,
    design,
    items,
    children,
    ...viewProps
  } = props as AccordionProps & { collapsible?: boolean };
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const ctx = useAccordionState(props, theme);
  return (
    <ThemeScope theme={themeOverride}>
      <AccordionContext.Provider value={ctx}>
        <View {...viewProps}>
          {items
            ? items.map((item, index) => {
                const value = listItemValue(item, index);
                return (
                  <AccordionItem key={value} value={value} disabled={item.disabled}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                );
              })
            : children}
        </View>
      </AccordionContext.Provider>
    </ThemeScope>
  );
};
