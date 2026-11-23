import { useState } from 'react';
import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Tabs } from './Tabs';
import { TabsContent } from './TabsContent';
import { TabsGroupLabel } from './TabsGroupLabel';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

const keyDown = (key: string) => ({
  nativeEvent: { key },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

const Account = (props: Partial<React.ComponentProps<typeof Tabs>>) => (
  <Tabs defaultValue="account" {...props}>
    <TabsList aria-label="Settings">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="billing" disabled>
        Billing
      </TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Text>Account panel</Text>
    </TabsContent>
    <TabsContent value="password" forceMount={props.orientation === 'vertical'}>
      <Text>Password panel</Text>
    </TabsContent>
  </Tabs>
);

/** Refuses the Password tab, so the value stays where the parent keeps it. */
const Controlled = () => {
  const [value, setValue] = useState('account');
  return <Account value={value} onValueChange={(next) => next !== 'password' && setValue(next)} />;
};

describe('Tabs', () => {
  it('shows only the active panel and switches on press', async () => {
    const onValueChange = jest.fn();
    await render(<Account onValueChange={onValueChange} />);
    expect(screen.getByLabelText('Settings').props.role).toBe('tablist');
    expect(screen.getByRole('tab', { name: 'Account' })).toBeSelected();
    expect(screen.getByText('Account panel')).toBeOnTheScreen();
    expect(screen.queryByText('Password panel')).toBeNull();

    await fireEvent.press(screen.getByRole('tab', { name: 'Password' }));
    expect(onValueChange).toHaveBeenCalledWith('password');
    expect(screen.getByRole('tab', { name: 'Password' })).toBeSelected();
    expect(screen.getByText('Password panel')).toBeOnTheScreen();
    expect(screen.queryByText('Account panel')).toBeNull();
  });

  it('links each tab to its panel', async () => {
    await render(<Account />);
    const tab = screen.getByRole('tab', { name: 'Account' });
    const panel = screen.getByText('Account panel').parent;
    expect(tab.props['aria-controls']).toBe(panel?.props.id);
    expect(panel?.props['aria-labelledby']).toBe(tab.props.id);
    expect(panel?.props.role).toBe('tabpanel');
  });

  it('does not report pressing the active tab or a disabled one', async () => {
    const onValueChange = jest.fn();
    await render(<Account onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Account' }));
    await fireEvent.press(screen.getByRole('tab', { name: 'Billing' }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tab', { name: 'Billing' })).toBeDisabled();
  });

  it('follows a controlled value without reporting it', async () => {
    const onValueChange = jest.fn();
    const { rerender } = await render(<Account value="account" onValueChange={onValueChange} />);
    await rerender(<Account value="password" onValueChange={onValueChange} />);
    expect(screen.getByText('Password panel')).toBeOnTheScreen();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('stays on a controlled value until the parent changes it', async () => {
    await render(<Controlled />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Password' }));
    expect(screen.getByRole('tab', { name: 'Account' })).toBeSelected();
  });

  it('moves with the arrow keys, Home and End, skipping disabled tabs and wrapping', async () => {
    const onValueChange = jest.fn();
    await render(<Account onValueChange={onValueChange} />);
    await fireEvent(screen.getByRole('tab', { name: 'Account' }), 'keyDown', keyDown('ArrowRight'));
    expect(onValueChange).toHaveBeenLastCalledWith('password');
    await fireEvent(screen.getByRole('tab', { name: 'Password' }), 'keyDown', keyDown('ArrowRight'));
    expect(onValueChange).toHaveBeenLastCalledWith('account');
    await fireEvent(screen.getByRole('tab', { name: 'Account' }), 'keyDown', keyDown('End'));
    expect(onValueChange).toHaveBeenLastCalledWith('password');
    await fireEvent(screen.getByRole('tab', { name: 'Password' }), 'keyDown', keyDown('Home'));
    expect(onValueChange).toHaveBeenLastCalledWith('account');
  });

  it('uses up and down when vertical, and keeps a force-mounted panel hidden', async () => {
    const onValueChange = jest.fn();
    await render(<Account orientation="vertical" onValueChange={onValueChange} />);
    expect(screen.getByText('Password panel', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByText('Password panel')).toBeNull();
    await fireEvent(screen.getByRole('tab', { name: 'Account' }), 'keyDown', keyDown('ArrowRight'));
    expect(onValueChange).not.toHaveBeenCalled();
    await fireEvent(screen.getByRole('tab', { name: 'Account' }), 'keyDown', keyDown('ArrowDown'));
    expect(onValueChange).toHaveBeenLastCalledWith('password');
  });

  it('keeps only the active tab in the Tab order', async () => {
    await render(<Account />);
    expect(screen.getByRole('tab', { name: 'Account' }).props.focusable).toBe(true);
    expect(screen.getByRole('tab', { name: 'Password' }).props.focusable).toBe(false);
  });

  it('draws every design and variant', async () => {
    for (const design of ['brand', 'ios', 'material', 'web'] as const) {
      for (const variant of ['pills', 'underline'] as const) {
        await render(<Account design={design} variant={variant} />);
        expect(screen.getByRole('tab', { name: 'Account' })).toBeSelected();
      }
    }
  });
});

describe('Tabs shorthand', () => {
  it('draws tabs and panels from items, starting on the first enabled one', async () => {
    const onValueChange = jest.fn();
    await render(
      <Tabs
        onValueChange={onValueChange}
        items={[
          { value: 'off', label: 'Off', content: <Text>Off panel</Text>, disabled: true },
          { value: 'account', label: 'Account', content: <Text>Account panel</Text> },
          { value: 'password', label: 'Password', content: <Text>Password panel</Text> },
        ]}
      />
    );
    expect(screen.getByRole('tab', { name: 'Account', selected: true })).toBeTruthy();
    expect(screen.getByText('Account panel')).toBeTruthy();
    await fireEvent.press(screen.getByRole('tab', { name: 'Password' }));
    expect(onValueChange).toHaveBeenCalledWith('password');
    expect(screen.getByText('Password panel')).toBeTruthy();
    expect(screen.queryByText('Account panel')).toBeNull();
  });

  it('heads each group of vertical tabs, once per run of tabs sharing it', async () => {
    const items = [
      { value: 'profile', label: 'Profile', content: null },
      { value: 'sync', label: 'Sync', content: null, group: 'Advanced' },
      { value: 'api', label: 'API keys', content: null, group: 'Advanced' },
    ];
    const { rerender } = await render(<Tabs orientation="vertical" items={items} />);
    expect(screen.getAllByRole('heading', { name: 'Advanced' })).toHaveLength(1);
    await rerender(<Tabs items={items} />);
    expect(screen.queryByText('Advanced')).toBeNull();
  });
});

describe('TabsGroupLabel', () => {
  it('heads a group in a composed vertical list, outside the arrow-key order', async () => {
    const onValueChange = jest.fn();
    await render(
      <Tabs orientation="vertical" defaultValue="profile" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsGroupLabel>Advanced</TabsGroupLabel>
          <TabsTrigger value="sync">Sync</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(screen.getByRole('heading', { name: 'Advanced' })).toBeTruthy();
    await fireEvent(screen.getByRole('tab', { name: 'Profile' }), 'keyDown', keyDown('ArrowDown'));
    expect(onValueChange).toHaveBeenLastCalledWith('sync');
  });
});
