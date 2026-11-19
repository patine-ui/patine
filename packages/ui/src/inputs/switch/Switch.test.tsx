import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { PatineProvider } from '@/core/theme/ThemeProvider';
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

  it('sits after its label by default, and before it with controlPosition="start"', async () => {
    const direction = (name: string) => StyleSheet.flatten(screen.getByRole('switch', { name }).props.style).flexDirection;
    await render(
      <>
        <Switch label="Default" />
        <Switch label="Start" controlPosition="start" />
      </>
    );
    expect(direction('Default')).toBe('row-reverse');
    expect(direction('Start')).toBe('row');
  });

  it('ignores presses and is announced busy while loading, keeping its state', async () => {
    const onCheckedChange = jest.fn();
    await render(<Switch label="Two-step verification" checked loading onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole('switch', { name: 'Two-step verification' });
    expect(toggle).toBeBusy();
    expect(toggle).toBeChecked();
    await fireEvent.press(toggle);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(toggle).toBeChecked();
  });

  it('slides its thumb toward the end in right to left', async () => {
    await render(
      <PatineProvider dir="rtl">
        <Switch label="Wi-Fi" defaultChecked />
      </PatineProvider>
    );
    type Node = { props: { style?: StyleProp<ViewStyle> }; children?: (Node | string)[] | null };
    const find = (node: Node | string): Node | undefined => {
      if (typeof node === 'string') return undefined;
      if (StyleSheet.flatten(node.props.style)?.start === 0) return node;
      for (const child of node.children ?? []) {
        const hit = find(child);
        if (hit) return hit;
      }
    };
    const thumb = find(screen.toJSON() as Node);
    const { transform } = StyleSheet.flatten(thumb?.props.style) as { transform: { translateX: number }[] };
    expect(transform[0]?.translateX).toBeLessThan(0);
  });
});
