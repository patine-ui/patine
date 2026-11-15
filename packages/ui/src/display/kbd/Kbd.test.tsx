import { render, screen } from '@testing-library/react-native';

import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('draws each key and reads symbols as words', async () => {
    await render(<Kbd keys={['⌘', 'K']} />);
    expect(screen.getByLabelText('Command K')).toBeTruthy();
    expect(screen.getByText('⌘')).toBeTruthy();
    expect(screen.getByText('K')).toBeTruthy();
  });

  it('takes one key as children', async () => {
    await render(<Kbd>Esc</Kbd>);
    expect(screen.getByLabelText('Esc')).toBeTruthy();
  });
});
