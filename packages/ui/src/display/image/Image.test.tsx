import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { DESIGN_TOKENS, lightTheme } from '@/core/theme/theme.constants';
import { Image } from './Image';

// A decorative image is hidden from screen readers, so queries for it have to look at hidden elements too.
const hidden = { includeHiddenElements: true };

describe('Image', () => {
  it('is named by alt and busy until the picture loads', async () => {
    const onLoad = jest.fn();
    await render(<Image testID="photo" src="https://example.com/a.png" alt="A red bicycle" aspectRatio={4 / 3} onLoad={onLoad} />);
    const frame = screen.getByLabelText('A red bicycle');
    expect(frame).toHaveProp('aria-busy', true);
    expect(frame).toHaveStyle({ aspectRatio: 4 / 3, borderRadius: DESIGN_TOKENS.brand.radius?.lg });
    await fireEvent(screen.getByTestId('photo-image'), 'load');
    expect(onLoad).toHaveBeenCalled();
    expect(screen.getByLabelText('A red bicycle')).toHaveProp('aria-busy', false);
  });

  it('is decorative without alt', async () => {
    await render(<Image testID="photo" src="https://example.com/a.png" />);
    expect(screen.queryByTestId('photo')).toBeNull();
    expect(screen.getByTestId('photo', hidden)).toHaveProp('aria-hidden', true);
  });

  it('shows the fallback when the picture fails, and without one', async () => {
    const onError = jest.fn();
    await render(
      <Image testID="photo" alt="Avatar" src="https://invalid.example/404.png" fallback={<Text>No photo</Text>} onError={onError} />
    );
    await fireEvent(screen.getByTestId('photo-image'), 'error');
    expect(onError).toHaveBeenCalled();
    expect(screen.getByText('No photo')).toBeTruthy();
    expect(screen.queryByTestId('photo-image')).toBeNull();

    await render(<Image alt="Cover" fallback={<Text>Nothing here</Text>} />);
    expect(screen.getByText('Nothing here')).toBeTruthy();
  });

  it('takes a radius and follows the design', async () => {
    await render(<Image testID="a" src="https://example.com/a.png" radius={20} />);
    expect(screen.getByTestId('a', hidden)).toHaveStyle({ borderRadius: 20 });
    await render(<Image testID="b" src="https://example.com/a.png" design="ios" />);
    expect(screen.getByTestId('b', hidden)).toHaveStyle({ borderWidth: 0, borderRadius: lightTheme.radius.md });
  });
});
