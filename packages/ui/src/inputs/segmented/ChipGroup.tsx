import { ChoiceList } from './ChoiceList';
import { CHOICE_VARIANT } from './segmented.constants';
import type { ChipGroupProps } from './segmented.types';

/** Choice chips: separate pills that scroll sideways, one selected. Pressing a chip at the edge scrolls the next one into view. */
export const ChipGroup = <T,>(props: ChipGroupProps<T>) => <ChoiceList {...props} variant={CHOICE_VARIANT.chips} />;
