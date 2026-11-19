import { Box } from '@/foundations/layout/Box';
import type { StackProps } from './stack.types';

/** Lays out its children in a column (or a row) with the theme's spacing between them. */
export const Stack = ({ direction = 'column', ...rest }: StackProps) => <Box direction={direction} {...rest} />;

/** A Stack in a row, its children centered on the cross axis. */
export const HStack = ({ align = 'center', ...rest }: Omit<StackProps, 'direction'>) => <Stack direction="row" align={align} {...rest} />;

/** A Stack in a column. */
export const VStack = (props: Omit<StackProps, 'direction'>) => <Stack direction="column" {...props} />;
