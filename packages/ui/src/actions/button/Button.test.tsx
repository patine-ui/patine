import { Text as RNText, StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { useContentColor } from '@/core/theme/ContentColor';
import { DESIGN_TOKENS, lightTheme } from '@/core/theme/theme.constants';
import { Button } from './Button';

const boxOf = (name: string) => StyleSheet.flatten(screen.getByRole('button', { name }).props.style);

/** Stands in for an Icon without a color: it shows the color it would draw in. */
const Swatch = () => <RNText testID="swatch">{useContentColor()}</RNText>;

describe('Button', () => {
  it("gives icons without their own color the variant's label color", async () => {
    await render(<Button startIcon={<Swatch />}>Save</Button>);
    expect(screen.getByTestId('swatch')).toHaveTextContent(lightTheme.colors.onPrimary);
    await render(
      <Button variant="outline" startIcon={<Swatch />} styles={{ label: { color: 'tomato' } }}>
        Save
      </Button>
    );
    expect(screen.getByTestId('swatch')).toHaveTextContent('tomato');
  });

  it('is a button named by its label, and presses', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Save</Button>);
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('fills with the primary color by default, in the brand design', async () => {
    await render(<Button>Save</Button>);
    expect(boxOf('Save')).toMatchObject({
      backgroundColor: lightTheme.colors.primary,
      height: 44,
      borderRadius: DESIGN_TOKENS.brand.radius?.md,
    });
  });

  it('draws the variant and size it is given', async () => {
    await render(
      <Button variant="outline" size="sm">
        Cancel
      </Button>
    );
    expect(boxOf('Cancel')).toMatchObject({ backgroundColor: 'transparent', borderColor: lightTheme.colors.border, height: 36 });
  });

  it("lifts a filled button on the brand design's shadow, and keeps a ghost button flat", async () => {
    await render(
      <>
        <Button>Save</Button>
        <Button variant="ghost">Skip</Button>
      </>
    );
    expect(boxOf('Save').boxShadow).toBe(DESIGN_TOKENS.brand.shadows?.xs);
    expect(boxOf('Skip').boxShadow).toBeUndefined();
  });

  it("takes the platform's design with design='native'", async () => {
    await render(<Button design="native">Next</Button>);
    // The test platform is iOS.
    expect(boxOf('Next').borderRadius).toBe(lightTheme.radius.md);
    expect(boxOf('Next').boxShadow).toBe('none');
  });

  it('follows its design prop', async () => {
    await render(<Button design="material">Next</Button>);
    expect(boxOf('Next')).toMatchObject({ height: 40, borderRadius: lightTheme.radius.full });
  });

  it('grows a small button to a 44pt touch area', async () => {
    await render(<Button size="sm">Tiny</Button>);
    expect(screen.getByRole('button', { name: 'Tiny' }).props.hitSlop).toEqual({ top: 4, bottom: 4, left: 0, right: 0 });
  });

  it('blocks presses and says so while disabled or loading', async () => {
    const onPress = jest.fn();
    await render(
      <>
        <Button disabled onPress={onPress}>
          Off
        </Button>
        <Button loading onPress={onPress}>
          Busy
        </Button>
      </>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Off' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Busy' }));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Busy' })).toBeBusy();
  });

  it('takes an accessibility label for an icon button, and draws custom children as they are', async () => {
    await render(
      <Button size="icon" aria-label="Close">
        <RNText>×</RNText>
      </Button>
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    expect(boxOf('Close')).toMatchObject({ width: 44, height: 44 });
  });

  it('shows a keyboard focus ring', async () => {
    await render(<Button>Focus me</Button>);
    await fireEvent(screen.getByRole('button', { name: 'Focus me' }), 'focus');
    expect(boxOf('Focus me')).toMatchObject({ outlineColor: lightTheme.colors.primary, outlineWidth: 2 });
    await fireEvent(screen.getByRole('button', { name: 'Focus me' }), 'blur');
    expect(boxOf('Focus me').outlineWidth).toBeUndefined();
  });

  it("leaves its one-line label a pixel each side, so rounding can't clip a glyph's overhang (RTL at 1x)", async () => {
    await render(<Button>קליטה</Button>);
    expect(StyleSheet.flatten(screen.getByText('קליטה').props.style)).toMatchObject({ paddingHorizontal: 1, marginHorizontal: -1 });
  });

  it('styles its label through the `styles.label` slot', async () => {
    await render(<Button styles={{ label: { letterSpacing: 2 } }}>Save</Button>);
    expect(StyleSheet.flatten(screen.getByText('Save').props.style).letterSpacing).toBe(2);
  });
});

describe('Button with href', () => {
  it('is a link', async () => {
    await render(<Button href="/pricing">See pricing</Button>);
    expect(screen.getByRole('link', { name: 'See pricing' })).toBeTruthy();
  });
});
