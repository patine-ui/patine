import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { isTextContent } from '@/core/utils/text.utils';
import { MESSAGE_FROM } from './chat.constants';
import { styles, themed } from './chat.styles';
import type { MessageBubbleProps } from './chat.types';

/** One chat message: mine at the end in the primary color, theirs at the start, with an optional name above and time under it. */
export const MessageBubble = ({
  from = MESSAGE_FROM.them,
  name,
  meta,
  theme: themeProp,
  design,
  style,
  styles: slots,
  children,
  ...rest
}: MessageBubbleProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.message, from === MESSAGE_FROM.me ? styles.mine : styles.theirs, style]} {...rest}>
        {name ? (
          <Text size="xs" weight="medium" color="textSecondary" style={sheet.caption}>
            {name}
          </Text>
        ) : null}
        <View style={[styles.bubble, sheet[from], slots?.bubble]}>
          {isTextContent(children) ? (
            <Text selectable style={[from === MESSAGE_FROM.me ? sheet.meText : sheet.themText, slots?.text]}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
        {meta ? (
          <Text size="xs" color="textSecondary" style={sheet.caption}>
            {meta}
          </Text>
        ) : null}
      </View>
    </ThemeScope>
  );
};
