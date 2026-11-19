import type { Design } from '@/core/theme/theme.types';
import type { SwitchDesign } from './switch.types';

export const SWITCH_DESIGN: Record<Design, SwitchDesign> = {
  brand: {
    trackWidth: 44,
    trackHeight: 26,
    thumbOff: 22,
    thumbOn: 22,
    outlinedOff: false,
    spinner: 12,
    spinnerStroke: 2,
    spinnerOff: 'textSecondary',
  },
  ios: {
    trackWidth: 51,
    trackHeight: 31,
    thumbOff: 27,
    thumbOn: 27,
    outlinedOff: false,
    spinner: 15,
    spinnerStroke: 2,
    spinnerOff: 'textSecondary',
  },
  // Material's off thumb is grey and drawn at 2/3 size, so its spinner is light and a little larger before the scale.
  material: {
    trackWidth: 52,
    trackHeight: 32,
    thumbOff: 16,
    thumbOn: 24,
    outlinedOff: true,
    spinner: 14,
    spinnerStroke: 2.5,
    spinnerOff: 'surface',
  },
  web: {
    trackWidth: 36,
    trackHeight: 20,
    thumbOff: 16,
    thumbOn: 16,
    outlinedOff: false,
    spinner: 10,
    spinnerStroke: 1.5,
    spinnerOff: 'textSecondary',
  },
};

/** One turn of the loading spinner, in ms. */
export const SWITCH_SPIN_MS = 800;

/** The off track's outline in designs with `outlinedOff`. */
export const SWITCH_OUTLINE_WIDTH = 2;
