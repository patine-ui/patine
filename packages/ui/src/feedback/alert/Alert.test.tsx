import { AccessibilityInfo, StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Alert, AlertDescription, AlertTitle } from './Alert';

describe('Alert', () => {
  it('announces a destructive alert and colors its title', async () => {
    const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibilityWithOptions');
    await render(
      <Alert variant="destructive" testID="alert">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check your card details.</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert').props.role).toBe('alert');
    expect(announce).toHaveBeenCalledWith('Payment failed. Check your card details.', { queue: true });
    expect(StyleSheet.flatten(screen.getByText('Payment failed').props.style).color).toBe(lightTheme.colors.danger);
  });

  it('stays quiet by default', async () => {
    const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibilityWithOptions').mockClear();
    await render(
      <Alert testID="alert">
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert').props.role).toBeUndefined();
    expect(announce).not.toHaveBeenCalled();
  });
});

describe('Alert shorthand', () => {
  it('draws its title and description from props, then its children', async () => {
    await render(
      <Alert title="Heads up" description="Your trial ends soon.">
        <AlertDescription>Upgrade to keep your data.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Heads up')).toBeTruthy();
    expect(screen.getByText('Your trial ends soon.')).toBeTruthy();
    expect(screen.getByText('Upgrade to keep your data.')).toBeTruthy();
  });
});
