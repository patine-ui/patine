import { ChoiceList } from './ChoiceList';
import { CHOICE_VARIANT } from './segmented.constants';
import type { SegmentedControlProps } from './segmented.types';

/** A segmented control: a few choices on a track, the selected one on a sliding thumb. Scrolls sideways when it doesn't fit. */
export const SegmentedControl = <T,>(props: SegmentedControlProps<T>) => <ChoiceList {...props} variant={CHOICE_VARIANT.segmented} />;
