import { HEADER_SIZE } from './header.constants';
import type { HeaderDesign, HeaderSize } from './header.types';

/** The bar's own title shows unless the large title under it already does, and a centred title sits over the bar. */
export const getTitlePlacement = (look: HeaderDesign, size: HeaderSize) => ({
  inBar: size !== HEADER_SIZE.large,
  centered: look.centerTitle && size !== HEADER_SIZE.large,
});
