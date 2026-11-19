// One import source for views, so components never reach into react-native for them. Plain re-exports: no wrapper, no cost.
/**
 * For backdrops, drag handles and gesture surfaces that aren't controls (hidden from screen readers, no feedback). Anything
 * a person presses as a control is a Touchable.
 */
export { Pressable, View } from 'react-native';

export { AnimatedImage, AnimatedScrollView, AnimatedText, AnimatedView } from '@/core/animation/animated';
