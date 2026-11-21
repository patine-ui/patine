import type { TextStyle, ViewStyle } from 'react-native';

/** A fill in a runtime colour: an app's or a data colour, never a theme one (those go through createStyles). */
export const fillOf = (color: string): ViewStyle => ({ backgroundColor: color });

/** A stroke in a runtime colour. */
export const strokeOf = (color: string): ViewStyle => ({ borderColor: color });

/** Text in a runtime colour. */
export const inkOf = (color: string): TextStyle => ({ color });

/** A runtime height. */
export const heightOf = (height: number): ViewStyle => ({ height });

/** A runtime width or height, by name, such as a carousel slide along its axis. */
export const extentOf = (axis: 'width' | 'height', size: number): ViewStyle => ({ [axis]: size });

/** Text at a runtime size, with room for tall glyphs such as emoji. */
export const fontSizeOf = (fontSize: number): TextStyle => ({
  fontSize,
  lineHeight: fontSize * 1.2,
});

/** A runtime opacity. */
export const opacityOf = (opacity: number): ViewStyle => ({ opacity });
