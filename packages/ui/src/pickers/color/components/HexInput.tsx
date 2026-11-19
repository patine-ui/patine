import { commonStyles } from '@/core/core.styles';
import { Input } from '@/core/primitives/Input';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { HEX_MAX_LENGTH, SWATCH_CHECK } from '@/pickers/color/color.constants';
import { styles, themed } from '@/pickers/color/color.styles';
import type { HexInputProps } from '@/pickers/color/color.types';
import { useCopy } from '@/pickers/color/hooks/useCopy';
import { useHexInput } from '@/pickers/color/hooks/useHexInput';
import { CopyIcon } from './ColorIcons';

/** The hex code to read, type or copy, with the copy button in its end corner. */
export const HexInput = ({
  value,
  rgb,
  label,
  onValueChange,
  copy,
  copyLabel,
  copiedLabel,
  showPreview = false,
  theme,
  slots,
  testID,
}: HexInputProps) => {
  const input = useHexInput(value, onValueChange);
  const clipboard = useCopy(copy);
  return (
    <View style={[styles.hexRow, commonStyles(theme).gapSm]}>
      {showPreview ? <View style={[styles.preview, themed(theme).small, fillOf(rgb), slots?.preview]} /> : null}
      <View style={styles.hexField}>
        <Input
          theme={theme}
          value={input.text}
          onChangeText={input.onChangeText}
          onBlur={input.onBlur}
          maxLength={HEX_MAX_LENGTH}
          autoCapitalize="characters"
          autoCorrect={false}
          aria-label={label}
          style={[
            styles.hexInput,
            themed(theme).hexInput,
            clipboard.copy ? themed(theme).hexPadCopy : themed(theme).hexPad,
            slots?.hexInput,
          ]}
          testID={testID}
        />
        {clipboard.copy ? (
          <Touchable
            theme={theme}
            onPress={() => clipboard.copy?.(value)}
            role="button"
            aria-label={clipboard.copied ? copiedLabel : copyLabel}
            style={[styles.hexButton, themed(theme).small]}
            testID={testID ? `${testID}-copy` : undefined}
          >
            {clipboard.copied ? (
              <Text theme={theme} weight="semibold" color="primary">
                {SWATCH_CHECK}
              </Text>
            ) : (
              <CopyIcon color={theme.colors.textSecondary} />
            )}
          </Touchable>
        ) : null}
      </View>
    </View>
  );
};
