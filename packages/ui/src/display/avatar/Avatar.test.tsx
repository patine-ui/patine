import { fireEvent, render, screen } from '@testing-library/react-native';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('shows initials without a picture, named for screen readers', async () => {
    await render(<Avatar name="Ada Lovelace" testID="avatar" />);
    expect(screen.getByText('AL', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('avatar').props['aria-label']).toBe('Ada Lovelace');
  });

  it('shows the picture, and falls back to initials when it fails', async () => {
    await render(<Avatar name="Ada Lovelace" src="https://example.com/ada.png" testID="avatar" />);
    expect(screen.queryByText('AL', { includeHiddenElements: true })).toBeNull();
    await fireEvent(screen.getByTestId('avatar-image'), 'error');
    expect(screen.getByText('AL', { includeHiddenElements: true })).toBeTruthy();
  });
});
