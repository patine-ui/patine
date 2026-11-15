import { Pressable, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';
import type { CollapsibleProps, CollapsibleTriggerProps } from './collapsible.types';

const Section = ({
  trigger,
  ...props
}: Omit<CollapsibleProps, 'children' | 'trigger'> & { trigger?: Partial<CollapsibleTriggerProps> }) => (
  <Collapsible {...props}>
    <CollapsibleTrigger {...trigger}>Details</CollapsibleTrigger>
    <CollapsibleContent>
      <Text>Ships in two days.</Text>
    </CollapsibleContent>
  </Collapsible>
);

// Icons are hidden from screen readers; the trigger says expanded.
const HIDDEN = { includeHiddenElements: true };

const finishAnimations = () =>
  act(async () => {
    jest.runAllTimers();
  });

describe('Collapsible', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('opens and closes, reporting each change', async () => {
    const onOpenChange = jest.fn();
    await render(<Section onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger).toBeCollapsed();
    expect(screen.queryByText('Ships in two days.')).toBeNull();

    await fireEvent.press(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(trigger).toBeExpanded();
    expect(screen.getByText('Ships in two days.')).toBeOnTheScreen();

    await fireEvent.press(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await finishAnimations();
    expect(screen.queryByText('Ships in two days.')).toBeNull();
  });

  it('follows a controlled open without reporting it', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(<Section open={false} onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Details' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Details' })).toBeCollapsed();
    onOpenChange.mockClear();
    await rerender(<Section open onOpenChange={onOpenChange} />);
    expect(screen.getByRole('button', { name: 'Details' })).toBeExpanded();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('ignores presses when disabled', async () => {
    const onOpenChange = jest.fn();
    await render(<Section disabled onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Details' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('draws any icon, from the open state, or none', async () => {
    const { rerender } = await render(<Section trigger={{ icon: <Text>ICON</Text> }} />);
    expect(screen.getByText('ICON', HIDDEN)).toBeTruthy();
    await rerender(<Section trigger={{ renderIcon: ({ open }) => <Text>{open ? 'minus' : 'plus'}</Text> }} />);
    expect(screen.getByText('plus', HIDDEN)).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: /Details/ }));
    expect(screen.getByText('minus', HIDDEN)).toBeTruthy();
    await rerender(<Section trigger={{ icon: <Text>ICON</Text>, iconPosition: 'none' }} />);
    expect(screen.queryByText('ICON', HIDDEN)).toBeNull();
  });

  it('makes its one child the trigger with asChild', async () => {
    const onPress = jest.fn();
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Pressable role="button" aria-label="Show more" onPress={onPress} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>More</Text>
        </CollapsibleContent>
      </Collapsible>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Show more' }));
    expect(onPress).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Show more' })).toBeExpanded();
    expect(screen.getByText('More')).toBeOnTheScreen();
  });

  it('draws every design', async () => {
    for (const design of ['brand', 'ios', 'material', 'web'] as const) {
      await render(<Section design={design} defaultOpen />);
      expect(screen.getByRole('button', { name: 'Details' })).toBeExpanded();
    }
  });
});

describe('Collapsible shorthand', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('draws a label trigger from a string and puts its children in the content', async () => {
    await render(
      <Collapsible trigger="Details">
        <Text>Ships in two days.</Text>
      </Collapsible>
    );
    expect(screen.queryByText('Ships in two days.')).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Details', expanded: false }));
    await finishAnimations();
    expect(screen.getByText('Ships in two days.')).toBeTruthy();
  });

  it('uses an element trigger as is', async () => {
    await render(
      <Collapsible
        trigger={
          <Pressable accessibilityRole="button" accessibilityLabel="More">
            <Text>More</Text>
          </Pressable>
        }
      >
        <Text>Ships in two days.</Text>
      </Collapsible>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More', expanded: false }));
    await finishAnimations();
    expect(screen.getByText('Ships in two days.')).toBeTruthy();
  });
});
