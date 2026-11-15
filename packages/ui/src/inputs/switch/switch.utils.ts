import type { SwitchDesign } from './switch.types';

/** Where the thumb's left edge sits, off and on, so it stays centred in the track's ends whatever its size. */
export const getThumbTravel = ({ trackWidth, trackHeight, thumbOff, thumbOn }: SwitchDesign) => ({
  off: (trackHeight - thumbOff) / 2,
  on: trackWidth - (trackHeight + thumbOn) / 2,
});
