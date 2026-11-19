import { Button } from '@/actions/button/Button';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { TextArea } from '@/inputs/textfield/TextArea';
import { styles, themed } from './chat.styles';
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
  const words = useLabels();
  const labels = { ...words.composer, ...labelsProp };
  const stoppable = sending && onStop !== undefined;
  const composer = useComposer({
    value,
    defaultValue,
    onValueChange,
    onSend,
    onStop: stoppable ? onStop : undefined,
    blocked: disabled || sending,
  });
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.composer, sheet.composer, style]}>
        {leading}
        <TextArea
          aria-label={labels.input}
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
          <Button size="icon" aria-label={labels.stop} onPress={onStop}>
            <View aria-hidden style={[styles.stopGlyph, sheet.onPrimaryFill]} />
          </Button>
        ) : (
          <Button size="icon" aria-label={labels.send} disabled={!composer.canSend} loading={sending} onPress={composer.send}>
            <Text aria-hidden weight="bold" style={[styles.sendGlyph, sheet.onPrimary]}>
              ↑
            </Text>
          </Button>
        )}
      </View>
    </ThemeScope>
  );
};
