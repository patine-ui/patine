import { createModality } from './modality.utils';

describe('createModality', () => {
  it('switches to keyboard on a plain key and back to pointer on a pointer press', () => {
    const modality = createModality(false);
    expect(modality.isKeyboard()).toBe(false);
    modality.onKeyDown({});
    expect(modality.isKeyboard()).toBe(true);
    modality.onPointerDown();
    expect(modality.isKeyboard()).toBe(false);
  });

  it('ignores shortcuts with a modifier key', () => {
    const modality = createModality(false);
    modality.onKeyDown({ metaKey: true });
    modality.onKeyDown({ ctrlKey: true });
    modality.onKeyDown({ altKey: true });
    expect(modality.isKeyboard()).toBe(false);
  });
});
