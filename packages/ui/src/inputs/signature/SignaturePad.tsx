import type { AccessibilityActionEvent } from 'react-native';

import { cs } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { Stroke } from './components/Stroke';
import { useSignaturePad } from './hooks/useSignaturePad';
import { CLEAR_ACTION, SIGNATURE_DEFAULTS } from './signature.constants';
import { styles, themed } from './signature.styles';
import type { SignaturePadProps } from './signature.types';
import { getPadHeight } from './signature.utils';

/**
 * A pad to sign with a finger, a pen or the mouse, drawn with plain views. `value` is the strokes as points: turn them
 * into an SVG with `signatureToSvg` to save or upload, or a path with `signatureToPath` to draw with react-native-svg.
 */
export const SignaturePad = ({
  value,
  defaultValue,
  onValueChange,
  onBegin,
  onEnd,
  strokeColor,
  strokeWidth = SIGNATURE_DEFAULTS.strokeWidth,
  height = SIGNATURE_DEFAULTS.height,
  showClear = true,
  disabled = false,
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
  testID,
}: SignaturePadProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const words = useLabels();
  const labels = { ...words.signature, ...labelsProp };
  const pad = useSignaturePad({ value, defaultValue, onValueChange, onBegin, onEnd, disabled });
  const color = strokeColor ?? theme.colors.text;
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.pad, getPadHeight(height), sheet.pad, disabled && cs.disabled, style]} testID={testID}>
        <View style={[styles.baseline, sheet.baseline]} />
        <Text color="textSecondary" style={styles.cross} aria-hidden>
          ×
        </Text>
        {pad.empty ? (
          <View style={styles.placeholderBox} pointerEvents="none">
            <Text color="textSecondary">{labels.placeholder}</Text>
          </View>
        ) : null}
        <View
          accessible
          aria-label={labels.label}
          aria-valuetext={pad.empty ? labels.empty : labels.signed}
          aria-disabled={disabled}
          accessibilityActions={pad.empty || disabled ? undefined : [{ name: CLEAR_ACTION, label: labels.clear }]}
          onAccessibilityAction={(e: AccessibilityActionEvent) => {
            if (e.nativeEvent.actionName === CLEAR_ACTION) pad.clear();
          }}
          role="img"
          style={[styles.canvas, !disabled && styles.drawable]}
          {...pad.panHandlers}
          testID={testID ? `${testID}-canvas` : undefined}
        >
          {pad.strokes.map((stroke, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: strokes only grow at the end, or clear all at once.
            <Stroke key={i} stroke={stroke} color={color} width={strokeWidth} />
          ))}
          <Stroke stroke={pad.current} color={color} width={strokeWidth} />
        </View>
        {showClear && !pad.empty && !disabled ? (
          <Touchable theme={theme} role="button" aria-label={labels.clear} onPress={pad.clear} style={styles.clear}>
            <Text size="sm" weight="medium" color="primary">
              {labels.clear}
            </Text>
          </Touchable>
        ) : null}
      </View>
    </ThemeScope>
  );
};
