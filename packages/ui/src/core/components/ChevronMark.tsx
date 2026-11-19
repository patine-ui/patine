import { View } from '@/core/primitives/View';
import { useDirection } from '@/core/theme/ThemeProvider';
import { strokeOf } from '@/core/utils/style.utils';
import { styles } from './components.styles';

/** Arm length of the drawn chevron, in points. */

/** A drawn chevron (a rotated corner, so no icon font or SVG) pointing forward or back in the reading direction. */
export const ChevronMark = ({ color, direction = 'forward' }: { color: string; direction?: 'forward' | 'back' }) => {
  const rtl = useDirection() === 'rtl';
  // react-native-web leaves isRTL undefined, which would point every chevron forward.
  const forward = (direction === 'forward') !== rtl;
  return <View aria-hidden style={[styles.chevronMark, forward ? styles.chevronForward : styles.chevronBack, strokeOf(color)]} />;
};
