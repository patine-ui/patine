export const AVATAR_SIZE = {
  sm: 32,
  md: 40,
  lg: 56,
} as const;

/** Initials take this share of the avatar's size. */
export const INITIALS_SCALE = 0.4;

/** A group's ring around each avatar, in the background color, so overlapping ones stay apart. */
export const GROUP_RING = 2;
export const DEFAULT_OVERLAP = 0.25;
