/** What screen readers say: "Maya is typing", or "Typing" without a name. */
export const typingLabel = (name?: string) => (name?.trim() ? `${name.trim()} is typing` : 'Typing');

/**
 * One dot's opacity over a 0 → 1 sweep: it brightens to 1 at its own turn and rests at `min` around it, so the dots light up
 * one after another. Both ends rest at `min`, so the loop restarts without a jump.
 */
export const dotWave = (index: number, count: number, min: number) => {
  const step = 1 / (count + 1);
  const peak = (index + 1) * step;
  const half = step * 0.9;
  return {
    inputRange: [0, peak - half, peak, peak + half, 1],
    outputRange: [min, min, 1, min, min],
  };
};
