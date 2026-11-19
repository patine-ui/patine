import { Text } from '@/core/primitives/Text';
import { STAR_GLYPH } from '@/inputs/rating/rating.constants';
import { styles } from '@/inputs/rating/rating.styles';
import type { RatingIconProps } from '@/inputs/rating/rating.types';
import { getGlyphStyle } from '@/inputs/rating/rating.utils';

/** The custom icon, or a ★ in the star's colour. */
export const RatingIcon = ({ info, renderIcon, slots }: RatingIconProps) =>
  renderIcon ? renderIcon(info) : <Text style={[styles.glyph, getGlyphStyle(info.size, info.color), slots?.icon]}>{STAR_GLYPH}</Text>;
