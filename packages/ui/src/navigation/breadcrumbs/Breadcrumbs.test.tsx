import { fireEvent, render, screen } from '@testing-library/react-native';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('links every level but the current page', async () => {
    const goHome = jest.fn();
    await render(
      <Breadcrumbs items={[{ label: 'Home', onPress: goHome }, { label: 'Settings', onPress: jest.fn() }, { label: 'Profile' }]} />
    );
    await fireEvent.press(screen.getByRole('link', { name: 'Home' }));
    expect(goHome).toHaveBeenCalled();
    expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull();
    expect(screen.getByText('Profile').props['aria-current']).toBe('page');
  });

  it('folds the middle past maxItems and unfolds it when pressed', async () => {
    const items = ['A', 'B', 'C', 'D', 'E'].map((label) => ({
      label,
      onPress: jest.fn(),
    }));
    await render(<Breadcrumbs items={items} maxItems={3} />);
    expect(screen.queryByText('B')).toBeNull();
    await fireEvent.press(screen.getByRole('link', { name: 'Show path' }));
    expect(screen.getByText('B')).toBeTruthy();
  });
});
