import { Fragment } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import { KBD_DESIGN, KBD_SIZE, MONO_FONT } from './kbd.constants';
import type { KbdProps } from './kbd.types';
import { speakKeys } from './kbd.utils';

const FONT = Platform.select({ ios: 'Menlo', android: 'monospace', default: MONO_FONT });

/**
 * A keyboard key, or a shortcut of several: <Kbd keys={['⌘', 'K']} />. Drawn as a keycap on the web and in brand, a flat
 * chip on iOS and Material. Screen readers say the symbols as words: "Command K".
 */
export const Kbd = ({
  children,
  keys,
  separator,
  size = 'md',
  theme: themeProp,
  design,
  style,
  textStyle: textStyleProp,
  ...rest
}: KbdProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = KBD_DESIGN[theme.design];
  const box = KBD_SIZE[size];
  const all = keys ?? (children ? [children] : []);
  return (
    <View
      accessible
      accessibilityLabel={speakKeys(all)}
      style={[{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 2 }, style]}
      {...rest}
    >
      {all.map((key, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: a shortcut can repeat a key.
        <Fragment key={i}>
          {i > 0 && separator ? (
            <PickerText theme={theme} size={box.text} color="textSecondary">
              {separator}
            </PickerText>
          ) : null}
          <View
            style={{
              height: box.height,
              minWidth: box.minWidth,
              paddingHorizontal: box.paddingX,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: look.radius,
              backgroundColor: theme.colors[look.fill],
              ...(look.keycap ? { borderWidth: StyleSheet.hairlineWidth, borderBottomWidth: 2, borderColor: theme.colors.border } : null),
            }}
          >
            <Text
              style={[
                textStyle(theme, box.text, 'medium'),
                { color: theme.colors.textSecondary, fontFamily: FONT, lineHeight: undefined },
                textStyleProp,
              ]}
            >
              {key}
            </Text>
          </View>
        </Fragment>
      ))}
    </View>
  );
};
