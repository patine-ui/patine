import type { Design } from '@/core/theme/theme.types';
import type { SwitchDesign } from './switch.types';

export const SWITCH_DESIGN: Record<Design, SwitchDesign> = {
  brand: { trackWidth: 44, trackHeight: 26, thumbOff: 22, thumbOn: 22, outlinedOff: false },
  ios: { trackWidth: 51, trackHeight: 31, thumbOff: 27, thumbOn: 27, outlinedOff: false },
  material: { trackWidth: 52, trackHeight: 32, thumbOff: 16, thumbOn: 24, outlinedOff: true },
  web: { trackWidth: 36, trackHeight: 20, thumbOff: 16, thumbOn: 16, outlinedOff: false },
};

/** The off track's outline in designs with `outlinedOff`. */
export const SWITCH_OUTLINE_WIDTH = 2;
