import { copyToWebClipboard, getFabPlacement } from './link.utils';

describe('getFabPlacement', () => {
  it('floats it in a corner or the middle, offset from the edges', () => {
    expect(getFabPlacement('bottomEnd', 16)).toMatchObject({ position: 'absolute', bottom: 16, end: 16 });
    expect(getFabPlacement('bottomStart', 24)).toMatchObject({ start: 24 });
    expect(getFabPlacement('bottomCenter', 16)).toMatchObject({ alignSelf: 'center' });
    expect(getFabPlacement(undefined, 16)).toBeNull();
  });
});

describe('copyToWebClipboard', () => {
  const nav = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  afterEach(() => {
    if (nav) Object.defineProperty(globalThis, 'navigator', nav);
  });

  it('writes to the browser clipboard when there is one', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis, 'navigator', { value: { clipboard: { writeText } }, configurable: true });
    await expect(copyToWebClipboard('hi')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hi');
  });

  it('resolves false without one', async () => {
    Object.defineProperty(globalThis, 'navigator', { value: {}, configurable: true });
    await expect(copyToWebClipboard('hi')).resolves.toBe(false);
  });
});
