import type { Theme } from '@/core';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { knobStyles, styles, themed } from '@/pickers/color/color.styles';
import { getIosGridColors } from '@/pickers/color/color.utils';

const GRID = getIosGridColors();

/** iOS's grid: one block of colours without gaps, the chosen one ringed in white. */
export const IosGrid = ({ selected, onSelect, theme }: { selected: string; onSelect: (color: string) => void; theme: Theme }) => (
  <View style={[styles.grid, themed(theme).large]}>
    {GRID.map((row) => (
      <View key={row.join()} style={styles.row}>
        {row.map((color) => {
          const chosen = color === selected;
          return (
            <Touchable
              key={color}
              theme={theme}
              ripple={false}
              onPress={() => onSelect(color)}
              role="button"
              aria-label={color}
              aria-selected={chosen}
              style={[styles.gridCell, styles.gridCellHeight, fillOf(color), chosen && [styles.gridCellSelected, knobStyles(theme).ring]]}
            />
          );
        })}
      </View>
    ))}
  </View>
);
