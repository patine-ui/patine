import { Fragment } from 'react';
import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { InlinePanel } from '@/overlays/sheet/components/InlinePanel';
import { RANGE_ENDS_DESIGN, RANGE_ENDS_LAYOUT, TIME_RANGE_ACCESSIBILITY_LABEL, TIME_RANGE_ARROW } from '@/pickers/time/time.constants';
import { styles } from '@/pickers/time/time.styles';
import type { RangeEndsProps } from '@/pickers/time/time.types';

type RangeEndItem = RangeEndsProps['items'][number];

/** Start and End as each platform shows them: Calendar's rows on iOS, large time boxes on Material, side-by-side cards on the web. */
export const RangeEnds = ({ items, active, onSelect, duration, theme, renderPicker, testID }: RangeEndsProps) => {
  const c = theme.colors;
  const layout = RANGE_ENDS_DESIGN[theme.design];
  const radio = (item: RangeEndItem) => ({
    onPress: () => onSelect(item.end),
    accessibilityRole: 'radio' as const,
    accessibilityLabel: `${item.label} ${item.time}`,
    accessibilityState: { checked: item.end === active },
    testID: testID && `${testID}-${item.end}`,
  });

  if (layout === RANGE_ENDS_LAYOUT.rows) {
    return (
      <View accessibilityRole="radiogroup" accessibilityLabel={TIME_RANGE_ACCESSIBILITY_LABEL} testID={testID}>
        {items.map((item, index) => (
          <Fragment key={item.end}>
            {index > 0 ? <View style={[styles.rangeSeparator, { backgroundColor: c.border }]} /> : null}
            <Touchable theme={theme} {...radio(item)} style={styles.rangeRow}>
              <PickerText theme={theme}>{item.label}</PickerText>
              <View style={[styles.rangePill, { backgroundColor: c.surface, borderRadius: theme.radius.sm }]}>
                <PickerText theme={theme} color={item.end === active ? 'primary' : 'text'}>
                  {item.time}
                </PickerText>
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
      <PickerText theme={theme} size="xs" weight="medium" color={on ? 'primary' : 'textSecondary'}>
        {item.label}
      </PickerText>
    );
    return (
      <View style={{ gap: theme.spacing.xs }}>
        {web ? null : label}
        <Touchable
          theme={theme}
          {...radio(item)}
          style={[
            styles.rangeBox,
            web
              ? { borderWidth: 1, borderColor: on ? c.primary : c.border, borderRadius: theme.radius.md }
              : { backgroundColor: on ? c.primaryMuted : c.surface, borderRadius: theme.radius.sm },
          ]}
        >
          {web ? label : null}
          <PickerText theme={theme} size={web ? 'md' : 'lg'} weight="medium" color={on && !web ? 'primary' : 'text'}>
            {item.time}
          </PickerText>
        </Touchable>
      </View>
    );
  };
  return (
    <View>
      <View accessibilityRole="radiogroup" accessibilityLabel={TIME_RANGE_ACCESSIBILITY_LABEL} style={styles.rangeBoxes} testID={testID}>
        {box(items[0])}
        <View style={styles.rangeArrow}>
          <PickerText theme={theme} color="textSecondary">
            {TIME_RANGE_ARROW}
          </PickerText>
          <PickerText theme={theme} size="xs" color="textSecondary">
            {duration}
          </PickerText>
        </View>
        {box(items[1])}
      </View>
      {renderPicker(active)}
    </View>
  );
};
