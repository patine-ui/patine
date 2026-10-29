import { View } from 'react-native';

import { SegmentedControl } from '@/inputs/segmented';
import { COLOR_DESIGN, COLOR_TAB } from '@/pickers/color/color.constants';
import { styles } from '@/pickers/color/color.styles';
import type { ColorLayoutProps } from '@/pickers/color/color.types';
import { AlphaSlider, RgbSliders } from '@/pickers/color/components/ChannelSliders';
import { ColorPreview } from '@/pickers/color/components/ColorPreview';
import { HexInput } from '@/pickers/color/components/HexInput';
import { IosGrid } from '@/pickers/color/components/IosGrid';
import { SpectrumPad } from '@/pickers/color/components/SpectrumPad';
import { SwatchGrid } from '@/pickers/color/components/SwatchGrid';
import { useColorView } from '@/pickers/color/hooks/useColorView';

/** iOS's colour picker: Grid, Spectrum and Sliders tabs, an opacity slider, then the colour beside your swatches. */
export const IosColorLayout = ({ picker, colors, showAlpha, copy, labels, theme, slots, testID }: ColorLayoutProps) => {
  const view = useColorView(false);
  const shared = { picker, labels, theme, slots, testID };
  const tabs = [
    { label: labels.grid, value: COLOR_TAB.grid },
    { label: labels.spectrum, value: COLOR_TAB.spectrum },
    { label: labels.sliders, value: COLOR_TAB.sliders },
  ];
  return (
    <View style={[styles.column, { gap: theme.spacing.lg }]}>
      <SegmentedControl items={tabs} value={view.tab} onValueChange={view.setTab} theme={theme} />
      {view.tab === COLOR_TAB.grid ? <IosGrid selected={picker.rgb} onSelect={picker.select} theme={theme} /> : null}
      {view.tab === COLOR_TAB.spectrum ? (
        <SpectrumPad {...shared} height={COLOR_DESIGN.ios.padHeight} testID={testID ? `${testID}-spectrum` : undefined} />
      ) : null}
      {view.tab === COLOR_TAB.sliders ? (
        <View style={[styles.column, { gap: theme.spacing.sm }]}>
          <RgbSliders {...shared} />
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
      {showAlpha ? <AlphaSlider {...shared} captioned /> : null}
      <View style={[styles.row, styles.centerRow, { gap: theme.spacing.md }]}>
        <ColorPreview color={picker.value} shape="large" theme={theme} />
        {colors.length ? (
          <View style={styles.fill}>
            <SwatchGrid
              colors={colors}
              shape="circle"
              size={COLOR_DESIGN.ios.swatchSize}
              scroll
              selected={picker.rgb}
              onSelect={picker.select}
              theme={theme}
              slots={slots}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
