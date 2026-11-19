import type { ImageSourcePropType, TextStyle, ViewStyle } from 'react-native';

import { AVATAR_SIZE } from './avatar.constants';
import type { AvatarSize } from './avatar.types';

/** Up to two initials: first and last word ("Ada Lovelace" → "AL"), or the first letter of a single word. */
export const getInitials = (name: string | undefined) => {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean);
  const first = words[0];
  if (!first) return '';
  const last = words.length > 1 ? words[words.length - 1] : undefined;
  // Array.from keeps a letter made of two UTF-16 units (an emoji, many scripts) whole.
  return (Array.from(first)[0] ?? '') + (last ? (Array.from(last)[0] ?? '') : '');
};

export const toAvatarSize = (size: AvatarSize) => (typeof size === 'number' ? size : AVATAR_SIZE[size]);

export const toImageSource = (src: string | ImageSourcePropType | undefined): ImageSourcePropType | undefined =>
  typeof src === 'string' ? { uri: src } : src;

/** The avatars a group shows within `max`, and how many it folds into "+N". The "+N" takes the last slot. */
export const splitAvatars = <T>(avatars: readonly T[], max?: number) => {
  if (max === undefined || avatars.length <= max)
    return {
      shown: [...avatars],
      rest: 0,
    };
  const keep = Math.max(1, max - 1);
  return {
    shown: avatars.slice(0, keep),
    rest: avatars.length - keep,
  };
};

/** What a screen reader says for a group: "Maya, Daniel and 3 others". */
export const describeGroup = (names: readonly (string | undefined)[], rest: number) => {
  const named = names.filter(Boolean) as string[];
  if (rest === 0) return named.length > 1 ? `${named.slice(0, -1).join(', ')} and ${named[named.length - 1]}` : (named[0] ?? '');
  return `${named.join(', ')} and ${rest} ${rest === 1 ? 'other' : 'others'}`;
};

/** An avatar's box: a circle, or a square with the theme's `md` corners. */
export const getAvatarBox = (side: number, circle: boolean, squareRadius: number): ViewStyle => ({
  width: side,
  height: side,
  borderRadius: circle ? side / 2 : squareRadius,
});

/** Initials (or "+N") sized to the avatar. */
export const getInitialsSize = (side: number, scale: number): TextStyle => ({ fontSize: side * scale });

/** How far each avatar after the first tucks under the one before. */
export const getTuck = (index: number, side: number, overlap: number): ViewStyle | undefined =>
  index > 0 ? { marginStart: -side * overlap } : undefined;
