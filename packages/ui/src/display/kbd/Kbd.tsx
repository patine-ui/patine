import { Fragment } from 'react';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { KBD_SIZE } from './kbd.constants';
import { styles, themed } from './kbd.styles';
import type { KbdProps } from './kbd.types';
import { speakKeys } from './kbd.utils';

/**
 * A keyboard key, or a shortcut of several: <Kbd keys={['⌘', 'K']} />. Drawn as a keycap on the web and in brand, a flat
 * chip on iOS and Material. Screen readers say the symbols as words: "Command K".
 */
export const Kbd = ({ children, keys, separator, size = 'md', theme: themeProp, design, style, styles: slots, ...rest }: KbdProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const box = KBD_SIZE[size];
  const all = keys ?? (children ? [children] : []);
  return (
    <ThemeScope theme={themeOverride}>
      <View accessible aria-label={speakKeys(all)} style={[styles.row, style]} {...rest}>
        {all.map((key, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a shortcut can repeat a key.
          <Fragment key={i}>
            {i > 0 && separator ? (
              <Text size={box.text} color="textSecondary">
                {separator}
              </Text>
            ) : null}
            <View style={[styles.key, styles[size], themed(theme).key]}>
              <Text size={box.text} weight="medium" color="textSecondary" style={[styles.text, slots?.text]}>
                {key}
              </Text>
            </View>
          </Fragment>
        ))}
      </View>
    </ThemeScope>
  );
};
