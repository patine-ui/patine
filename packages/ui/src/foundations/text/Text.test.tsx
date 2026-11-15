import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { PatineProvider } from '@/core/theme/ThemeProvider';
import { darkTheme, lightTheme } from '@/core/theme/theme.constants';
import { Heading } from './Heading';
import { Text } from './Text';

const styleOf = (text: string) => StyleSheet.flatten(screen.getByText(text).props.style);

describe('Text', () => {
  it('draws in the theme scale and color, with style on top', async () => {
    await render(
      <Text size="lg" weight="medium" color="textSecondary" style={{ letterSpacing: 1 }}>
        Hello
      </Text>
    );
    expect(styleOf('Hello')).toMatchObject({
      fontSize: lightTheme.typography.sizes.lg,
      fontWeight: lightTheme.typography.weights.medium,
      color: lightTheme.colors.textSecondary,
      letterSpacing: 1,
    });
  });

  it("follows the provider's color scheme", async () => {
    await render(
      <PatineProvider colorScheme="dark">
        <Text>Night</Text>
      </PatineProvider>
    );
    expect(styleOf('Night').color).toBe(darkTheme.colors.text);
  });
});

describe('Heading', () => {
  it('is a heading for screen readers, sized by its level', async () => {
    await render(<Heading level={1}>Title</Heading>);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeTruthy();
    expect(styleOf('Title')).toMatchObject({
      fontSize: lightTheme.typography.sizes['3xl'],
      fontWeight: lightTheme.typography.weights.bold,
    });
  });

  it('lets size override the level', async () => {
    await render(
      <Heading level={1} size="md">
        Small
      </Heading>
    );
    expect(styleOf('Small').fontSize).toBe(lightTheme.typography.sizes.md);
  });
});
