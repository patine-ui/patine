import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Heading } from './Heading';

const styleOf = (text: string) => StyleSheet.flatten(screen.getByText(text).props.style);

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
