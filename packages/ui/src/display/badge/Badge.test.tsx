import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Badge } from './Badge';

describe('Badge', () => {
  it('draws its label in the variant colors', async () => {
    await render(
      <Badge variant="destructive" testID="badge">
        Overdue
      </Badge>
    );
    expect(StyleSheet.flatten(screen.getByTestId('badge').props.style).backgroundColor).toBe(lightTheme.colors.danger);
    expect(StyleSheet.flatten(screen.getByText('Overdue').props.style).color).toBe(lightTheme.colors.onDanger);
  });
});
