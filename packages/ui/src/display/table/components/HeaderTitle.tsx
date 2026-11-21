import type { StyleProp, TextStyle } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { useDirection, useTheme } from '@/core/theme/ThemeProvider';
import { SORT_ARROW, TABLE_DESIGN } from '@/display/table/table.constants';
import { styles, themed } from '@/display/table/table.styles';
import type { TableAlign, TableSort } from '@/display/table/table.types';
import { getTextAlign } from '@/display/table/table.utils';

interface Props {
  title: string;
  align: TableAlign | undefined;
  /** The table's sort, when it sorts by this column */
  sort: TableSort | null;
  style?: StyleProp<TextStyle>;
}

/** A column's title, in the design's header type, with the sort arrow when the table sorts by it. */
export const HeaderTitle = ({ title, align, sort, style }: Props) => {
  const theme = useTheme();
  const look = TABLE_DESIGN[theme.design];
  const dir = useDirection();
  return (
    <Text
      size={look.headerUppercase ? 'xs' : 'sm'}
      weight="medium"
      color="textSecondary"
      numberOfLines={1}
      style={[getTextAlign(align, dir), look.headerUppercase && styles.uppercase, sort && themed(theme).sorted, style]}
    >
      {sort ? `${title} ${SORT_ARROW[sort.direction]}` : title}
    </Text>
  );
};
