import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

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

  it('keeps its own selection from defaultValue, and reports each pick', async () => {
    const onValueChange = jest.fn();
    await render(<SegmentedControl items={items} defaultValue="day" onValueChange={onValueChange} />);
    expect(screen.getByLabelText('Day').props.accessibilityState).toMatchObject({ checked: true });
    await fireEvent.press(screen.getByLabelText('Week'));
    expect(onValueChange).toHaveBeenCalledWith('week', items[1]);
    expect(screen.getByLabelText('Week').props.accessibilityState).toMatchObject({ checked: true });
  });

  it('lets a multiple chip group combine filters, adding and removing each', async () => {
    const onValueChange = jest.fn();
    await render(<ChipGroup type="multiple" items={items} defaultValue={['day']} onValueChange={onValueChange} testID="filters" />);
    expect(screen.getByTestId('filters').props.role).toBe('group');
    expect(screen.getByLabelText('Day').props.role).toBe('checkbox');
    await fireEvent.press(screen.getByLabelText('Week'));
    expect(onValueChange).toHaveBeenLastCalledWith(['day', 'week'], items[1]);
    expect(screen.getByLabelText('Day').props.accessibilityState).toMatchObject({ checked: true });
    expect(screen.getByLabelText('Week').props.accessibilityState).toMatchObject({ checked: true });
    await fireEvent.press(screen.getByLabelText('Day'));
    expect(onValueChange).toHaveBeenLastCalledWith(['week'], items[0]);
    expect(screen.getByLabelText('Day').props.accessibilityState).toMatchObject({ checked: false });
  });
});
