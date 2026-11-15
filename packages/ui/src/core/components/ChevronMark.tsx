import { I18nManager, View } from 'react-native';

/** Arm length of the drawn chevron, in points. */
const SIZE = 8;

/** A drawn chevron (a rotated corner, so no icon font or SVG) pointing forward or back in the reading direction. */
export const ChevronMark = ({ color, direction = 'forward' }: { color: string; direction?: 'forward' | 'back' }) => {
  // react-native-web leaves isRTL undefined, which would point every chevron forward.
  const forward = (direction === 'forward') !== !!I18nManager.isRTL;
  return (
    <View
      aria-hidden
      style={{
        width: SIZE,
        height: SIZE,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderRadius: 1,
        borderColor: color,
        transform: [{ rotate: forward ? '45deg' : '-135deg' }],
      }}
    />
  );
};
