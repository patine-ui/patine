import { Children, createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChevronMark } from '@/core/components/ChevronMark';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import type { Theme } from '@/core/theme/theme.types';
import { Text } from '@/foundations/text/Text';
import { LIST_DESIGN } from './list.constants';
import { styles } from './list.styles';
import type { ListItemProps, ListProps } from './list.types';
import { getSeparatorEdge, showsChevron } from './list.utils';

interface ListRow {
  first: boolean;
  /** The List's theme and design, so its rows draw the same */
  theme?: DeepPartial<Theme>;
}

const ListRowContext = createContext<ListRow>({ first: true });

/**
 * A group of rows, as in a settings screen: an inset grouped table on iOS, full-width rows in Material, an outlined box on
 * the web. Put ListItem rows inside; give it a `title` for a section heading and a `footer` for a note.
 */
export const List = ({ title, footer, theme: themeProp, design, style, contentStyle, children, ...rest }: ListProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = LIST_DESIGN[theme.design];
  const edge = look.inset ? theme.spacing.lg : 0;
  return (
    <View style={[{ marginHorizontal: edge, gap: theme.spacing.sm }, style]} {...rest}>
      {title ? (
        <Text
          theme={themeOverride}
          accessibilityRole="header"
          size={look.headerUppercase ? 'xs' : 'sm'}
          weight="medium"
          color={look.headerColor}
          style={[styles.heading, { paddingHorizontal: theme.spacing.lg }, look.headerUppercase && styles.uppercase]}
        >
          {title}
        </Text>
      ) : null}
      <View
        style={[
          styles.group,
          {
            backgroundColor: theme.colors[look.fill],
            borderRadius: look.radius ? theme.radius[look.radius] : 0,
            borderWidth: look.border ? StyleSheet.hairlineWidth : 0,
            borderColor: theme.colors.border,
          },
          contentStyle,
        ]}
      >
        {Children.toArray(children).map((child, index) => (
          <ListRowContext.Provider
            // biome-ignore lint/suspicious/noArrayIndexKey: Children.toArray already keyed each child; the index only marks the first.
            key={index}
            value={{
              first: index === 0,
              theme: themeOverride,
            }}
          >
            {child}
          </ListRowContext.Provider>
        ))}
      </View>
      {footer ? (
        <Text theme={themeOverride} size="xs" color="textSecondary" style={{ paddingHorizontal: theme.spacing.lg }}>
          {footer}
        </Text>
      ) : null}
    </View>
  );
};

/** One row of a List: a title, an optional description, something before it, and a value, control or chevron after it. */
export const ListItem = ({
  title,
  description,
  leading,
  trailing,
  value,
  showChevron,
  destructive = false,
  disabled = false,
  onPress,
  theme: themeProp,
  design,
  style,
  titleStyle,
  ...rest
}: ListItemProps) => {
  const row = useContext(ListRowContext);
  const { theme, themeOverride } = useComponentTheme(themeProp ?? row.theme, design);
  const look = LIST_DESIGN[theme.design];
  const separator = getSeparatorEdge(look, row.first);
  const line = { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border };
  const content = (
    <>
      {leading ? <View style={{ marginEnd: theme.spacing.md }}>{leading}</View> : null}
      <View
        style={[
          styles.row,
          {
            flex: 1,
            alignSelf: 'stretch',
            minHeight: look.minHeight,
            paddingEnd: theme.spacing.lg,
            paddingVertical: theme.spacing.sm,
            gap: theme.spacing.sm,
          },
          separator === 'content' && line,
        ]}
      >
        <View style={styles.text}>
          <Text theme={themeOverride} color={destructive ? 'danger' : 'text'} style={titleStyle}>
            {title}
          </Text>
          {description ? (
            <Text theme={themeOverride} size="sm" color="textSecondary">
              {description}
            </Text>
          ) : null}
        </View>
        <View style={[styles.end, { gap: theme.spacing.sm }]}>
          {value ? (
            <Text theme={themeOverride} color="textSecondary" numberOfLines={1} style={styles.value}>
              {value}
            </Text>
          ) : null}
          {trailing}
          {showsChevron(look, !!onPress, showChevron) ? <ChevronMark color={theme.colors.textSecondary} /> : null}
        </View>
      </View>
    </>
  );
  const rowStyle = [
    styles.row,
    { paddingStart: theme.spacing.lg },
    separator === 'row' && line,
    disabled && { opacity: DISABLED_OPACITY },
    style,
  ];
  return onPress ? (
    <Touchable theme={theme} role="button" disabled={disabled} aria-disabled={disabled} onPress={onPress} style={rowStyle} {...rest}>
      {content}
    </Touchable>
  ) : (
    <View style={rowStyle} {...rest}>
      {content}
    </View>
  );
};
