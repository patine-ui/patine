import type { AccessibilityActionEvent } from 'react-native';
import { Pressable, View } from 'react-native';

import { DISABLED_OPACITY } from '@/core/core.constants';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { Stroke } from './components/Stroke';
import { useSignaturePad } from './hooks/useSignaturePad';
import { CLEAR_ACTION, DEFAULT_SIGNATURE_LABELS, SIGNATURE_DEFAULTS, SIGNATURE_DESIGN } from './signature.constants';
import { styles } from './signature.styles';
import type { SignaturePadProps } from './signature.types';

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
  const look = SIGNATURE_DESIGN[theme.design];
  const labels = { ...DEFAULT_SIGNATURE_LABELS, ...labelsProp };
  const pad = useSignaturePad({ value, defaultValue, onValueChange, onBegin, onEnd, disabled });
  const color = strokeColor ?? theme.colors.text;
  return (
    <View
      style={[
        styles.pad,
        {
          height,
          backgroundColor: theme.colors[look.fill],
          borderRadius: theme.radius[look.radius],
          borderWidth: look.border === 'none' ? 0 : 1.5,
          borderStyle: look.border === 'dashed' ? 'dashed' : 'solid',
          borderColor: theme.colors[look.borderColor],
        },
        disabled && { opacity: DISABLED_OPACITY },
        style,
      ]}
      testID={testID}
    >
      <View style={[styles.baseline, { backgroundColor: theme.colors.border }]} />
      <Text theme={themeOverride} color="textSecondary" style={styles.cross} aria-hidden>
        ×
      </Text>
      {pad.empty ? (
        <View style={styles.placeholderBox} pointerEvents="none">
          <Text theme={themeOverride} color="textSecondary">
            {labels.placeholder}
          </Text>
        </View>
      ) : null}
      <View
        accessible
        accessibilityLabel={labels.label}
        accessibilityValue={{ text: pad.empty ? labels.empty : labels.signed }}
        accessibilityState={{ disabled }}
        accessibilityActions={pad.empty || disabled ? undefined : [{ name: CLEAR_ACTION, label: labels.clear }]}
        onAccessibilityAction={(e: AccessibilityActionEvent) => {
          if (e.nativeEvent.actionName === CLEAR_ACTION) pad.clear();
        }}
        role="img"
        style={[styles.canvas, !disabled && ({ cursor: 'crosshair', touchAction: 'none' } as object)]}
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
        <Pressable role="button" accessibilityLabel={labels.clear} onPress={pad.clear} style={styles.clear}>
          <Text theme={themeOverride} size="sm" weight="medium" color="primary">
            {labels.clear}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};
