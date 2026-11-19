import { createStyles } from '@/core/theme/theme.utils';
import { SUGGESTIONS_DESIGN } from './suggestions.constants';

export const chipStyles = createStyles((t) => ({
  chip: { borderRadius: t.radius[SUGGESTIONS_DESIGN[t.design].radius] },
}));
