import type { SwitchDesign } from './switch.types';

/** Where the thumb's left edge sits, off and on, so it stays centred in the track's ends whatever its size. */
export const getThumbTravel = ({ trackWidth, trackHeight, thumbOff, thumbOn }: SwitchDesign) => ({
  off: (trackHeight - thumbOff) / 2,
  on: trackWidth - (trackHeight + thumbOn) / 2,
});

/**
 * The thumb drawn at its "on" size and scaled down while off, so a thumb that grows (Material) animates its size on the
 * native driver: its left edge, off and on, and its scale while off.
 */
export const getThumbMotion = (look: SwitchDesign) => {
  const travel = getThumbTravel(look);
  return {
    size: look.thumbOn,
    // Scaling shrinks it about its centre, so the off position moves by half the difference to keep that centre in place.
    x: { off: travel.off - (look.thumbOn - look.thumbOff) / 2, on: travel.on },
    scaleOff: look.thumbOff / look.thumbOn,
  };
};
