import { fireEvent, render, screen } from '@testing-library/react-native';

import { EmojiPickerField } from './EmojiPickerField';

describe('EmojiPickerField', () => {
  it('shows the picked emoji and opens the sheet', async () => {
    const onOpenChange = jest.fn();
    await render(<EmojiPickerField label="Reaction" value="🍕" onOpenChange={onOpenChange} onSelect={jest.fn()} />);
    expect(screen.getByText('🍕')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Reaction' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText('Search emoji')).toBeTruthy();
  });
});
