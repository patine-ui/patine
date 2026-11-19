import { Animated } from 'react-native';

/** The views animated values drive. Components render these and never import `Animated` themselves. */
export const AnimatedView = Animated.View;
export const AnimatedText = Animated.Text;
export const AnimatedImage = Animated.Image;
export const AnimatedScrollView = Animated.ScrollView;

/** Values built from other animated values: a sum, a difference, a product. */
export const animatedAdd = Animated.add;
export const animatedSubtract = Animated.subtract;
export const animatedMultiply = Animated.multiply;
/** A scroll or gesture event mapped straight onto animated values, on the native driver where asked. */
export const animatedEvent = Animated.event;
