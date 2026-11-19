import { useCollapse } from '@/core/animation';
import { AnimatedView, View } from '@/core/primitives/View';
import { useAccordion, useAccordionItem } from './AccordionContext';
import { styles, themed } from './accordion.styles';
import type { AccordionContentProps } from './accordion.types';

/** What an item shows while open. Its height animates open and shut, and it unmounts once closed. */
export const AccordionContent = ({ style, children, ...rest }: AccordionContentProps) => {
  const { theme } = useAccordion();
  const item = useAccordionItem();
  const collapse = useCollapse(item.open, theme.animation.duration);
  if (!collapse.mounted) return null;
  return (
    <AnimatedView
      role="region"
      id={item.contentId}
      aria-labelledby={item.triggerId}
      aria-hidden={!item.open}
      style={[styles.collapse, collapse.style]}
    >
      <View onLayout={collapse.onContentLayout} style={[themed(theme).content, style]} {...rest}>
        {children}
      </View>
    </AnimatedView>
  );
};
