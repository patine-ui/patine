import { View } from 'react-native';

import Svg, { Defs, G, Mask, Rect } from 'react-native-svg';

import { Stroke } from './components/Stroke';
import { useGlyph } from './hooks/useGlyph';
import { CUT_GAP } from './icons.constants';
import type { GlyphProps } from './icons.types';

/**
 * Draws one icon from its data: `<Glyph icon={iconBell} />`. Tree-shakeable: only the icons you import ship. For icons by
 * name, use `Icon`. A stroke marked `cut` (the slash in eye-off) is drawn on top with a gap masked out around it.
 */
export const Glyph = (props: GlyphProps) => {
  const g = useGlyph(props);
  return (
    <View pointerEvents="none" style={[g.box, props.style]} {...g.a11y}>
      <Svg width={g.px} height={g.px} viewBox="0 0 24 24" fill="none">
        {g.cut.length ? (
          <Defs>
            <Mask id={g.id} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <Rect x="0" y="0" width="24" height="24" fill="#fff" />
              {g.cut.map((d) => (
                <Stroke key={d} d={d} color="#000" width={g.strokeWidth * CUT_GAP} fill="#000" />
              ))}
            </Mask>
          </Defs>
        ) : null}
        <G mask={g.cut.length ? `url(#${g.id})` : undefined}>
          {g.base.map((d) => (
            <Stroke key={d} d={d} color={g.stroke} width={g.strokeWidth} />
          ))}
        </G>
        {g.cut.map((d) => (
          <Stroke key={d} d={d} color={g.stroke} width={g.strokeWidth} />
        ))}
      </Svg>
    </View>
  );
};
