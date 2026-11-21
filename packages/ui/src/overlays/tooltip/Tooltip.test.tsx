import { Pressable, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Tooltip } from './Tooltip';
import { TooltipProvider } from './TooltipProvider';
import type { TooltipProps } from './tooltip.types';

// Hover and focus are web-only; each test picks the platform.
let mockWeb = true;
jest.mock('@/core/core.constants', () => ({
  ...jest.requireActual('@/core/core.constants'),
  get IS_WEB() {
    return mockWeb;
  },
}));

const Example = (props: Partial<TooltipProps>) => (
  <TooltipProvider>
    <Tooltip content="Copy link" testID="tip" {...props}>
      <Pressable accessibilityRole="button" aria-label="Copy">
        <Text>⧉</Text>
      </Pressable>
    </Tooltip>
  </TooltipProvider>
);

describe('Tooltip', () => {
  const { measureInWindow }: { measureInWindow: jest.Mock } = jest.requireActual(
    '@react-native/jest-preset/jest/MockNativeMethods'
  ).default;
  beforeEach(() => {
    mockWeb = true;
    jest.useFakeTimers();
    measureInWindow.mockImplementation((callback: (...rect: number[]) => void) => callback(100, 300, 40, 40));
  });
  afterEach(() => {
    measureInWindow.mockReset();
    jest.useRealTimers();
  });

  const advance = async (ms: number) => {
    await act(async () => {
      jest.advanceTimersByTime(ms);
    });
  };
  const button = () => screen.getByRole('button', { name: 'Copy' });
  const tip = () => screen.queryByTestId('tip');

  it('opens after resting on the trigger, and closes on leave', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    await fireEvent(button(), 'hoverIn');
    await advance(499);
    expect(tip()).toBeNull();
    await advance(1);
    expect(tip()?.props.role).toBe('tooltip');
    expect(screen.getByText('Copy link')).toBeTruthy();
    expect(button().props['aria-describedby']).toBe(tip()?.props.id);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await fireEvent(button(), 'hoverOut');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await advance(1000);
    expect(tip()).toBeNull();
  });

  it('measures the trigger itself, so a floating trigger gets its tooltip beside it, and keeps the trigger’s own ref', async () => {
    let node: { measureInWindow: (cb: (...rect: number[]) => void) => void } | null = null;
    const theirs = jest.fn();
    await render(
      <TooltipProvider>
        <Tooltip content="Ask" testID="tip">
          <Pressable
            ref={(el) => {
              node = el as typeof node;
              theirs(el);
            }}
            accessibilityRole="button"
            aria-label="Copy"
          >
            <Text>✦</Text>
          </Pressable>
        </Tooltip>
      </TooltipProvider>
    );
    const ownMeasure = jest.fn((callback: (...rect: number[]) => void) => callback(1200, 700, 56, 56));
    if (!node) throw new Error('The trigger got no ref');
    (node as { measureInWindow: typeof ownMeasure }).measureInWindow = ownMeasure;
    await fireEvent(button(), 'hoverIn');
    await advance(500);
    expect(ownMeasure).toHaveBeenCalled();
    expect(measureInWindow).not.toHaveBeenCalled();
    expect(theirs).toHaveBeenCalledWith(node);
    expect(tip()?.props.role).toBe('tooltip');
  });

  it('never opens when the pointer leaves before the delay', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} delayDuration={200} />);
    await fireEvent(button(), 'hoverIn');
    await advance(100);
    await fireEvent(button(), 'hoverOut');
    await advance(1000);
    expect(tip()).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('skips the delay when moving straight to another tooltip', async () => {
    await render(
      <TooltipProvider delayDuration={500} skipDelayDuration={300}>
        <Tooltip content="Bold">
          <Pressable accessibilityRole="button" aria-label="B" />
        </Tooltip>
        <Tooltip content="Italic">
          <Pressable accessibilityRole="button" aria-label="I" />
        </Tooltip>
      </TooltipProvider>
    );
    await fireEvent(screen.getByRole('button', { name: 'B' }), 'hoverIn');
    await advance(500);
    expect(screen.getByText('Bold')).toBeTruthy();
    await fireEvent(screen.getByRole('button', { name: 'B' }), 'hoverOut');
    await fireEvent(screen.getByRole('button', { name: 'I' }), 'hoverIn');
    expect(screen.getByText('Italic')).toBeTruthy();
  });

  it('opens on keyboard focus and closes on blur, a press or Escape', async () => {
    const listeners = new Map<string, (e: { key: string }) => void>();
    const doc = {
      addEventListener: (type: string, listener: (e: { key: string }) => void) => listeners.set(type, listener),
      removeEventListener: (type: string) => listeners.delete(type),
    };
    Reflect.set(globalThis, 'document', doc);
    try {
      await render(<Example />);
      await fireEvent(button(), 'focus');
      expect(tip()).toBeTruthy();
      await fireEvent(button(), 'blur');
      await advance(1000);
      expect(tip()).toBeNull();

      await fireEvent(button(), 'focus');
      await act(async () => listeners.get('keydown')?.({ key: 'Escape' }));
      await advance(1000);
      expect(tip()).toBeNull();

      await fireEvent(button(), 'hoverIn');
      await advance(500);
      await fireEvent(button(), 'pressIn');
      await advance(1000);
      expect(tip()).toBeNull();
    } finally {
      Reflect.deleteProperty(globalThis, 'document');
    }
  });

  it('shows on a long press on touch screens, then hides', async () => {
    mockWeb = false;
    await render(<Example />);
    await fireEvent(button(), 'hoverIn');
    await advance(1000);
    expect(tip()).toBeNull();
    await fireEvent(button(), 'longPress');
    expect(tip()).toBeTruthy();
    expect(button().props['aria-describedby']).toBeUndefined();
    await advance(1500);
    await advance(1000);
    expect(tip()).toBeNull();
  });

  it('follows `open` when controlled, and keeps the trigger’s own handlers', async () => {
    const onLongPress = jest.fn();
    const onOpenChange = jest.fn();
    const ui = (open: boolean) => (
      <Tooltip content="Copy link" testID="tip" open={open} onOpenChange={onOpenChange}>
        <Pressable accessibilityRole="button" aria-label="Copy" onLongPress={onLongPress} />
      </Tooltip>
    );
    const { rerender } = await render(ui(true));
    expect(tip()).toBeTruthy();
    await rerender(ui(false));
    await advance(1000);
    expect(tip()).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
    await fireEvent(button(), 'longPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
