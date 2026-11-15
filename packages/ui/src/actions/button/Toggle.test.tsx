import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { ToggleButton } from './ToggleButton';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const ALIGN = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

describe('ToggleButton', () => {
  it('flips its pressed state and tints when pressed', async () => {
    const onPressedChange = jest.fn();
    await render(<ToggleButton onPressedChange={onPressedChange}>Bold</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button.props['aria-pressed']).toBe(false);
    await fireEvent.press(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Bold' }).props['aria-pressed']).toBe(true);
    expect(StyleSheet.flatten(screen.getByRole('button', { name: 'Bold' }).props.style).backgroundColor).toBe(
      lightTheme.colors.primaryMuted
    );
  });

  it('does not call onPressedChange when `pressed` changes from outside', async () => {
    const onPressedChange = jest.fn();
    await render(
      <ToggleButton pressed={false} onPressedChange={onPressedChange}>
        Bold
      </ToggleButton>
    );
    await screen.rerender(
      <ToggleButton pressed onPressedChange={onPressedChange}>
        Bold
      </ToggleButton>
    );
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Bold' }).props['aria-pressed']).toBe(true);
  });
});

describe('ToggleGroup', () => {
  it('single: a radio group that keeps one pressed and can be cleared', async () => {
    const onValueChange = jest.fn();
    await render(<ToggleGroup type="single" items={ALIGN} defaultValue="left" onValueChange={onValueChange} aria-label="Alignment" />);
    expect(screen.getByLabelText('Alignment').props.role).toBe('radiogroup');
    expect(screen.getByRole('radio', { name: 'Left', checked: true })).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Center' }));
    expect(onValueChange).toHaveBeenLastCalledWith('center');
    expect(screen.getByRole('radio', { name: 'Left', checked: false })).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Center' }));
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it('multiple: pressed buttons that add and remove values, also from children', async () => {
    const onValueChange = jest.fn();
    await render(
      <ToggleGroup type="multiple" value={['bold']} onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole('button', { name: 'B' }).props['aria-pressed']).toBe(true);
    await fireEvent.press(screen.getByRole('button', { name: 'I' }));
    expect(onValueChange).toHaveBeenCalledWith(['bold', 'italic']);
  });

  it('attached: squares the inner corners', async () => {
    await render(<ToggleGroup type="single" attached items={ALIGN} />);
    expect(StyleSheet.flatten(screen.getByRole('radio', { name: 'Center' }).props.style)).toMatchObject({
      borderTopStartRadius: 0,
      borderBottomEndRadius: 0,
    });
  });
});

describe('ButtonGroup', () => {
  it('is a group that joins its buttons and passes down the variant', async () => {
    await render(
      <ButtonGroup variant="outline" aria-label="Pages">
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
    );
    expect(screen.getByLabelText('Pages').props.role).toBe('group');
    expect(StyleSheet.flatten(screen.getByRole('button', { name: 'Next' }).props.style)).toMatchObject({
      borderColor: lightTheme.colors.border,
      borderTopStartRadius: 0,
      marginStart: -1,
    });
  });
});
