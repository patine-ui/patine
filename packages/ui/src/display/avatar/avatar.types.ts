import type { ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { AVATAR_SIZE } from './avatar.constants';

export type AvatarSize = keyof typeof AVATAR_SIZE | number;
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The picture: a URL or an image source. Falls back to the initials when missing or when it fails to load */
  src?: string | ImageSourcePropType;
  /** The person or thing it stands for: read by screen readers, and the initials when there's no picture */
  name?: string;
  /** 'sm' (32), 'md' (40), 'lg' (56), or a number of points. Default: 'md' */
  size?: AvatarSize;
  /** Default: 'circle' */
  shape?: AvatarShape;
  style?: StyleProp<ViewStyle>;
}

export interface AvatarGroupProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The people, in order: `{ name, src }` */
  avatars: ReadonlyArray<Pick<AvatarProps, 'name' | 'src'>>;
  /** Show this many, then a "+N" for the rest. Default: all */
  max?: number;
  /** Default: 'md' */
  size?: AvatarSize;
  shape?: AvatarShape;
  /** How much each avatar tucks under the one before, as a share of its size. Default: 0.25 */
  overlap?: number;
  /** Names the group for screen readers. Default: the names, and how many more */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
