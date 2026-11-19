import { commonStyles } from '@/core/core.styles';
import { View } from '@/core/primitives/View';
import { COLOR_DESIGN } from '@/pickers/color/color.constants';
import { styles } from '@/pickers/color/color.styles';
import type { ColorLayoutProps } from '@/pickers/color/color.types';
import { isSwatch } from '@/pickers/color/color.utils';
import { AlphaSlider, HueSlider } from '@/pickers/color/components/ChannelSliders';
import { ColorPreview } from '@/pickers/color/components/ColorPreview';
import { HexInput } from '@/pickers/color/components/HexInput';
import { SaturationPad } from '@/pickers/color/components/SaturationPad';
import { SwatchGrid } from '@/pickers/color/components/SwatchGrid';
import { useColorView } from '@/pickers/color/hooks/useColorView';

/** Google's apps: circles to tap, and a Custom circle that opens the square, hue and hex; open already for a colour off the palette. */
export const MaterialColorLayout = ({ picker, colors, showAlpha, copy, labels, theme, slots, testID }: ColorLayoutProps) => {
  const view = useColorView(!isSwatch(colors, picker.rgb));
  const shared = { picker, labels, theme, slots, testID };
  return (
    <View style={[styles.column, commonStyles(theme).gapLg]}>
      <SwatchGrid
        colors={colors}
        shape="circle"
        size={COLOR_DESIGN.material.swatchSize}
        selected={picker.rgb}
        onSelect={picker.select}
        custom={{ open: view.customOpen, label: labels.custom, onPress: view.toggleCustom }}
        theme={theme}
        slots={slots}
      />
      {view.customOpen ? (
        <View style={[styles.column, commonStyles(theme).gapMd]}>
          <SaturationPad {...shared} height={COLOR_DESIGN.material.padHeight} testID={testID ? `${testID}-pad` : undefined} />
          <View style={[styles.row, styles.center, commonStyles(theme).gapMd]}>
            <ColorPreview color={picker.value} shape="circle" theme={theme} />
            <View style={styles.fill}>
              <HueSlider {...shared} />
            </View>
          </View>
          <HexInput
            value={picker.value}
            rgb={picker.rgb}
            label={labels.hex}
            onValueChange={picker.select}
            copy={copy}
            copyLabel={labels.copy}
            copiedLabel={labels.copied}
            theme={theme}
            slots={slots}
            testID={testID ? `${testID}-hex` : undefined}
          />
        </View>
      ) : null}
      {showAlpha ? <AlphaSlider {...shared} /> : null}
    </View>
  );
};
