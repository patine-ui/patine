import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { INITIALS_SCALE } from './avatar.constants';
import { styles, themed } from './avatar.styles';
import type { AvatarProps } from './avatar.types';
import { getAvatarBox, getInitials, getInitialsSize, toAvatarSize, toImageSource } from './avatar.utils';

/** A person's picture, or their initials when there's none or it fails to load. Named by `name` for screen readers. */
export const Avatar = ({ src, name, size = 'md', shape = 'circle', theme: themeProp, design, style, testID, ...rest }: AvatarProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [failed, setFailed] = useState(false);
  const side = toAvatarSize(size);
  const source = toImageSource(src);
  const showImage = !!source && !failed;

  return (
    <ThemeScope theme={themeOverride}>
      <View
        role="img"
        testID={testID}
        aria-label={name}
        style={[styles.avatar, getAvatarBox(side, shape === 'circle', theme.radius.md), themed(theme).fill, style]}
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
          <Text weight="medium" color="primary" maxFontSizeMultiplier={1} style={getInitialsSize(side, INITIALS_SCALE)} aria-hidden>
            {getInitials(name).toUpperCase()}
          </Text>
        )}
      </View>
    </ThemeScope>
  );
};
