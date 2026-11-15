import { speakKeys } from './kbd.utils';

describe('speakKeys', () => {
  it('names the symbols and keeps plain keys', () => {
    expect(speakKeys(['⌘', '⇧', 'P'])).toBe('Command Shift P');
    expect(speakKeys(['Ctrl', 'C'])).toBe('Ctrl C');
  });
});
