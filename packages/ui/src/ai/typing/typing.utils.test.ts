import { dotWave, typingLabel } from './typing.utils';

describe('typingLabel', () => {
  it('names who is typing', () => {
    expect(typingLabel('Maya')).toBe('Maya is typing');
    expect(typingLabel('  ')).toBe('Typing');
    expect(typingLabel()).toBe('Typing');
  });
});

describe('dotWave', () => {
  it('lights each dot at its own turn, in order', () => {
    const peaks = [0, 1, 2].map((i) => dotWave(i, 3, 0.35).inputRange[2]);
    expect(peaks).toEqual([0.25, 0.5, 0.75]);
  });

  it('rises strictly inside the sweep and rests dim at both ends', () => {
    for (const i of [0, 1, 2]) {
      const { inputRange, outputRange } = dotWave(i, 3, 0.35);
      for (let k = 1; k < inputRange.length; k++) expect(inputRange[k]).toBeGreaterThan(inputRange[k - 1] as number);
      expect(outputRange[0]).toBe(0.35);
      expect(outputRange[outputRange.length - 1]).toBe(0.35);
    }
  });
});
