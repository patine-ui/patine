import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';

export interface TypingIndicatorProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** Who is typing, for screen readers: "Maya is typing". Default: "Typing" */
  name?: string;
  /** Replaces what screen readers say */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
