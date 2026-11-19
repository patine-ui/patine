import { createElement } from 'react';
import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { PatineProvider } from '@/core/theme/ThemeProvider';
import { darkTheme, lightTheme } from '@/core/theme/theme.constants';
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

  it('caps font scaling so fixed-height controls keep their text, unless told otherwise', async () => {
    await render(
      <>
        <Text>Capped</Text>
        <Text maxFontSizeMultiplier={3}>Free</Text>
      </>
    );
    expect(screen.getByText('Capped').props.maxFontSizeMultiplier).toBe(MAX_FONT_SCALE);
    expect(screen.getByText('Free').props.maxFontSizeMultiplier).toBe(3);
  });

  it('starts at the layout start on the web whatever the script, with style on top', async () => {
    // The web branch is picked when core.styles loads, so load Text afresh as if on the web.
    let WebText: typeof Text = Text;
    let WebProvider: typeof PatineProvider = PatineProvider;
    const react = jest.requireActual('react');
    jest.isolateModules(() => {
      jest.doMock('react', () => react);
      const rn: typeof import('react-native') = require('react-native');
      jest
        .spyOn(rn.Platform, 'select')
        .mockImplementation((spec: { web?: unknown; default?: unknown }) => ('web' in spec ? spec.web : spec.default));
      WebText = require('./Text').Text;
      WebProvider = require('@/core/theme/ThemeProvider').PatineProvider;
    });
    await render(
      <WebProvider dir="rtl">
        {createElement(WebText, null, 'Revolut')}
        {createElement(WebText, { style: { textAlign: 'center' } }, 'Centred')}
      </WebProvider>
    );
    expect(styleOf('Revolut').textAlign).toBe('right');
    expect(styleOf('Centred').textAlign).toBe('center');
  });
});
