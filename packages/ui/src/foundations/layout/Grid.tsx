import { Children, useState } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import { toSpace } from '@/foundations/stack/stack.utils';
import type { GridProps } from './layout.types';
import { getColumnCount } from './layout.utils';

/**
 * Equal columns that wrap into rows: a fixed `columns`, or as many as fit `minColumnWidth`, re-flowing as it resizes.
 * Each cell is a percentage of the row with half the column gap on each side, so fixed columns lay out on the first frame.
 */
export const Grid = ({
  columns = 2,
  minColumnWidth,
  gap = 'md',
  rowGap,
  columnGap,
  theme: themeProp,
  style,
  children,
  onLayout,
  ...rest
}: GridProps) => {
  const theme = useTheme(themeProp);
  const [width, setWidth] = useState(0);
  const colGap = toSpace(theme.spacing, columnGap ?? gap) ?? 0;
  const count = minColumnWidth ? getColumnCount(width, minColumnWidth, colGap) : Math.max(1, Math.floor(columns));
  return (
    <View
      style={style}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
        onLayout?.(e);
      }}
      {...rest}
    >
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -colGap / 2, rowGap: toSpace(theme.spacing, rowGap ?? gap) }}
      >
        {Children.toArray(children).map((child, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional; the child keeps its own key inside.
          <View key={i} style={{ width: `${100 / count}%`, paddingHorizontal: colGap / 2 }}>
            {child}
          </View>
        ))}
      </View>
    </View>
  );
};
