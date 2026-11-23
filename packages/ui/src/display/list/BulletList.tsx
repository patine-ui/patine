import { startAlign } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useDirection } from '@/core/theme/ThemeProvider';
import { isTextContent } from '@/core/utils/text.utils';
import { BULLET } from './list.constants';
import { bulletStyles, styles } from './list.styles';
import type { BulletListProps } from './list.types';

/** A plain bulleted list, as in a note or an article: each item after a bullet at the start of its line, in either direction. */
export const BulletList = ({ items, theme: themeProp, design, style, styles: slots, ...rest }: BulletListProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = bulletStyles(theme);
  const dir = useDirection();
  return (
    <ThemeScope theme={themeOverride}>
      <View role="list" style={[sheet.root, style]} {...rest}>
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: items are plain content in a fixed order, with no id of their own.
          <View key={index} role="listitem" style={[styles.bulletItem, sheet.item, slots?.item]}>
            <Text color="textSecondary" aria-hidden style={slots?.bullet}>
              {BULLET}
            </Text>
            <View style={styles.text}>{isTextContent(item) ? <Text style={[startAlign[dir], slots?.text]}>{item}</Text> : item}</View>
          </View>
        ))}
      </View>
    </ThemeScope>
  );
};
