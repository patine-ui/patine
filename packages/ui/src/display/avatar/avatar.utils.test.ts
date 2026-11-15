import { describeGroup, getInitials, splitAvatars, toAvatarSize, toImageSource } from './avatar.utils';

describe('getInitials', () => {
  it.each([
    ['Ada Lovelace', 'AL'],
    ['Grace Brewster Murray Hopper', 'GH'],
    ['Cher', 'C'],
    ['  spaced   out  ', 'so'],
    ['', ''],
    [undefined, ''],
  ])('%s → %s', (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe('toAvatarSize / toImageSource', () => {
  it('maps named sizes and keeps numbers', () => {
    expect(toAvatarSize('lg')).toBe(56);
    expect(toAvatarSize(24)).toBe(24);
  });

  it('wraps a URL in a source', () => {
    expect(toImageSource('https://x.dev/a.png')).toEqual({ uri: 'https://x.dev/a.png' });
    expect(toImageSource(undefined)).toBeUndefined();
  });
});

describe('splitAvatars', () => {
  it('keeps all within max, and leaves the last slot for +N past it', () => {
    expect(splitAvatars([1, 2, 3], 3)).toEqual({ shown: [1, 2, 3], rest: 0 });
    expect(splitAvatars([1, 2, 3, 4, 5], 3)).toEqual({ shown: [1, 2], rest: 3 });
    expect(splitAvatars([1, 2, 3], undefined)).toEqual({ shown: [1, 2, 3], rest: 0 });
  });
});

describe('describeGroup', () => {
  it('lists the names and counts the rest', () => {
    expect(describeGroup(['Maya', 'Daniel'], 0)).toBe('Maya and Daniel');
    expect(describeGroup(['Maya', 'Daniel'], 3)).toBe('Maya, Daniel and 3 others');
    expect(describeGroup(['Maya'], 1)).toBe('Maya and 1 other');
  });
});
