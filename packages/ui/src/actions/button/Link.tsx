import { useState } from 'react';

import { Text } from '@/core/primitives/Text';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { getAnchorProps, openHref } from '@/core/utils/href.utils';
import { styles } from './button.styles';
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
  color,
  ...rest
}: LinkProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = LINK_DESIGN[theme.design];
  const [hovered, setHovered] = useState(false);
  const line = underline ?? look.underline;
  const underlined = line === LINK_UNDERLINE.always || (line === LINK_UNDERLINE.hover && hovered);
  return (
    <Text
      theme={themeOverride}
      role="link"
      color={disabled ? 'textDisabled' : (color ?? 'primary')}
      weight={weight ?? look.weight}
      aria-disabled={disabled}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPress={
        disabled
          ? undefined
          : (e) => {
              onPress?.(e);
              openHref(e, href);
            }
      }
      style={[underlined && styles.underline, style]}
      {...getAnchorProps(href, external, disabled)}
      {...rest}
    >
      {children}
      {external ? EXTERNAL_MARK : null}
    </Text>
  );
};
