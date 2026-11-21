import type { ViewProps } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useComponentTheme, useTheme } from '@/core/theme/ThemeProvider';
import { hasShorthand } from '@/core/utils/shorthand.utils';
import { Heading } from '@/foundations/text/Heading';
import type { HeadingProps, TextProps } from '@/foundations/text/text.types';
import { CardThemeContext, useCardTheme } from './CardContext';
import { CARD_DESIGN } from './card.constants';
import { shadowStyles, styles, themed } from './card.styles';
import type { CardProps, CardSectionProps } from './card.types';
import { splitCardAction } from './card.utils';
import { useCardPress } from './hooks/useCardPress';

/**
 * A surface that groups related content. Give it `title`, `description` and `footer` (children are the body), or put
 * CardHeader, CardContent and CardFooter inside for full control. With `onPress` the whole card is a button that rises on
 * hover, settles on press and shows a ring on keyboard focus.
 */
export const Card = ({
  theme: themeProp,
  design,
  title,
  description,
  footer,
  action,
  children,
  style,
  shadow,
  onPress,
  onLongPress,
  href,
  external,
  interactive,
  disabled,
  onFocus,
  onBlur,
  ...rest
}: CardProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = CARD_DESIGN[theme.design];
  const level = shadow ?? look.shadow;
  const press = useCardPress(theme, look, level);
  const sheet = themed(theme);
  const surface = [styles.card, sheet.surface, shadowStyles(theme)[level]];
  const pressable = !!(onPress || onLongPress || href);
  // Composed parts (CardHeader, CardTitle…) read the Card's theme and design from context.
  const body = (
    <CardThemeContext.Provider value={themeOverride}>
      {hasShorthand(title, description, footer, action) ? (
        <>
          {title || description || action ? (
            <CardHeader>
              {title ? <CardTitle>{title}</CardTitle> : null}
              {description ? <CardDescription>{description}</CardDescription> : null}
              {action ? <CardAction>{action}</CardAction> : null}
            </CardHeader>
          ) : null}
          {children ? <CardContent>{children}</CardContent> : null}
          {footer ? <CardFooter>{footer}</CardFooter> : null}
        </>
      ) : (
        children
      )}
    </CardThemeContext.Provider>
  );
  if (!pressable && !interactive)
    return (
      <View style={[surface, style]} onFocus={onFocus} onBlur={onBlur} {...rest}>
        {body}
      </View>
    );

  return (
    <Touchable
      theme={press.feedbackTheme}
      role={pressable ? 'button' : 'none'}
      disabled={disabled}
      onPress={onPress}
      href={href}
      external={external}
      onLongPress={onLongPress}
      ripple={pressable}
      onHoverIn={press.handlers.onHoverIn}
      onHoverOut={press.handlers.onHoverOut}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
      style={(state) => [surface, press.style(state), style]}
    >
      {body}
    </Touchable>
  );
};

/** The title and description at the top of a Card, with a CardAction at its end when it has one. */
export const CardHeader = ({ theme: themeProp, style, children, ...rest }: CardSectionProps) => {
  const sheet = themed(useTheme(useCardTheme(themeProp)));
  const { text, action } = splitCardAction(children, CardAction);
  if (!action)
    return (
      <View style={[sheet.header, style]} {...rest}>
        {children}
      </View>
    );
  return (
    <View style={[sheet.header, styles.headerRow, sheet.headerRow, style]} {...rest}>
      <View style={[styles.headerText, sheet.headerText]}>{text}</View>
      {action}
    </View>
  );
};

/** Put inside a CardHeader: sits at the header's end, beside the title, such as a Badge, a menu or a small Button. */
export const CardAction = ({ style, ...rest }: ViewProps) => <View style={[styles.action, style]} {...rest} />;

/** A Card's heading: level 3 for screen readers. */
export const CardTitle = ({ level = 3, size = 'lg', theme, ...rest }: HeadingProps) => (
  <Heading level={level} size={size} theme={useCardTheme(theme)} {...rest} />
);

/** Secondary text under a CardTitle. */
export const CardDescription = ({ size = 'sm', color = 'textSecondary', theme, ...rest }: TextProps) => (
  <Text size={size} color={color} theme={useCardTheme(theme)} {...rest} />
);

/** The body of a Card. */
export const CardContent = ({ theme: themeProp, style, ...rest }: CardSectionProps) => {
  const theme = useTheme(useCardTheme(themeProp));
  return <View style={[themed(theme).content, style]} {...rest} />;
};

/** Actions at the bottom of a Card, in a row. */
export const CardFooter = ({ theme: themeProp, style, ...rest }: CardSectionProps) => {
  const theme = useTheme(useCardTheme(themeProp));
  return <View style={[styles.footer, themed(theme).footer, style]} {...rest} />;
};
