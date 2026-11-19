import { usePulse } from '@/core/animation';
import { AnimatedView } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { themed } from './skeleton.styles';
import type { SkeletonProps } from './skeleton.types';
import { getBoneShape } from './skeleton.utils';

/**
 * A placeholder shaped like the content that's loading, breathing gently (still when the OS asks to reduce motion).
 * Hidden from screen readers: mark the region that's loading with `aria-busy` instead.
 */
export const Skeleton = ({ width = '100%', height = 16, radius = 'sm', theme: themeProp, style, ...rest }: SkeletonProps) => {
  const theme = useTheme(themeProp);
  // An animated value: the one style that can't live in a sheet.
  const pulse = { opacity: usePulse() };
  return <AnimatedView aria-hidden style={[getBoneShape(theme, width, height, radius), themed(theme).bone, pulse, style]} {...rest} />;
};
