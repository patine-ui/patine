import type { Design } from '@/core/theme/theme.types';
import type { BreadcrumbsDesign } from './breadcrumbs.types';

/** shadcn's gray links and slashes on the web and brand; iOS and Material tint the links and use a chevron. */
export const BREADCRUMBS_DESIGN: Record<Design, BreadcrumbsDesign> = {
  brand: { separator: '/', currentWeight: 'medium', primaryLinks: false },
  ios: { separator: '›', currentWeight: 'semibold', primaryLinks: true },
  material: { separator: '›', currentWeight: 'medium', primaryLinks: true },
  web: { separator: '/', currentWeight: 'regular', primaryLinks: false },
};

export const BREADCRUMB_ELLIPSIS = '…';
