import { Fragment } from 'react';

import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { heightOf } from '@/core/utils/style.utils';
import { WheelIndicator } from './components/WheelIndicator';
import { WheelPicker } from './WheelPicker';
import { DEFAULT_ITEM_HEIGHT, DEFAULT_VISIBLE_ITEMS, WHEEL_VARIANT } from './wheel.constants';
import { styles } from './wheel.styles';
import type { MultiWheelPickerProps } from './wheel.types';
import { getColumnBox, resolveSeparator, toOddCount } from './wheel.utils';

/** Several wheels sharing one selection band (time, date, units...). */
export const MultiWheelPicker = ({
  columns,
  separator,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleItems = DEFAULT_VISIBLE_ITEMS,
  variant = WHEEL_VARIANT.threeD,
  style,
  styles: slots,
  theme: themeProp,
  design,
  testID,
}: MultiWheelPickerProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const visible = toOddCount(visibleItems);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[heightOf(itemHeight * visible), style, slots?.container]} {...ARROW_FOCUS} testID={testID}>
        <WheelIndicator itemHeight={itemHeight} theme={theme} style={slots?.indicator} />
        <View style={styles.columns}>
          {columns.map(({ key, flex, width, suffix, styles: columnSlots, ...column }, i) => {
            const sep = resolveSeparator(separator, i);
            return (
              <Fragment key={key}>
                {sep !== null && (
                  <View style={styles.separator} pointerEvents="none">
                    {typeof sep === 'string' ? (
                      <Text theme={theme} size="lg" weight="semibold" style={slots?.separator}>
                        {sep}
                      </Text>
                    ) : (
                      sep
                    )}
                  </View>
                )}
                <WheelPicker
                  {...column}
                  theme={themeOverride}
                  itemHeight={itemHeight}
                  visibleItems={visible}
                  variant={variant}
                  showIndicator={false}
                  style={[getColumnBox(width, flex), column.style]}
                  styles={{
                    item: slots?.item,
                    itemText: slots?.itemText,
                    selectedItemText: slots?.selectedItemText,
                    disabledItemText: slots?.disabledItemText,
                    ...columnSlots,
                  }}
                />
                {suffix ? (
                  <View style={styles.separator} pointerEvents="none">
                    <Text theme={theme} color="textSecondary" style={slots?.separator}>
                      {suffix}
                    </Text>
                  </View>
                ) : null}
              </Fragment>
            );
          })}
        </View>
      </View>
    </ThemeScope>
  );
};
