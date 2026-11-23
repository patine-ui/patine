import { Children, createContext, useContext } from 'react';

import { ChevronMark } from '@/core/components/ChevronMark';
import { cs } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ContentColor } from '@/core/theme/ContentColor';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { hasControl } from '@/core/utils/slot.utils';
import { isTextContent } from '@/core/utils/text.utils';
import { Heading } from '@/foundations/text/Heading';
import { ListInsetContext } from './ListInsetContext';
import { LIST_DESIGN } from './list.constants';
import { styles, themed } from './list.styles';
import type { ListItemProps, ListProps } from './list.types';
import { getSeparatorEdge, showsChevron } from './list.utils';

/** Whether a row is the group's first, which draws no separator above it. */
const ListRowContext = createContext(true);

/**
 * A group of rows, as in a settings screen: an inset grouped table on iOS, full-width rows in Material, an outlined box on
 * the web. Put ListItem rows inside; give it a `title` for a section heading and a `footer` for a note.
 */
export const List = ({ title, footer, theme: themeProp, design, style, styles: slots, children, ...rest }: ListProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = LIST_DESIGN[theme.design];
  const sheet = themed(theme);
  const inset = useContext(ListInsetContext);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[sheet.root, !inset && styles.flush, style]} {...rest}>
        {title ? (
          <Heading
            level={3}
            size={look.headerUppercase ? 'xs' : 'sm'}
            weight="medium"
            color={look.headerColor}
            style={[styles.heading, sheet.padded, look.headerUppercase && styles.uppercase]}
          >
            {title}
          </Heading>
        ) : null}
        <View style={[styles.group, sheet.group, slots?.content]}>
          {Children.toArray(children).map((child, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Children.toArray already keyed each child; the index only marks the first.
            <ListRowContext.Provider key={index} value={index === 0}>
              {child}
            </ListRowContext.Provider>
          ))}
        </View>
        {footer ? (
          <Text size="xs" color="textSecondary" style={sheet.padded}>
            {footer}
          </Text>
        ) : null}
      </View>
    </ThemeScope>
  );
};

/**
 * One row of a List: a title, an optional description, something before it, and a value, control or chevron after it. A row
 * with `onPress` is a button; a control in `leading` or `trailing` (a Checkbox, a DropdownMenu) sits beside that button,
 * never inside it.
 */
export const ListItem = ({
  title,
  description,
  leading,
  trailing,
  value,
  showChevron,
  destructive = false,
  muted = false,
  disabled = false,
  onPress,
  href,
  external,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: ListItemProps) => {
  const first = useContext(ListRowContext);
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = LIST_DESIGN[theme.design];
  const sheet = themed(theme);
  const separator = getSeparatorEdge(look, first);
  const pressable = !!(onPress || href);
  const leadingControl = pressable && hasControl(leading);
  const trailingControl = pressable && hasControl(trailing);
  // With a control in it, the row is a box and only its text is the button, so no button holds another control.
  const split = leadingControl || trailingControl;
  const press = { role: 'button' as const, disabled, onPress, href, external };
  const text = (
    <>
      {isTextContent(title) ? (
        <Text color={destructive ? 'danger' : muted ? 'textSecondary' : 'text'} style={slots?.title}>
          {title}
        </Text>
      ) : (
        title
      )}
      {isTextContent(description) ? (
        <Text size="sm" color="textSecondary">
          {description}
        </Text>
      ) : (
        description
      )}
    </>
  );
  const content = (
    <>
      {leading ? (
        <View style={sheet.leading}>
          <ContentColor color={destructive ? theme.colors.danger : muted ? theme.colors.textSecondary : undefined}>{leading}</ContentColor>
        </View>
      ) : null}
      <View style={[styles.row, styles.content, sheet.content, separator === 'content' && sheet.line]}>
        {split ? (
          <Touchable {...press} style={[styles.text, sheet.press, disabled && styles.opaque]} {...rest}>
            {text}
          </Touchable>
        ) : (
          <View style={styles.text}>{text}</View>
        )}
        <View style={[styles.end, sheet.end, value ? styles.endYields : null]}>
          {value ? (
            <Text color="textSecondary" numberOfLines={1} style={styles.value}>
              {value}
            </Text>
          ) : null}
          {trailing}
          {showsChevron(look, pressable, showChevron, destructive) ? <ChevronMark color={theme.colors.textSecondary} /> : null}
        </View>
      </View>
    </>
  );
  const rowStyle = [styles.row, sheet.item, separator === 'row' && sheet.line, style];
  return (
    <ThemeScope theme={themeOverride}>
      {pressable && !split ? (
        <Touchable {...press} style={rowStyle} {...rest}>
          {content}
        </Touchable>
      ) : (
        <View style={[rowStyle, disabled && cs.disabled]} {...(split ? null : rest)}>
          {content}
        </View>
      )}
    </ThemeScope>
  );
};
