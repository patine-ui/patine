# @patine-ui/icons

Free outline icons for React Native, Expo and React Native Web, drawn for [Patine UI](https://github.com/patine-ui/patine):
227 icons on a 24pt grid that take your `patine-ui` theme colors, flip in right-to-left layouts, and import one by one.
MIT.

```sh
npx expo install @patine-ui/icons react-native-svg
```

`patine-ui` and `react-native-svg` are peers. `react-native-svg` runs in Expo Go and on the web; `patine-ui` itself stays
at zero dependencies.

## Use

```tsx
import { Icon } from '@patine-ui/icons';

<Icon name="bell" />                                   // decorative, 20pt, the theme's textSecondary
<Icon name="trash" size="lg" color="danger" accessibilityLabel="Delete" />
```

`Icon` pulls in the whole set. To ship only what you use, import the glyph:

```tsx
import { Glyph, iconBell } from '@patine-ui/icons';

<Glyph icon={iconBell} size={24} color="primary" />
```

| Prop | Default | |
|---|---|---|
| `name` / `icon` | — | An icon name (`Icon`) or its data (`Glyph`) |
| `size` | `'md'` | `'sm'` (16), `'md'` (20), `'lg'` (24) or points |
| `color` | `'textSecondary'` | A theme color name or any color |
| `strokeWidth` | `1.5` | On the 24pt grid |
| `accessibilityLabel` | — | Names it for screen readers; without it the icon is hidden from them |
| `mirror` | arrows and other directional icons in RTL | Flips it |

`ICON_META` has a category and search words per icon, for pickers and galleries. Coding agents can search the set with the
`search_icons` tool of [`@patine-ui/mcp`](../mcp).

## Patine Pro

Patine Pro's `Icon` takes the same names and props, so moving up is an import change. Pro adds 440 more icons, solid,
duotone and color variants, and 147 brand logos.

## Maintainers

The glyphs are copied from Pro's icon sources by `pnpm --filter @patine-ui/icons icons` (needs the private repo); the
list is `scripts/free-icons.json`. Don't edit `src/glyphs`, `icons.registry.ts` or `icons.meta.ts` by hand.
