import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { Avatar } from './Avatar';
import { DEFAULT_OVERLAP, GROUP_RING, INITIALS_SCALE } from './avatar.constants';
import { styles, themed } from './avatar.styles';
import type { AvatarGroupProps } from './avatar.types';
import { describeGroup, getAvatarBox, getInitialsSize, getTuck, splitAvatars, toAvatarSize } from './avatar.utils';

/**
 * A row of overlapping avatars, each ringed in the background color, with a "+N" for the rest past `max`: who's in a
 * project, a chat or a meeting. Read as one image: "Maya, Daniel and 3 others".
 */
export const AvatarGroup = ({
  avatars,
  max,
  size = 'md',
  shape = 'circle',
  overlap = DEFAULT_OVERLAP,
  accessibilityLabel,
  theme: themeProp,
  design,
  style,
  ...rest
}: AvatarGroupProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const { shown, rest: more } = splitAvatars(avatars, max);
  const side = toAvatarSize(size);
  const sheet = themed(theme);
  const ringed = side + GROUP_RING * 2;
  return (
    <ThemeScope theme={themeOverride}>
      <View
        accessible
        role="img"
        aria-label={accessibilityLabel ?? describeGroup(avatars.map((a) => a.name).slice(0, shown.length), more)}
        style={[styles.group, style]}
        {...rest}
      >
        {shown.map((avatar, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: two people can share a name; the order is the identity.
          <View key={i} aria-hidden style={getTuck(i, side, overlap)}>
            <Avatar {...avatar} size={ringed} shape={shape} style={sheet.ring} />
          </View>
        ))}
        {more > 0 ? (
          <View
            aria-hidden
            style={[
              sheet.ring,
              getTuck(1, side, overlap),
              getAvatarBox(ringed, shape === 'circle', theme.radius.md),
              styles.more,
              sheet.moreFill,
            ]}
          >
            <Text weight="medium" color="textSecondary" maxFontSizeMultiplier={1} style={getInitialsSize(side, INITIALS_SCALE * 0.9)}>
              {`+${more}`}
            </Text>
          </View>
        ) : null}
      </View>
    </ThemeScope>
  );
};
