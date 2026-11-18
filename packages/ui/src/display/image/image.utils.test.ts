import { sourceKey, toImageStatus } from './image.utils';

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
