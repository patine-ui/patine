import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { INITIALS_SCALE } from './avatar.constants';
import type { AvatarProps } from './avatar.types';
import { getInitials, toAvatarSize, toImageSource } from './avatar.utils';

/** A person's picture, or their initials when there's none or it fails to load. Named by `name` for screen readers. */
export const Avatar = ({ src, name, size = 'md', shape = 'circle', theme: themeProp, design, style, testID, ...rest }: AvatarProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [failed, setFailed] = useState(false);
  const side = toAvatarSize(size);
  const source = toImageSource(src);
  const showImage = !!source && !failed;

  return (
    <View
      role="img"
      testID={testID}
      aria-label={name}
      style={[
        {
          width: side,
          height: side,
          borderRadius: shape === 'circle' ? side / 2 : theme.radius.md,
          backgroundColor: theme.colors.primaryMuted,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
      {...rest}
    >
      {showImage ? (
        <Image
          source={source}
          onError={() => setFailed(true)}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          testID={testID ? `${testID}-image` : undefined}
        />
      ) : (
        <Text
          theme={themeOverride}
          weight="medium"
          color="primary"
          maxFontSizeMultiplier={1}
          style={{ fontSize: side * INITIALS_SCALE }}
          aria-hidden
        >
          {getInitials(name).toUpperCase()}
        </Text>
      )}
    </View>
  );
};
