import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { BottomTabBar } from './BottomTabBar';
import { NavigationRail } from './NavigationRail';

const ITEMS = [
  { value: 'home', label: 'Home', icon: <Text>🏠</Text> },
  { value: 'inbox', label: 'Inbox', badge: 3, icon: ({ color }: { color: string }) => <Text style={{ color }}>✉️</Text> },
  { value: 'me', label: 'Profile', badge: true },
];

describe('BottomTabBar', () => {
  it('selects the first item by default, and the one pressed', async () => {
    const onValueChange = jest.fn();
    await render(<BottomTabBar items={ITEMS} onValueChange={onValueChange} />);
    expect(screen.getByRole('tab', { name: 'Home', selected: true })).toBeTruthy();
    await fireEvent.press(screen.getByRole('tab', { name: 'Inbox, 3 new' }));
    expect(onValueChange).toHaveBeenCalledWith('inbox');
    expect(screen.getByRole('tab', { name: 'Inbox, 3 new', selected: true })).toBeTruthy();
  });

  it('reads badges with the label and adds the bottom inset', async () => {
    await render(<BottomTabBar items={ITEMS} bottomInset={34} design="ios" testID="bar" />);
    expect(screen.getByRole('tab', { name: 'Profile, new' })).toBeTruthy();
    expect(screen.getByTestId('bar')).toHaveStyle({ height: 49 + 34, paddingBottom: 34 });
  });
});

describe('NavigationRail', () => {
  it('lists the items down the side, controlled', async () => {
    const onValueChange = jest.fn();
    await render(<NavigationRail items={ITEMS} value="me" onValueChange={onValueChange} />);
    expect(screen.getByRole('tab', { name: 'Profile, new', selected: true })).toBeTruthy();
    await fireEvent.press(screen.getByRole('tab', { name: 'Home' }));
    expect(onValueChange).toHaveBeenCalledWith('home');
    expect(screen.getByRole('tab', { name: 'Profile, new', selected: true })).toBeTruthy();
  });
});

describe('tab bar semantics', () => {
  it('is a navigation landmark named by its label, with its items as tabs', async () => {
    await render(<BottomTabBar items={ITEMS} />);
    expect(screen.getByLabelText('Tabs').props.role).toBe('navigation');
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('makes items with href links, outside a tab list', async () => {
    const linked = ITEMS.map((item) => ({
      ...item,
      href: `/${item.value}`,
    }));
    await render(<NavigationRail items={linked} />);
    expect(screen.getByLabelText('Tabs').props.role).toBe('navigation');
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
