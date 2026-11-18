import { fireEvent, render, screen } from '@testing-library/react-native';

import { TimePickerField } from './TimePickerField';

describe('TimePickerField', () => {
  it('shows the time and confirms it from the sheet', async () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    await render(
      <TimePickerField
        label="Alarm"
        format="24h"
        locale="en-US"
        value={new Date(2026, 9, 26, 7, 30)}
        onConfirm={onConfirm}
        onOpenChange={onClose}
      />
    );
    expect(screen.getByText('07:30')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Alarm' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    expect(onConfirm).toHaveBeenCalledWith(new Date(2026, 9, 26, 7, 30));
    expect(onClose).toHaveBeenCalled();
  });

  it('opens from `open` when controlled', async () => {
    const { rerender } = await render(
      <TimePickerField label="Alarm" value={new Date(2026, 9, 26, 7, 30)} onConfirm={jest.fn()} open={false} />
    );
    expect(screen.queryByRole('button', { name: 'Done' })).toBeNull();
    await rerender(<TimePickerField label="Alarm" value={new Date(2026, 9, 26, 7, 30)} onConfirm={jest.fn()} open />);
    expect(screen.getByRole('button', { name: 'Done' })).toBeTruthy();
  });
});
