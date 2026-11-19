import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { SHEET_DESIGN, TITLE_ALIGN } from '@/overlays/sheet/sheet.constants';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { SheetHeaderProps } from '@/overlays/sheet/sheet.types';

export const SheetHeader = ({ title, headerLeft, headerRight, theme, slots }: SheetHeaderProps) => {
  const start = SHEET_DESIGN[theme.design].titleAlign === TITLE_ALIGN.start;
  return (
    // Touches pass through all but the header's own controls, to the sheet's drag area behind it.
    <View style={[styles.header, sheetStyles(theme).header, slots?.header]} pointerEvents="box-none">
      {start && !headerLeft ? null : (
        <View style={styles.headerSide} pointerEvents="box-none">
          {headerLeft}
        </View>
      )}
      <View style={[styles.headerCenter, start && styles.headerStart]} pointerEvents={typeof title === 'string' ? 'none' : 'box-none'}>
        {typeof title === 'string' ? (
          <Text
            role="heading"
            aria-level={2}
            theme={theme}
            size={start ? 'lg' : 'md'}
            weight="semibold"
            style={slots?.title}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      <View style={[styles.headerSide, styles.headerRight]} pointerEvents="box-none">
        {headerRight}
      </View>
    </View>
  );
};
