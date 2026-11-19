import { commonStyles } from '@/core/core.styles';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { COLOR_DESIGN } from '@/pickers/color/color.constants';
import { styles, themed } from '@/pickers/color/color.styles';
import type { ColorLayoutProps } from '@/pickers/color/color.types';
import { AlphaSlider, HueSlider } from '@/pickers/color/components/ChannelSliders';
import { EyedropperIcon } from '@/pickers/color/components/ColorIcons';
import { ColorPreview } from '@/pickers/color/components/ColorPreview';
import { HexInput } from '@/pickers/color/components/HexInput';
import { SaturationPad } from '@/pickers/color/components/SaturationPad';
import { SwatchGrid } from '@/pickers/color/components/SwatchGrid';
import { useEyeDropper } from '@/pickers/color/hooks/useEyeDropper';

/** The browser's colour input: the saturation square, the eyedropper and colour beside hue and opacity, the hex code, then your swatches. */
export const WebColorLayout = ({ picker, colors, showAlpha, copy, labels, theme, slots, testID }: ColorLayoutProps) => {
  const pick = useEyeDropper(picker.select);
  const shared = { picker, labels, theme, slots, testID };
  return (
    <View style={[styles.column, commonStyles(theme).gapMd]}>
      <SaturationPad {...shared} height={COLOR_DESIGN[theme.design].padHeight} testID={testID ? `${testID}-pad` : undefined} />
      <View style={[styles.row, styles.center, commonStyles(theme).gapMd]}>
        {pick ? (
          <Touchable
            theme={theme}
            onPress={pick}
            role="button"
            aria-label={labels.eyedropper}
            style={[styles.iconButton, themed(theme).small]}
          >
            <EyedropperIcon color={theme.colors.text} />
          </Touchable>
        ) : null}
        <ColorPreview color={picker.value} shape="circle" theme={theme} />
        <View style={styles.fill}>
          <HueSlider {...shared} />
          {showAlpha ? <AlphaSlider {...shared} /> : null}
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
      {colors.length ? (
        <SwatchGrid
          colors={colors}
          shape={COLOR_DESIGN[theme.design].swatchShape}
          size={COLOR_DESIGN[theme.design].swatchSize}
          selected={picker.rgb}
          onSelect={picker.select}
          theme={theme}
          slots={slots}
        />
      ) : null}
    </View>
  );
};
