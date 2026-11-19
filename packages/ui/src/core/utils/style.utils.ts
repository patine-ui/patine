import type { TextStyle, ViewStyle } from 'react-native';

/** A fill in a runtime colour: an app's or a data colour, never a theme one (those go through createStyles). */
export const fillOf = (color: string): ViewStyle => ({ backgroundColor: color });

/** A stroke in a runtime colour. */
export const strokeOf = (color: string): ViewStyle => ({ borderColor: color });

/** Text in a runtime colour. */
export const inkOf = (color: string): TextStyle => ({ color });

/** A runtime opacity. */
export const opacityOf = (opacity: number): ViewStyle => ({ opacity });
