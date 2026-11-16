import { DESIGN } from 'patine-ui';

import { CATALOG } from './catalog/catalog.constants';
import { flattenCatalog } from './catalog/catalog.utils';
import type { CatalogEntryInfo } from './example.types';

/** From this width the drawer stays open beside the page, as the docs sidebar does. */
export const WIDE_WIDTH = 900;
export const DRAWER_WIDTH = 280;
/** On wide screens a picker keeps a phone-like width beside its props, as in the docs playgrounds. */
export const PREVIEW_MAX_WIDTH = 440;
export const PROPS_WIDTH = 320;

export const DESIGN_OPTIONS = [
  { label: 'Brand', value: DESIGN.brand },
  { label: 'Native', value: DESIGN.native },
  { label: 'iOS', value: DESIGN.ios },
  { label: 'Material', value: DESIGN.material },
  { label: 'Web', value: DESIGN.web },
];

export const MENU_ICON = '☰';
export const COMPONENTS_LABEL = 'Components';
export const BASICS_LABEL = 'Basics';
/** The drawn chevron turns from pointing right (folded) to down (open). */
export const CARET_ROTATION = { inputRange: [0, 1], outputRange: ['-45deg', '45deg'] };

/** Indent per level in the drawer: a group's pages, then pages nested under one. */
export const DRAWER_INDENT = 14;
export const DRAWER_ITEM_PADDING = 12;

/** The catalog's pages, each marked when it is the first of its group, where the drawer puts the group's name. */
export const CATALOG_PAGES: CatalogEntryInfo[] = flattenCatalog(CATALOG).map((entry, i, all) => ({
  ...entry,
  startsGroup: !!entry.group && entry.group !== all[i - 1]?.group,
}));
