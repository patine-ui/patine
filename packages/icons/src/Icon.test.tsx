import { I18nManager, StyleSheet } from 'react-native';

import { render, renderHook, screen } from '@testing-library/react-native';
import { useTheme } from 'patine-ui';

import { Glyph } from './Glyph';
import { iconArrowRight, iconBell } from './glyphs';
import { Icon } from './Icon';

interface Node {
  type: string;
  props: Record<string, unknown>;
  children: (Node | string)[] | null;
}

/** Native SVG nodes of a type in a rendered tree. */
const nodesOf = (tree: unknown, type: string): Node[] => {
  const node = tree as Node | null;
  if (!node || typeof node !== 'object') return [];
  const children = (node.children ?? []).flatMap((child) => nodesOf(child, type));
  return node.type === type ? [node, ...children] : children;
};

describe('Icon', () => {
  it('is decorative unless labelled', async () => {
    await render(<Icon name="bell" />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('is an image named by its label, in named and point sizes', async () => {
    await render(<Icon name="bell" size="lg" accessibilityLabel="Notifications" />);
    expect(StyleSheet.flatten(screen.getByRole('img', { name: 'Notifications' }).props.style)).toMatchObject({ width: 24, height: 24 });
    await render(<Icon name="bell" size={48} accessibilityLabel="Big" />);
    expect(StyleSheet.flatten(screen.getByRole('img', { name: 'Big' }).props.style)).toMatchObject({ width: 48 });
  });

  it('strokes in a theme color, never fills', async () => {
    const paths = nodesOf((await render(<Icon name="heart" color="primary" />)).toJSON(), 'RNSVGPath');
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) expect(path.props.fill).toBeNull();
    const { result } = await renderHook(() => useTheme());
    const hex = nodesOf((await render(<Icon name="heart" color={result.current.colors.primary} />)).toJSON(), 'RNSVGPath');
    expect(paths[0]?.props.stroke).toEqual(hex[0]?.props.stroke);
  });

  it('masks a gap around a cut stroke', async () => {
    expect(nodesOf((await render(<Icon name="eyeOff" />)).toJSON(), 'RNSVGMask')).toHaveLength(1);
    expect(nodesOf((await render(<Icon name="eye" />)).toJSON(), 'RNSVGMask')).toHaveLength(0);
  });

  it('flips directional icons in right-to-left layouts, and only those', async () => {
    const rtl = I18nManager.isRTL;
    Object.defineProperty(I18nManager, 'isRTL', { value: true, configurable: true });
    await render(<Glyph icon={iconArrowRight} accessibilityLabel="next" />);
    expect(StyleSheet.flatten(screen.getByRole('img').props.style).transform).toEqual([{ scaleX: -1 }]);
    await render(<Glyph icon={iconBell} accessibilityLabel="bell" />);
    expect(StyleSheet.flatten(screen.getByRole('img').props.style).transform).toBeUndefined();
    Object.defineProperty(I18nManager, 'isRTL', { value: rtl, configurable: true });
  });
});
