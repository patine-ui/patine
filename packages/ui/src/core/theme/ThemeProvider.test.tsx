import type { ReactNode } from 'react';
import { Platform } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { DEFAULT_LABELS } from './labels.constants';
import {
  PatineProvider,
  ThemeScope,
  useComponentTheme,
  useDesignOverride,
  useDirection,
  useLabels,
  usePlatform,
  useTheme,
} from './ThemeProvider';
import { DESIGN_SHADOWS, darkTheme, lightTheme } from './theme.constants';
import type { PatineProviderProps } from './theme.types';

const inProvider = (props: Omit<PatineProviderProps, 'children'>) => ({
  wrapper: ({ children }: { children: ReactNode }) => <PatineProvider {...props}>{children}</PatineProvider>,
});

describe('usePlatform', () => {
  it("returns the provider's platform, or the one it runs on", async () => {
    expect((await renderHook(() => usePlatform())).result.current).toBe(Platform.OS);
    expect((await renderHook(() => usePlatform(), inProvider({ platform: 'android' }))).result.current).toBe('android');
  });
});

describe('useTheme', () => {
  it("fills each design's shadows and lets the provider override one level for all of them", async () => {
    const material = await renderHook(() => useTheme(), inProvider({ design: 'material' }));
    expect(material.result.current.shadows).toEqual(DESIGN_SHADOWS.material);
    const flat = await renderHook(() => useTheme(), inProvider({ design: 'ios', theme: { shadows: { md: 'none' } } }));
    expect(flat.result.current.shadows.md).toBe('none');
    expect(flat.result.current.shadows.lg).toBe(DESIGN_SHADOWS.ios.lg);
  });

  it('defaults to the brand look on every platform, with or without a provider', async () => {
    const bare = await renderHook(() => useTheme());
    expect(bare.result.current.design).toBe('brand');
    expect(bare.result.current.radius.sheet).toBe(20);
    const android = await renderHook(() => useTheme(), inProvider({ platform: 'android' }));
    expect(android.result.current.design).toBe('brand');
  });

  it.each([
    ['ios', 'ios', 24],
    ['android', 'material', 28],
    ['web', 'web', 12],
  ] as const)("draws the platform's own design with 'native' on %s, with its tokens", async (platform, design, sheet) => {
    const { result } = await renderHook(() => useTheme(), inProvider({ platform, design: 'native' }));
    expect(result.current.design).toBe(design);
    expect(result.current.radius.sheet).toBe(sheet);
  });

  it('lets the provider choose a design for every platform', async () => {
    const { result } = await renderHook(() => useTheme(), inProvider({ platform: 'android', design: 'ios' }));
    expect(result.current.design).toBe('ios');
  });

  it('lets a component override the provider, and keeps theme overrides over the design tokens', async () => {
    const theme = { radius: { sheet: 4 } };
    const { result } = await renderHook(() => useTheme({ design: 'web' }), inProvider({ design: 'material', theme }));
    expect(result.current.design).toBe('web');
    expect(result.current.radius).toMatchObject({ sheet: 4, md: 8 });
  });
});

describe('useDesignOverride', () => {
  it('adds the design to the theme override, and leaves the override alone without one', async () => {
    const theme = { radius: { sm: 2 } };
    const withDesign = await renderHook(() => useDesignOverride(theme, 'material'));
    expect(withDesign.result.current).toEqual({ radius: { sm: 2 }, design: 'material' });
    const without = await renderHook(() => useDesignOverride(theme, undefined));
    expect(without.result.current).toBe(theme);
  });
});

describe('useComponentTheme', () => {
  it("resolves a component's 'native' design to the platform's", async () => {
    const { result } = await renderHook(() => useComponentTheme(undefined, 'native'), inProvider({ platform: 'ios' }));
    expect(result.current.theme.design).toBe('ios');
    expect(result.current.themeOverride).toEqual({ design: 'ios' });
  });

  it("draws with the component's design and gives its parts the override with that design", async () => {
    const theme = { radius: { sm: 2 } };
    const { result } = await renderHook(() => useComponentTheme(theme, 'web'), inProvider({ design: 'material' }));
    expect(result.current.theme).toMatchObject({ design: 'web', radius: { sm: 2 } });
    expect(result.current.themeOverride).toEqual({ radius: { sm: 2 }, design: 'web' });
  });
});

describe('resolving the theme once', () => {
  it('gives every instance the same theme object, with or without a provider', async () => {
    const bare = await renderHook(() => [useTheme(), useTheme()]);
    expect(bare.result.current[0]).toBe(bare.result.current[1]);
    const provided = await renderHook(
      () => [useTheme(), useTheme({ design: 'ios' }), useTheme({ design: 'ios' })],
      inProvider({ design: 'material' })
    );
    const [plain, ios, ios2] = provided.result.current;
    expect(plain?.design).toBe('material');
    expect(ios).toBe(ios2);
    expect(ios?.design).toBe('ios');
  });

  it("hands a part its parent's resolved theme back unchanged", async () => {
    const { result } = await renderHook(() => {
      const parent = useTheme({ design: 'ios' });
      return [parent, useTheme(parent)];
    });
    expect(result.current[1]).toBe(result.current[0]);
  });

  it('still merges an override per instance', async () => {
    const theme = { colors: { primary: '#f00' } };
    const { result } = await renderHook(() => [useTheme(), useTheme(theme)]);
    expect(result.current[1]?.colors.primary).toBe('#f00');
    expect(result.current[0]?.colors.primary).not.toBe('#f00');
  });
});

describe('ThemeScope', () => {
  const scoped = (override: Parameters<typeof ThemeScope>[0]['theme']) => ({
    wrapper: ({ children }: { children: ReactNode }) => (
      <PatineProvider design="material">
        <ThemeScope theme={override}>{children}</ThemeScope>
      </PatineProvider>
    ),
  });

  it("hands a component's design and tokens down to everything inside it", async () => {
    const { result } = await renderHook(() => useTheme(), scoped({ design: 'ios', colors: { primary: '#f00' } }));
    expect(result.current.design).toBe('ios');
    expect(result.current.colors.primary).toBe('#f00');
  });

  it("keeps the scope's tokens when a child picks another design", async () => {
    const { result } = await renderHook(() => useTheme({ design: 'web' }), scoped({ design: 'ios', colors: { primary: '#f00' } }));
    expect(result.current.design).toBe('web');
    expect(result.current.colors.primary).toBe('#f00');
  });

  it('changes nothing without an override', async () => {
    const outside = await renderHook(() => useTheme(), inProvider({ design: 'material' }));
    const inside = await renderHook(() => useTheme(), scoped(undefined));
    expect(inside.result.current).toEqual(outside.result.current);
    expect(inside.result.current.design).toBe('material');
  });
});

describe('useLabels', () => {
  it('gives the English defaults without a provider', async () => {
    const { result } = await renderHook(() => useLabels());
    expect(result.current).toBe(DEFAULT_LABELS);
  });

  it("lays the provider's translations over the defaults, nested groups included", async () => {
    const { result } = await renderHook(() => useLabels(), inProvider({ labels: { close: 'Fermer', pagination: { next: 'Suivant' } } }));
    expect(result.current.close).toBe('Fermer');
    expect(result.current.pagination.next).toBe('Suivant');
    expect(result.current.pagination.previous).toBe(DEFAULT_LABELS.pagination.previous);
    expect(result.current.pagination.page(2)).toBe('Page 2');
  });
});

describe('useDirection', () => {
  it("follows the app's own direction, and the provider's `dir` over it", async () => {
    expect((await renderHook(() => useDirection())).result.current).toBe('ltr');
    expect((await renderHook(() => useDirection(), inProvider({ dir: 'rtl' }))).result.current).toBe('rtl');
  });
});

describe('palette tokens', () => {
  it.each(['brand', 'ios', 'material', 'web'] as const)(
    'gives %s the media, scrim, knob, rating and divider colours in light and dark',
    async (design) => {
      for (const colorScheme of ['light', 'dark'] as const) {
        const { result } = await renderHook(() => useTheme(), inProvider({ design, colorScheme }));
        const { media, onMedia, scrim, knob, rating, fillDivider } = result.current.colors;
        expect([media, onMedia, scrim, knob, rating, fillDivider].every(Boolean)).toBe(true);
      }
    }
  );
});

describe('chart palette', () => {
  it('has eight distinct colours per scheme, tuned differently for light and dark', () => {
    expect(new Set(lightTheme.chart).size).toBe(8);
    expect(new Set(darkTheme.chart).size).toBe(8);
    expect(lightTheme.chart.some((color, i) => color !== darkTheme.chart[i])).toBe(true);
  });
});
