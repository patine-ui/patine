import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Switch } from './Switch';

describe('Switch', () => {
  it('flips on its own, named by its label, with the label first', async () => {
    const onCheckedChange = jest.fn();
    await render(<Switch label="Wi-Fi" description="Join known networks" onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole('switch', { name: 'Wi-Fi' });
    expect(toggle).not.toBeChecked();
    await fireEvent.press(toggle);
    expect(toggle).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(toggle.props.accessibilityHint).toBe('Join known networks');
  });

  it('follows a controlled value', async () => {
    const onCheckedChange = jest.fn();
    await render(<Switch label="Bluetooth" checked onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByRole('switch', { name: 'Bluetooth' }));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('switch', { name: 'Bluetooth' })).toBeChecked();
  });

  it('sits after its label by default, and before it with controlPosition or the deprecated controlAtStart', async () => {
    const direction = (name: string) => StyleSheet.flatten(screen.getByRole('switch', { name }).props.style).flexDirection;
    await render(
      <>
        <Switch label="Default" />
        <Switch label="Start" controlPosition="start" />
        <Switch label="Legacy" controlAtStart />
      </>
    );
    expect(direction('Default')).toBe('row-reverse');
    expect(direction('Start')).toBe('row');
    expect(direction('Legacy')).toBe('row');
  });
});
