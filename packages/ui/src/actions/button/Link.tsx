import { useState } from 'react';
import { Linking } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { EXTERNAL_MARK, LINK_DESIGN, LINK_UNDERLINE } from './link.constants';
import type { LinkProps } from './link.types';

/**
 * A text link, inline in a sentence or on its own. With `href` it's a real `<a>` on the web (open in a new tab, copy the
 * address) and opens the browser on iOS and Android. Underlined as the design does it: always, on hover, or not at all.
 */
export const Link = ({
  children,
  href,
  onPress,
  external = false,
  underline,
  disabled = false,
  theme: themeProp,
  design,
  style,
  weight,
  ...rest
}: LinkProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = LINK_DESIGN[theme.design];
  const [hovered, setHovered] = useState(false);
  const line = underline ?? look.underline;
  const underlined = line === LINK_UNDERLINE.always || (line === LINK_UNDERLINE.hover && hovered);
  // react-native-web draws `href` as an anchor; native ignores it and opens the URL on press.
  const anchor =
    IS_WEB && href && !disabled ? { href, hrefAttrs: external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined } : {};
  return (
    <Text
      theme={themeOverride}
      role="link"
      color={disabled ? 'textDisabled' : 'primary'}
      weight={weight ?? look.weight}
      aria-disabled={disabled}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPress={
        disabled
          ? undefined
          : (e) => {
              onPress?.(e);
              if (!IS_WEB && href && !e.isDefaultPrevented()) Linking.openURL(href);
            }
      }
      style={[underlined && { textDecorationLine: 'underline' }, style]}
      {...anchor}
      {...rest}
    >
      {children}
      {external ? EXTERNAL_MARK : null}
    </Text>
  );
};
