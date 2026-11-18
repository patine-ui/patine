import { fireEvent, render, screen } from '@testing-library/react-native';

import { SuggestionChips } from './SuggestionChips';

describe('SuggestionChips', () => {
  it('is a named group of buttons that hand back their text', async () => {
    const onPress = jest.fn();
    await render(<SuggestionChips suggestions={['Track my order', 'Talk to a person']} onPress={onPress} />);
    expect(screen.getByLabelText('Suggestions')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Talk to a person' }));
    expect(onPress).toHaveBeenCalledWith('Talk to a person');
  });

  it('blocks every chip when disabled', async () => {
    const onPress = jest.fn();
    await render(<SuggestionChips suggestions={['Yes']} onPress={onPress} disabled />);
    await fireEvent.press(screen.getByRole('button', { name: 'Yes' }));
    expect(onPress).not.toHaveBeenCalled();
  });
});
