import { StyleSheet, Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { DESIGN_SHADOWS, DESIGN_TOKENS, lightTheme } from '@/core/theme/theme.constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

describe('Card', () => {
  it('groups a heading, text and actions', async () => {
    await render(
      <Card testID="card">
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Billed yearly</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter />
      </Card>
    );
    expect(screen.getByRole('heading', { name: 'Plan' })).toBeTruthy();
    expect(screen.getByText('Billed yearly')).toBeTruthy();
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style)).toMatchObject({
      borderRadius: DESIGN_TOKENS.brand.radius?.lg,
      borderColor: lightTheme.colors.border,
    });
  });

  it("draws composed parts in the Card's theme", async () => {
    await render(
      <Card theme={{ colors: { text: '#123456', textSecondary: '#654321' } }}>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Billed yearly</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(StyleSheet.flatten(screen.getByText('Plan').props.style)).toMatchObject({ color: '#123456' });
    expect(StyleSheet.flatten(screen.getByText('Billed yearly').props.style)).toMatchObject({ color: '#654321' });
  });

  it('draws a filled, borderless surface in the iOS design', async () => {
    await render(<Card testID="card" design="ios" />);
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style)).toMatchObject({
      borderWidth: 0,
      backgroundColor: lightTheme.colors.surface,
    });
  });

  it("casts the theme's shadow for its level, and the `shadow` prop picks another", async () => {
    const { rerender } = await render(<Card testID="card" />);
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style).boxShadow).toBe(DESIGN_SHADOWS.brand.xs);
    await rerender(<Card testID="card" shadow="lg" theme={{ shadows: { lg: '0px 2px 4px red' } }} />);
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style).boxShadow).toBe('0px 2px 4px red');
  });

  it('is a button with onPress, and rises on hover', async () => {
    const onPress = jest.fn();
    await render(<Card testID="card" onPress={onPress} accessibilityLabel="Pro plan" />);
    const card = screen.getByRole('button', { name: 'Pro plan' });
    await fireEvent.press(card);
    expect(onPress).toHaveBeenCalled();
    await fireEvent(card, 'hoverIn');
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style)).toMatchObject({
      boxShadow: DESIGN_SHADOWS.brand.md,
      transform: [{ translateY: -2 }],
    });
  });

  it('ignores presses when disabled', async () => {
    const onPress = jest.fn();
    await render(<Card onPress={onPress} disabled accessibilityLabel="Plan" />);
    await fireEvent.press(screen.getByRole('button', { name: 'Plan' }));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('Card shorthand', () => {
  it('draws its title, description, body and footer from props', async () => {
    await render(
      <Card title="Plan" description="Billed monthly" footer={<Text>Upgrade</Text>}>
        <Text>Body</Text>
      </Card>
    );
    expect(screen.getByRole('heading', { name: 'Plan' })).toBeTruthy();
    expect(screen.getByText('Billed monthly')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.getByText('Upgrade')).toBeTruthy();
  });
});
