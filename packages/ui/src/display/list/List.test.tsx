import { StyleSheet, Text } from 'react-native';

import { fireEvent, render, screen, within } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Checkbox } from '@/inputs/checkbox/Checkbox';
import { BulletList } from './BulletList';
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

describe('ListItem with controls', () => {
  it('keeps a control in leading or trailing beside the row button, never inside it', async () => {
    const onPress = jest.fn();
    const onCheckedChange = jest.fn();
    await render(
      <ListItem
        title="Case 1042"
        description="Opened today"
        onPress={onPress}
        leading={<Checkbox checked={false} onCheckedChange={onCheckedChange} aria-label="Select case" />}
        trailing={<Text onPress={() => {}}>⋯</Text>}
      />
    );
    const row = screen.getByRole('button');
    expect(row).toHaveTextContent('Case 1042Opened today');
    expect(within(row).queryByRole('checkbox')).toBeNull();
    expect(within(row).queryByText('⋯')).toBeNull();
    await fireEvent.press(row);
    expect(onPress).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Select case' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps plain leading content inside the row button', async () => {
    await render(<ListItem title="Billing" onPress={() => {}} leading={<Text>icon</Text>} />);
    expect(within(screen.getByRole('button')).getByText('icon')).toBeTruthy();
  });
});

describe('ListItem content', () => {
  it('takes nodes for its title and description, and keeps the styling for strings', async () => {
    await render(<ListItem title={<Text>Rich title</Text>} description={<Text>Rich line</Text>} />);
    expect(screen.getByText('Rich title')).toBeTruthy();
    expect(screen.getByText('Rich line')).toBeTruthy();
    expect(StyleSheet.flatten(screen.getByText('Rich title').props.style)?.color).toBeUndefined();
  });

  it('draws a muted row in secondary text', async () => {
    await render(<ListItem title="Archived" muted />);
    expect(StyleSheet.flatten(screen.getByText('Archived').props.style).color).toBe(lightTheme.colors.textSecondary);
  });
});

describe('BulletList', () => {
  it('is a list of items, each with a bullet', async () => {
    await render(<BulletList items={['Milk', 'Eggs']} testID="list" />);
    // A View with a role but no label isn't an accessible element to the query, so check the roles themselves.
    expect(screen.getByTestId('list').props.role).toBe('list');
    expect(screen.getByTestId('list').children.map((item) => (typeof item === 'string' ? item : item.props.role))).toEqual([
      'listitem',
      'listitem',
    ]);
    expect(screen.getByText('Eggs')).toBeTruthy();
    expect(screen.queryByText('•')).toBeNull();
    expect(screen.getAllByText('•', { includeHiddenElements: true })).toHaveLength(2);
  });
});
