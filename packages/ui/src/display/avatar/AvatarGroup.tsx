import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { Avatar } from './Avatar';
import { DEFAULT_OVERLAP, GROUP_RING, INITIALS_SCALE } from './avatar.constants';
import type { AvatarGroupProps } from './avatar.types';
import { describeGroup, splitAvatars, toAvatarSize } from './avatar.utils';

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
  const ring = {
    borderWidth: GROUP_RING,
    borderColor: theme.colors.background,
  };
  const tuck = -side * overlap;
  return (
    <View
      accessible
      role="img"
      aria-label={accessibilityLabel ?? describeGroup(avatars.map((a) => a.name).slice(0, shown.length), more)}
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      {...rest}
    >
      {shown.map((avatar, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: two people can share a name; the order is the identity.
        <View key={i} aria-hidden style={i > 0 ? { marginStart: tuck } : undefined}>
          <Avatar {...avatar} size={side + GROUP_RING * 2} shape={shape} theme={themeOverride} style={ring} />
        </View>
      ))}
      {more > 0 ? (
        <View
          aria-hidden
          style={[
            ring,
            {
              marginStart: tuck,
              width: side + GROUP_RING * 2,
              height: side + GROUP_RING * 2,
              borderRadius: shape === 'circle' ? side : theme.radius.md,
              backgroundColor: theme.colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Text
            theme={themeOverride}
            weight="medium"
            color="textSecondary"
            maxFontSizeMultiplier={1}
            style={{ fontSize: side * INITIALS_SCALE * 0.9 }}
          >
            {`+${more}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
