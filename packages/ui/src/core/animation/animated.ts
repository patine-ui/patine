import { Animated } from 'react-native';

/** The views animated values drive. Components render these and never import `Animated` themselves. */
export const AnimatedView: typeof Animated.View = Animated.View;
export const AnimatedText: typeof Animated.Text = Animated.Text;
export const AnimatedImage: typeof Animated.Image = Animated.Image;
export const AnimatedScrollView = Animated.ScrollView;

/** A value to animate, made outside a component (a store or a per-item factory); in a component use `useAnimatedValue`. */
export const createAnimatedValue = (value: number) => new Animated.Value(value);

/** Makes any other view animatable, such as an SVG shape: `const AnimatedCircle = createAnimatedComponent(Circle)`. */
export const createAnimatedComponent: typeof Animated.createAnimatedComponent = Animated.createAnimatedComponent;

/** Values built from other animated values: a sum, a difference, a product. */
export const animatedAdd = Animated.add;
export const animatedSubtract = Animated.subtract;
export const animatedMultiply = Animated.multiply;
/** A scroll or gesture event mapped straight onto animated values, on the native driver where asked. */
export const animatedEvent: typeof Animated.event = Animated.event;
