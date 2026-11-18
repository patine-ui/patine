# AGENTS.md

Guidance for AI coding agents working in this repository. (To *use* the library in an app, read the API docs instead.)

## Project

`patine-ui` (working name): a cross-platform UI component library for React Native, Expo and React Native Web. One codebase for iOS, Android and the web. **No native code and no runtime dependencies**: only React Native core APIs (`Animated` with the native driver, `PanResponder`, `FlatList`, `Modal`), so it installs with one command and runs in Expo Go, Snack and the browser. Don't add a dependency or native module to the free core.

pnpm monorepo:

- `packages/ui/`: the library, published as `patine-ui`
- `packages/icons/`: the free starter icons, published as `@patine-ui/icons`. Its own package because it needs `react-native-svg` (a peer); the glyphs are copied from Pro by `pnpm --filter @patine-ui/icons icons`, never edited by hand
- `packages/mcp/`: the MCP server, published as `@patine-ui/mcp`
- `apps/example/`: Expo app for contributors that renders the library source. `apps/example/src/catalog/` lists every component page and its prop playgrounds.

New packages go in `packages/`, new apps in `apps/`. Tooling (Biome, Jest, TypeScript, lefthook) lives at the root and covers every package.

The docs site (patine.dev) and Patine Pro are a separate private repo. On the maintainer's machine it sits in `private/` (gitignored here) and has its own `private/AGENTS.md`; read it when that folder exists. Nothing in this repo may import from `private/`.

## Concept: Patine's look by default, each platform's on request

Patine is one finished design that runs everywhere. **The look follows `design`; the behaviour always follows the platform.**

- **Look.** Every component has a `design`. The default, `'brand'`, is the Patine design: the same on every platform, and the one the docs, screenshots and Pro screens lead with. `'native'` is the option for apps that want each platform's own look: `'ios'` on iOS, `'material'` on Android, `'web'` in the browser. A component's `design` prop wins over `PatineProvider`'s.
- **Behaviour** (sheet or dropdown, insets, dragging, keyboard and focus on the web) follows the *platform* (`usePlatform`), never the design. That's what lets the Patine design feel native without looking native.

The designs:

- `brand`, the Patine design, is the hero: refined and calm, with the theme's primary, soft radii, hairline borders, low layered shadows, and every touch target at least 44pt. It must read as its own look, not as `web` on a phone. Build and polish it first; it's what people see.
- `ios`, `material`, `web` are the native looks, kept at parity. Before building or restyling, look at how that platform's own apps do it (iOS Calendar and Settings, Material 3 specs and Google apps, the web's native inputs) and give each design that platform's pattern.

Design differences live in `Record<Design, …>` maps in each folder's `*.constants.ts` (`FIELD_DESIGN`, `SELECT_DESIGN`…), never in `if (design === …)` branches in components. TypeScript then lists every map a new design must fill.

## Commands

| Command | Use |
|---|---|
| `pnpm install` | Install everything, including the git hooks |
| `pnpm test` | Jest + React Native Testing Library |
| `pnpm lint` | `exports` check + Biome: lint, format and import order |
| `pnpm format` | Autofix lint and formatting |
| `pnpm typecheck` | TypeScript, including tests |
| `pnpm build` | Compile to `lib/` |
| `pnpm sync:exports` | Regenerate `package.json` `exports` after adding or moving a component folder |
| `pnpm web` | Example app in the browser |

Run `pnpm lint && pnpm typecheck && pnpm test` before you finish.

## Structure

`packages/ui/src/` is grouped by category, then one folder per component family:

```
src/
  core/        theme, animation (every animation and reduce motion), shared hooks, utils and primitives (Touchable, ChoiceRow…)
  foundations/ text (Text, Heading), stack (Stack, HStack, VStack), separator
  display/     card, badge, avatar, accordion
  feedback/    alert, skeleton, toast
  navigation/  tabs
  actions/     button
  overlays/    sheet (bottom sheets, dropdowns, fields), action (action sheet, menu), dialog, popover, tooltip
  inputs/      textfield, checkbox, radio, switch, select, segmented, otp, slider, rating
  pickers/     wheel, time, duration, date, datetime, month, calendar, color, emoji, country, language, timezone
```

New categories as they arrive: `ai`. Imports flow one way: feature → `overlays/sheet` → `core`.

Every component folder is also a public subpath, **flat**: `patine-ui/<folder>` (`patine-ui/date`), whatever category it sits in. `packages/ui/scripts/sync-exports.js` writes the `exports` map; folder names must be unique across categories. Renaming a folder is a breaking change; moving it to another category is not.

Every component folder has the same layout:

- `<Component>.tsx` and `components/`: render only, no inline logic
- `hooks/`: state and event handling
- `<feature>.utils.ts`: pure logic, with `<feature>.utils.test.ts` next to it
- `<feature>.types.ts`, `<feature>.constants.ts` (including the design maps), `<feature>.styles.ts`
- `index.ts`: the folder's public API

## Code style

- **Arrow functions only**: `export const fn = () =>`, never `function`. Biome enforces it (`useArrowFunction` + `lint/arrow-functions-only.grit`). Generic components in `.tsx` need `<T,>`.
- Biome is the only linter and formatter. No ESLint or Prettier.
- A returned object with two or more properties goes one property per line. A Biome plugin enforces this, and `pnpm format` fixes it.
- Three import blocks separated by a blank line: React and React Native, other packages, then our own code.
- **Imports across folders use the `@/` alias** (`@/core/theme/ThemeProvider` is `packages/ui/src/core/theme/ThemeProvider`); same-folder imports stay `./x`. A Biome rule (`lint/alias-imports.grit`) blocks `../`. The build rewrites `@/` to relative paths with `tsc-alias`, and apps resolve the compiled `lib/`, so the published package has no aliases.
- **Animations live in `core/animation` only.** Components ask for one by name: `useAnimatedTo`, `useAnimatedToggle`, `usePresence`, `usePulse`, `useBlink`, or `timing`/`spring` from `@/core/animation`. They never call `Animated.timing`, `loop`, `sequence` or `parallel` themselves (`lint/animations-in-core.grit` blocks it). A new kind of motion is added there as a named hook. Everything there respects the OS reduce-motion setting.
- Tests sit next to the file they test. New utils and hooks come with tests. A test that depends on the current date pins it.
- Dates are local time. Compare and serialize calendar days with `toDateKey`, never `toISOString()`.
- `onValueChange` fires for user changes only. Changing `value` programmatically must not call it.
- API names follow shadcn/ui and Radix where they exist (`variant`, `size`, `checked` + `onCheckedChange`, `value` + `onValueChange`, `RadioGroup` + `RadioGroupItem`), so agents that know shadcn already know Patine.
- Accessibility is part of done: a role, a label, state (`selected`, `checked`, `expanded`, `disabled`), keyboard support on the web, 44pt touch targets, and `reduce motion` respected.

## Docs stay in sync

When a change affects what users see or call (a new component, prop, default, behavior or design), update in the same PR:

- `apps/example/src/catalog/`: a new component page and its prop playground. The docs sidebar, each docs page's playground and the example app's drawer are built from it.
- `README.md`.
- SEO: `description` and `keywords` in `package.json`, and `context7.json`.
- The docs site, in the private repo: its `AGENTS.md` lists the pages to update. Contributors without access: describe the change in the PR and the maintainer updates the docs.

## Commits and releases

- Use Conventional Commits (`feat(select): …`, `fix(time): …`, `docs: …`). PRs are squash-merged, so the PR title becomes the commit on `master`.
- **Commits and PRs carry the maintainer's name only.** No `Co-Authored-By` trailer, no "Generated with" footer, no mention of an AI tool or model in commit messages, PR titles or bodies, branch names or code comments. The `commit-msg` hook rejects them.
- Don't commit, push or open a PR unless the maintainer asks for it in that message.
- Don't bump `version` or edit `CHANGELOG.md`. release-please does both in its release PR.
