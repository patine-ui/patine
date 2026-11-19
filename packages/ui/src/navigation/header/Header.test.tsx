import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Header } from './Header';

describe('Header', () => {
  it('names the screen as a heading', async () => {
    await render(<Header title="Settings" subtitle="Account" />);
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeTruthy();
    expect(screen.getByText('Account')).toBeTruthy();
  });

  it('shows a back button that calls onBack', async () => {
    const onBack = jest.fn();
    await render(<Header title="Profile" onBack={onBack} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('labels the back button with text on iOS', async () => {
    await render(<Header title="Profile" design="ios" onBack={() => {}} backLabel="Settings" />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('shows actions and a large title under the bar', async () => {
    await render(<Header title="Inbox" size="large" actions={<Text>Edit</Text>} />);
    expect(screen.getAllByRole('heading', { name: 'Inbox' })).toHaveLength(1);
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('lets leading replace the back button', async () => {
    await render(<Header title="Chat" onBack={() => {}} leading={<Text>Close</Text>} />);
    expect(screen.queryByRole('button', { name: 'Back' })).toBeNull();
    expect(screen.getByText('Close')).toBeTruthy();
  });
});

describe('Header semantics', () => {
  it('is the page banner (a <header> on the web)', async () => {
    await render(<Header title="Settings" testID="header" />);
    expect(screen.getByTestId('header').props.role).toBe('banner');
  });
});
