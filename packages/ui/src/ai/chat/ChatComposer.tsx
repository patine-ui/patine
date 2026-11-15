import { View } from 'react-native';

import { Button } from '@/actions/button/Button';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { TextArea } from '@/inputs/textfield/TextArea';
import { COMPOSER_LABELS } from './chat.constants';
import { styles } from './chat.styles';
import type { ChatComposerProps } from './chat.types';
import { useComposer } from './hooks/useComposer';

/**
 * The message box under a chat: grows with the text, sends on the button or Enter (Shift+Enter for a new line), then clears.
 * With `onStop`, the button stops the reply while `sending`.
 */
export const ChatComposer = ({
  value,
  defaultValue,
  onValueChange,
  onSend,
  onStop,
  placeholder = 'Message',
  disabled = false,
  sending = false,
  leading,
  maxRows = 5,
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
}: ChatComposerProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const labels = { ...COMPOSER_LABELS, ...labelsProp };
  const stoppable = sending && onStop !== undefined;
  const composer = useComposer({
    value,
    defaultValue,
    onValueChange,
    onSend,
    onStop: stoppable ? onStop : undefined,
    blocked: disabled || sending,
  });
  return (
    <View style={[styles.composer, { gap: theme.spacing.sm, padding: theme.spacing.sm }, style]}>
      {leading}
      <TextArea
        theme={themeOverride}
        accessibilityLabel={labels.input}
        placeholder={placeholder}
        value={composer.text}
        onValueChange={composer.setText}
        onKeyPress={composer.onKeyPress}
        disabled={disabled}
        minRows={1}
        maxRows={maxRows}
        style={styles.input}
      />
      {stoppable ? (
        <Button theme={themeOverride} size="icon" accessibilityLabel={labels.stop} onPress={onStop}>
          <View aria-hidden style={[styles.stopGlyph, { backgroundColor: theme.colors.onPrimary }]} />
        </Button>
      ) : (
        <Button
          theme={themeOverride}
          size="icon"
          accessibilityLabel={labels.send}
          disabled={!composer.canSend}
          loading={sending}
          onPress={composer.send}
        >
          <Text aria-hidden weight="bold" style={[styles.sendGlyph, { color: theme.colors.onPrimary }]}>
            ↑
          </Text>
        </Button>
      )}
    </View>
  );
};
