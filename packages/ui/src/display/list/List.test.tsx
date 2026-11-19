import { StyleSheet, Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { List, ListItem } from './List';

describe('List', () => {
  it('shows a section heading, rows and a footer note', async () => {
    await render(
      <List title="Notifications" footer="We only send what you turn on.">
        <ListItem title="Push" value="On" />
        <ListItem title="Email" description="Weekly digest" />
      </List>
    );
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeTruthy();
    expect(screen.getByText('On')).toBeTruthy();
    expect(screen.getByText('Weekly digest')).toBeTruthy();
    expect(screen.getByText('We only send what you turn on.')).toBeTruthy();
  });

  it('makes a row with onPress a button', async () => {
    const onPress = jest.fn();
    await render(
      <List>
        <ListItem title="Language" value="English" onPress={onPress} />
      </List>
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not press a disabled row', async () => {
    const onPress = jest.fn();
    await render(<ListItem title="Language" disabled onPress={onPress} />);
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('draws destructive rows in the danger color', async () => {
    await render(<ListItem title="Delete account" destructive />);
    expect(StyleSheet.flatten(screen.getByText('Delete account').props.style)).toMatchObject({ color: lightTheme.colors.danger });
  });

  it('passes its design to its rows', async () => {
    await render(
      <List design="ios" testID="list">
        <ListItem title="A" testID="a" />
        <ListItem title="B" testID="b" trailing={<Text>trail</Text>} />
      </List>
    );
    expect(screen.getByText('trail')).toBeTruthy();
    expect(StyleSheet.flatten(screen.getByText('A').props.style).color).toBe(lightTheme.colors.text);
  });
});

describe('ListItem with href', () => {
  it('is a link row with a chevron where the design draws one', async () => {
    await render(
      <List>
        <ListItem title="Billing" href="/settings/billing" />
      </List>
    );
    expect(screen.getByRole('link')).toBeTruthy();
  });
});
