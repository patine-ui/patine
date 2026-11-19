import type { Design } from '@/core/theme/theme.types';
import type { ButtonDesign } from './button.types';

/** shadcn/ui's variant names, so code written for shadcn reads the same here. */
export const BUTTON_VARIANT = {
  default: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
  link: 'link',
} as const;

/** `icon` is a square button for a lone icon; give it an accessibilityLabel. */
export const BUTTON_SIZE = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
  icon: 'icon',
} as const;

/** How each design sizes and shapes a button. Heights are per size; `icon` takes the default height, square. */
export const BUTTON_DESIGN: Record<Design, ButtonDesign> = {
  brand: {
    heights: { sm: 36, default: 44, lg: 52 },
    paddingX: { sm: 12, default: 16, lg: 24 },
    radius: 'md',
    textSize: { sm: 'sm', default: 'md', lg: 'md' },
    weight: 'medium',
    shadow: 'xs',
  },
  ios: {
    heights: { sm: 34, default: 44, lg: 50 },
    paddingX: { sm: 12, default: 16, lg: 20 },
    radius: 'md',
    textSize: { sm: 'sm', default: 'md', lg: 'lg' },
    weight: 'semibold',
    shadow: 'none',
  },
  material: {
    heights: { sm: 32, default: 40, lg: 56 },
    paddingX: { sm: 12, default: 24, lg: 28 },
    radius: 'full',
    textSize: { sm: 'sm', default: 'sm', lg: 'md' },
    weight: 'medium',
    shadow: 'none',
  },
  web: {
    heights: { sm: 32, default: 36, lg: 40 },
    paddingX: { sm: 12, default: 16, lg: 24 },
    radius: 'sm',
    textSize: { sm: 'sm', default: 'sm', lg: 'md' },
    weight: 'medium',
    shadow: 'xs',
  },
};
