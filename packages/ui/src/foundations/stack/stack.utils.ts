import type { ViewStyle } from 'react-native';

import type { Theme } from '@/core/theme/theme.types';
import type { Space, StackLayout } from './stack.types';

/** A spacing step's points, a number as is, or nothing. */
export const toSpace = (spacing: Theme['spacing'], space: Space | undefined) => (typeof space === 'string' ? spacing[space] : space);

/** The flex style for a stack's layout props. */
export const getStackStyle = (spacing: Theme['spacing'], layout: StackLayout): ViewStyle => ({
  flexDirection: layout.direction ?? 'column',
  gap: toSpace(spacing, layout.gap),
  padding: toSpace(spacing, layout.padding),
  alignItems: layout.align,
  justifyContent: layout.justify,
  flexWrap: layout.wrap ? 'wrap' : undefined,
});
