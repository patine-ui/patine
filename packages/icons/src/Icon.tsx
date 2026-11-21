import { Glyph } from './Glyph';
import { ICONS } from './icons.registry';
import type { IconProps } from './icons.types';

/**
 * A Patine icon by name: `<Icon name="bell" />`. Decorative unless it has an `aria-label`. Uses the whole free set;
 * `Glyph` with single imports stays lighter. Patine Pro's `Icon` takes the same names and props, plus 440 more icons and
 * solid, duotone and color variants.
 */
export const Icon = ({ name, ...rest }: IconProps) => <Glyph icon={ICONS[name]} {...rest} />;
