import { BASICS_LABEL, COMPONENTS_LABEL } from './example.constants';
import type { CatalogEntryInfo, Route } from './example.types';

/** The components section open, and only the group of the page shown, as the docs sidebar opens the one you're in. */
export const initialOpenSections = (route: Route, pages: readonly CatalogEntryInfo[]) => {
  const group = route.page && pages.find(({ page }) => page.doc === route.page.doc)?.group;
  return group ? [COMPONENTS_LABEL, group] : [COMPONENTS_LABEL];
};

/** The page title for a route. */
export const routeTitle = (route: Route) => (route.page ? route.page.label : BASICS_LABEL);
