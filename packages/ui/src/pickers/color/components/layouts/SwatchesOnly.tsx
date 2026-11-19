import { commonStyles } from '@/core/core.styles';
import { View } from '@/core/primitives/View';
import { COLOR_DESIGN } from '@/pickers/color/color.constants';
import { styles } from '@/pickers/color/color.styles';
import type { ColorLayoutProps } from '@/pickers/color/color.types';
import { AlphaSlider } from '@/pickers/color/components/ChannelSliders';
import { SwatchGrid } from '@/pickers/color/components/SwatchGrid';

/** `showCustom={false}`: only your swatches, in the design's shape, and opacity if asked for. */
export const SwatchesOnly = ({ picker, colors, showAlpha, labels, theme, slots, testID }: ColorLayoutProps) => (
  <View style={[styles.column, commonStyles(theme).gapMd]}>
    <SwatchGrid
      colors={colors}
      shape={COLOR_DESIGN[theme.design].swatchShape}
      size={COLOR_DESIGN[theme.design].swatchSize}
      selected={picker.rgb}
      onSelect={picker.select}
      theme={theme}
      slots={slots}
    />
    {showAlpha ? <AlphaSlider picker={picker} labels={labels} theme={theme} slots={slots} testID={testID} /> : null}
  </View>
);
