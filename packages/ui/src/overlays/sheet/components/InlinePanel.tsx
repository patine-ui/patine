import { OwnScroll } from '@/core/primitives/OwnScroll';
import { AnimatedView, View } from '@/core/primitives/View';
import { useInlineExpand } from '@/overlays/sheet/hooks/useInlineExpand';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { InlinePanelProps } from '@/overlays/sheet/sheet.types';

/** The picker expanded under its field, pushing the content below down. The content lays out at full height and is clipped while the panel grows. */
export const InlinePanel = ({ visible, children, theme }: InlinePanelProps) => {
  const expand = useInlineExpand(visible, theme.animation.duration);
  if (!expand.mounted) return null;

  return (
    <AnimatedView style={[styles.inline, expand.style]} pointerEvents={visible ? 'auto' : 'none'}>
      <View style={[styles.inlineContent, sheetStyles(theme).inline]} onLayout={expand.onLayout}>
        <OwnScroll>{children}</OwnScroll>
      </View>
    </AnimatedView>
  );
};
