import { getImageAlt, sourceKey, toImageStatus } from './image.utils';

let mockWeb = false;
jest.mock('@/core/core.constants', () => ({
  ...jest.requireActual('@/core/core.constants'),
  get IS_WEB() {
    return mockWeb;
  },
}));

describe('sourceKey', () => {
  it('keys a source by its URI or asset number', () => {
    expect(sourceKey({ uri: 'https://a.png' })).toBe('https://a.png');
    expect(sourceKey(7)).toBe('asset:7');
    expect(sourceKey([{ uri: 'a@1x' }, { uri: 'a@2x' }])).toBe('a@1x|a@2x');
    expect(sourceKey(undefined)).toBe('');
    expect(sourceKey({})).toBe('');
  });
});

describe('toImageStatus', () => {
  it('loads a new source and keeps what the current one settled to', () => {
    expect(toImageStatus('a', null)).toBe('loading');
    expect(toImageStatus('a', { key: 'a', status: 'loaded' })).toBe('loaded');
    expect(toImageStatus('b', { key: 'a', status: 'error' })).toBe('loading');
  });

  it('falls back when there is no source', () => {
    expect(toImageStatus('', null)).toBe('error');
  });
});

describe('getImageAlt', () => {
  afterEach(() => {
    mockWeb = false;
  });

  it("gives React Native Web's <img> its alt text, and adds nothing on native or without alt", () => {
    expect(getImageAlt('A red door')).toEqual({});
    mockWeb = true;
    expect(getImageAlt('A red door')).toEqual({ 'aria-label': 'A red door' });
    expect(getImageAlt(undefined)).toEqual({});
  });
});
