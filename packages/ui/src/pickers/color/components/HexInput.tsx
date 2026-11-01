import { TextInput, View } from 'react-native';

import { textStyle } from '@/core';
import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { coreStyles } from '@/core/core.styles';
import { HEX_MAX_LENGTH, SWATCH_CHECK } from '@/pickers/color/color.constants';
import { styles } from '@/pickers/color/color.styles';
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
  const c = theme.colors;
  return (
    <View style={[styles.hexRow, { gap: theme.spacing.sm }]}>
      {showPreview ? (
        <View style={[styles.preview, { backgroundColor: rgb, borderRadius: theme.radius.sm, borderColor: c.border }, slots?.preview]} />
      ) : null}
      <View style={styles.hexField}>
        <TextInput
          value={input.text}
          onChangeText={input.onChangeText}
          onBlur={input.onBlur}
          maxLength={HEX_MAX_LENGTH}
          autoCapitalize="characters"
          autoCorrect={false}
          accessibilityLabel={label}
          style={[
            textStyle(theme, 'md'),
            styles.hexInput,
            coreStyles.noOutline,
            {
              borderRadius: theme.radius.sm,
              borderColor: c.border,
              paddingStart: theme.spacing.md,
              paddingEnd: clipboard.copy ? 40 : theme.spacing.md,
              backgroundColor: c.background,
            },
            slots?.hexInput,
          ]}
          testID={testID}
        />
        {clipboard.copy ? (
          <Touchable
            theme={theme}
            onPress={() => clipboard.copy?.(value)}
            accessibilityRole="button"
            accessibilityLabel={clipboard.copied ? copiedLabel : copyLabel}
            style={[styles.hexButton, { borderRadius: theme.radius.sm }]}
            testID={testID ? `${testID}-copy` : undefined}
          >
            {clipboard.copied ? (
              <PickerText theme={theme} weight="bold" color="primary">
                {SWATCH_CHECK}
              </PickerText>
            ) : (
              <CopyIcon color={c.textSecondary} />
            )}
          </Touchable>
        ) : null}
      </View>
    </View>
  );
};
