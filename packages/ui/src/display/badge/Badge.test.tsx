import { Text as RNText, StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { useContentColor } from '@/core/theme/ContentColor';
import { lightTheme } from '@/core/theme/theme.constants';
import { Badge } from './Badge';

const Swatch = () => <RNText testID="swatch">{useContentColor()}</RNText>;

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

  it('gives a start icon without its own color the label color', async () => {
    await render(
      <Badge variant="success" startIcon={<Swatch />}>
        Paid
      </Badge>
    );
    expect(screen.getByTestId('swatch')).toHaveTextContent(lightTheme.colors.success);
  });
});
