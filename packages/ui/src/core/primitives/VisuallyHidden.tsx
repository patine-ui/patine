import type { ReactNode } from 'react';
import { Platform, Text, type TextProps, View, type ViewStyle } from 'react-native';

export interface VisuallyHiddenProps extends TextProps {
  children?: ReactNode;
}

// Clipped to nothing rather than hidden, so screen readers still read it. `clip` keeps it out of sight in every browser.
const HIDDEN: ViewStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  borderWidth: 0,
  ...Platform.select<ViewStyle>({ web: { clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } as ViewStyle, default: {} }),
};

/** Content only screen readers get: a label for an icon, a hint, the text behind a symbol. Takes no space on screen. */
export const VisuallyHidden = ({ children, style, ...rest }: VisuallyHiddenProps) =>
  typeof children === 'string' || typeof children === 'number' ? (
    <Text style={[HIDDEN, style]} {...rest}>
      {children}
    </Text>
  ) : (
    <View style={[HIDDEN, style]}>{children}</View>
  );
