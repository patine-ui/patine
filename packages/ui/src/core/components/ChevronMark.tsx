import { View } from '@/core/primitives/View';
import { useContentColor } from '@/core/theme/ContentColor';
import { useDirection, useTheme } from '@/core/theme/ThemeProvider';
import { strokeOf } from '@/core/utils/style.utils';
import { styles } from './components.styles';

/** Arm length of the drawn chevron, in points. */

/**
 * A drawn chevron (a rotated corner, so no icon font or SVG) pointing forward or back in the reading direction. Without a
 * `color` it takes the Button's or tab's it sits in, else the secondary text color.
 */
export const ChevronMark = ({ color, direction = 'forward' }: { color?: string; direction?: 'forward' | 'back' }) => {
  const rtl = useDirection() === 'rtl';
  const contentColor = useContentColor();
  const theme = useTheme();
  const ink = color ?? contentColor ?? theme.colors.textSecondary;
  // react-native-web leaves isRTL undefined, which would point every chevron forward.
  const forward = (direction === 'forward') !== rtl;
  return <View aria-hidden style={[styles.chevronMark, forward ? styles.chevronForward : styles.chevronBack, strokeOf(ink)]} />;
};
