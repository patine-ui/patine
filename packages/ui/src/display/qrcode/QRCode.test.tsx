import { Text } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { QRCode } from './QRCode';

describe('QRCode', () => {
  it('is an image named for screen readers, drawn one view per run of modules', async () => {
    await render(<QRCode value="https://patine.dev" accessibilityLabel="Open patine.dev" size={150} testID="qr" />);
    const image = screen.getByRole('img', { name: 'Open patine.dev' });
    expect(image.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ width: 150, height: 150 })]));
    expect(screen.getByTestId('qr').children.length).toBeGreaterThan(50);
  });

  it('shows a logo in the centre', async () => {
    await render(<QRCode value="hello" logo={<Text>logo</Text>} />);
    expect(screen.getByText('logo')).toBeTruthy();
  });

  it('draws nothing and reports an error when the value is too long', async () => {
    const onError = jest.fn();
    await render(<QRCode value={'a'.repeat(3000)} onError={onError} testID="qr" />);
    expect(screen.queryByTestId('qr')).toBeNull();
    expect(onError).toHaveBeenCalledWith(expect.any(RangeError));
  });
});
