import { Text } from '@/core/primitives/Text';
import { HEADING_SIZE } from './text.constants';
import type { HeadingProps } from './text.types';

/** A heading: semibold, in the theme's heading font, sized by its level, and announced as a heading (an `<h1>`–`<h4>` on the web). */
export const Heading = ({ level = 2, size, weight = 'semibold', font = 'heading', ...rest }: HeadingProps) => (
  <Text role="heading" aria-level={level} size={size ?? HEADING_SIZE[level]} weight={weight} font={font} {...rest} />
);
