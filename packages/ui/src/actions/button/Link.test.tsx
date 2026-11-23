import { Linking, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { CopyButton } from './CopyButton';
import { Fab } from './Fab';
import { Link } from './Link';

describe('Link', () => {
  it('is a link that opens its href on native', async () => {
    const open = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    await render(<Link href="https://patine.dev">Docs</Link>);
    await fireEvent.press(screen.getByRole('link', { name: 'Docs' }), { isDefaultPrevented: () => false });
    expect(open).toHaveBeenCalledWith('https://patine.dev');
    open.mockRestore();
  });

  it('runs onPress and marks external links', async () => {
    const onPress = jest.fn();
    await render(
      <Link onPress={onPress} external>
        Status
      </Link>
    );
    await fireEvent.press(screen.getByRole('link'), { isDefaultPrevented: () => false });
    expect(onPress).toHaveBeenCalled();
    expect(screen.getByRole('link')).toHaveTextContent('Status ↗');
  });
});

describe('Fab', () => {
  it('is a named button that can float in a corner', async () => {
    const onPress = jest.fn();
    await render(<Fab icon={<Text>+</Text>} aria-label="New message" placement="bottomEnd" onPress={onPress} />);
    const fab = screen.getByRole('button', { name: 'New message' });
    expect(fab).toHaveStyle({ position: 'absolute', bottom: 16, end: 16 });
    await fireEvent.press(fab);
    expect(onPress).toHaveBeenCalled();
  });
});

describe('CopyButton', () => {
  it('copies the value and says so', async () => {
    const onCopy = jest.fn();
    await render(<CopyButton value="sk_test_123" onCopy={onCopy} />);
    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: 'Copy' }));
    });
    expect(onCopy).toHaveBeenCalledWith('sk_test_123');
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
  });
});
