import type { ReactNode } from 'react';
import { Platform } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { PatineProvider, useComponentTheme, useDesignOverride, usePlatform, useTheme } from './ThemeProvider';
import { DESIGN_SHADOWS } from './theme.constants';
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

  it("treats 'auto' as 'native'", async () => {
    const { result } = await renderHook(() => useTheme(), inProvider({ platform: 'android', design: 'auto' }));
    expect(result.current.design).toBe('material');
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
