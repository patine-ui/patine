import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { ChipGroup } from './ChipGroup';
import { SegmentedControl } from './SegmentedControl';

const items = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
];

const radiusOf = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style).borderRadius;

describe('SegmentedControl and ChipGroup', () => {
  it('draws a rounded track for the segmented control, and no track for chips', async () => {
    await render(<SegmentedControl items={items} value="day" testID="segmented" />);
    expect(radiusOf('segmented')).toBeGreaterThan(0);
    await render(<ChipGroup items={items} value="day" testID="chips" />);
    expect(radiusOf('chips')).toBeUndefined();
    expect(screen.getByLabelText('Day').props.accessibilityState).toMatchObject({ checked: true });
  });
});
