import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { useQRCode } from './hooks/useQRCode';
import { DEFAULT_QR_BACKGROUND, DEFAULT_QR_COLOR, QRCODE_DESIGN } from './qrcode.constants';
import { styles } from './qrcode.styles';
import type { QRCodeProps } from './qrcode.types';

/**
 * A scannable QR code drawn with plain views: no SVG, no native code. Encodes any text or URL as UTF-8, at error-correction
 * level L, M, Q or H, in the smallest of the 40 versions that fits. Put a `logo` in the middle and it switches to level H.
 */
export const QRCode = (props: QRCodeProps) => {
  const {
    size = 200,
    color = DEFAULT_QR_COLOR,
    backgroundColor = DEFAULT_QR_BACKGROUND,
    logo,
    accessibilityLabel = 'QR code',
    theme: themeProp,
    design,
    style,
    testID,
  } = props;
  const { theme } = useComponentTheme(themeProp, design);
  const look = QRCODE_DESIGN[theme.design];
  const layout = useQRCode(props);
  if (!layout) return null;
  const { cell, offset, runs, logoSide } = layout;
  return (
    <View
      accessible
      role="img"
      accessibilityLabel={accessibilityLabel}
      style={[styles.frame, { width: size, height: size, backgroundColor, borderRadius: theme.radius[look.radius] }, style]}
      testID={testID}
    >
      {runs.map((run) => (
        <View
          key={`${run.y}-${run.x}`}
          style={[
            styles.module,
            { left: offset + run.x * cell, top: offset + run.y * cell, width: run.length * cell, height: cell, backgroundColor: color },
          ]}
        />
      ))}
      {logo ? (
        <View style={[styles.center, { padding: (size - logoSide) / 2 }]} pointerEvents="none">
          <View style={[styles.logo, { width: logoSide, height: logoSide, backgroundColor, borderRadius: theme.radius[look.logoRadius] }]}>
            {logo}
          </View>
        </View>
      ) : null}
    </View>
  );
};
