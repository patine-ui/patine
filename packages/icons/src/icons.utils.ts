import { ICON_SIZE, ROLE } from './icons.constants';
import type { IconPath } from './icons.types';

export const resolveIconSize = (size: keyof typeof ICON_SIZE | number) => (typeof size === 'number' ? size : ICON_SIZE[size]);

const isCut = (path: IconPath) => ((path[1] ?? 0) & ROLE.cut) !== 0;

/** Splits an icon into what's drawn under the mask (`base`) and what's drawn on top with a gap cut around it (`cut`). */
export const splitCut = (paths: readonly IconPath[]) => ({
  base: paths.filter((p) => !isCut(p)).map(([d]) => d),
  cut: paths.filter(isCut).map(([d]) => d),
});

/** An SVG id from React's `useId`, which may hold characters `url(#…)` can't. */
export const toSvgId = (reactId: string) => `pi${reactId.replace(/[^\w-]/g, '')}`;

/** A theme color by name, any other color as is, and the fallback when none is given. */
export const resolveColor = (colors: Record<string, string>, color: string | undefined, fallback: string) =>
  color === undefined ? fallback : (colors[color] ?? color);
