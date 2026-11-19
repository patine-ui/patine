import { Fragment } from 'react';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { InlinePanel } from '@/overlays/sheet/components/InlinePanel';
import { RANGE_ENDS_DESIGN, RANGE_ENDS_LAYOUT, TIME_RANGE_ARROW } from '@/pickers/time/time.constants';
import { styles, themed } from '@/pickers/time/time.styles';
import type { RangeEndsProps } from '@/pickers/time/time.types';

type RangeEndItem = RangeEndsProps['items'][number];

/** Start and End as each platform shows them: Calendar's rows on iOS, large time boxes on Material, side-by-side cards on the web. */
export const RangeEnds = ({ items, active, onSelect, duration, theme, renderPicker, testID }: RangeEndsProps) => {
  const words = useLabels();
  const layout = RANGE_ENDS_DESIGN[theme.design];
  const radio = (item: RangeEndItem) => ({
    onPress: () => onSelect(item.end),
    role: 'radio' as const,
    'aria-label': `${item.label} ${item.time}`,
    'aria-checked': item.end === active,
    testID: testID && `${testID}-${item.end}`,
  });

  if (layout === RANGE_ENDS_LAYOUT.rows) {
    return (
      <View role="radiogroup" aria-label={words.time.range} testID={testID}>
        {items.map((item, index) => (
          <Fragment key={item.end}>
            {index > 0 ? <View style={[styles.rangeSeparator, themed(theme).separator]} /> : null}
            <Touchable theme={theme} {...radio(item)} style={styles.rangeRow}>
              <Text theme={theme}>{item.label}</Text>
              <View style={[styles.rangePill, themed(theme).pill]}>
                <Text theme={theme} color={item.end === active ? 'primary' : 'text'}>
                  {item.time}
                </Text>
              </View>
            </Touchable>
            <InlinePanel visible={item.end === active} theme={theme}>
              {renderPicker(item.end)}
            </InlinePanel>
          </Fragment>
        ))}
      </View>
    );
  }

  const web = layout === RANGE_ENDS_LAYOUT.cards;
  const box = (item: RangeEndItem) => {
    const on = item.end === active;
    const label = (
      <Text theme={theme} size="xs" weight="medium" color={on ? 'primary' : 'textSecondary'}>
        {item.label}
      </Text>
    );
    return (
      <View style={themed(theme).gapXs}>
        {web ? null : label}
        <Touchable
          theme={theme}
          {...radio(item)}
          style={[styles.rangeBox, web ? [themed(theme).card, on && themed(theme).cardOn] : [themed(theme).box, on && themed(theme).boxOn]]}
        >
          {web ? label : null}
          <Text theme={theme} size={web ? 'md' : 'lg'} weight="medium" color={on && !web ? 'primary' : 'text'}>
            {item.time}
          </Text>
        </Touchable>
      </View>
    );
  };
  return (
    <View>
      <View role="radiogroup" aria-label={words.time.range} style={styles.rangeBoxes} testID={testID}>
        {box(items[0])}
        <View style={styles.rangeArrow}>
          <Text theme={theme} color="textSecondary">
            {TIME_RANGE_ARROW}
          </Text>
          <Text theme={theme} size="xs" color="textSecondary">
            {duration}
          </Text>
        </View>
        {box(items[1])}
      </View>
      {renderPicker(active)}
    </View>
  );
};
