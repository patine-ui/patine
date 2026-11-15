import { Animated, View } from 'react-native';

import { useCollapse } from '@/core/animation';
import { useAccordion, useAccordionItem } from './AccordionContext';
import { styles } from './accordion.styles';
import type { AccordionContentProps } from './accordion.types';

/** What an item shows while open. Its height animates open and shut, and it unmounts once closed. */
export const AccordionContent = ({ style, children, ...rest }: AccordionContentProps) => {
  const { theme } = useAccordion();
  const item = useAccordionItem();
  const collapse = useCollapse(item.open, theme.animation.duration);
  if (!collapse.mounted) return null;
  return (
    <Animated.View
      role="region"
      id={item.contentId}
      aria-labelledby={item.triggerId}
      aria-hidden={!item.open}
      style={[styles.collapse, { height: collapse.height }]}
    >
      <View onLayout={collapse.onContentLayout} style={[{ paddingBottom: theme.spacing.lg }, style]} {...rest}>
        {children}
      </View>
    </Animated.View>
  );
};
