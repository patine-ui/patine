import type { CatalogPage } from './catalog/catalog.types';

/** What the page shows: the basics, or a component page with its playgrounds. */
export type Route = { basics: true; page?: never } | { page: CatalogPage; basics?: never };

export interface Insets {
  top: number;
  bottom: number;
}

/** A catalog page as the drawer lists it: its group, how deep it sits, and whether it opens its group. */
export interface CatalogEntryInfo {
  page: CatalogPage;
  group?: string;
  depth: number;
  startsGroup: boolean;
}
