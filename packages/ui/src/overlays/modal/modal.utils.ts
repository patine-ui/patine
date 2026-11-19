import { COMPACT_WIDTH, DRAWER_MAX_RATIO, MODAL_LAYOUT, MODAL_SIZE } from './modal.constants';
import type { ModalLayout, ModalSize } from './modal.types';

/** Centered or full screen: 'full' always fills; other sizes but 'sm' fill a compact screen unless `fullScreen` says otherwise. */
export const resolveModalLayout = (size: ModalSize, fullScreen: boolean | undefined, windowWidth: number): ModalLayout => {
  const fills = fullScreen ?? (size === 'full' || (size !== 'sm' && windowWidth < COMPACT_WIDTH));
  return fills ? MODAL_LAYOUT.fullScreen : MODAL_LAYOUT.centered;
};

/** A drawer's width: its size, at most 85% of the screen, or all of it for 'full'. */
export const getDrawerWidth = (size: ModalSize, windowWidth: number) =>
  size === 'full' ? windowWidth : Math.min(MODAL_SIZE[size].drawer, Math.round(windowWidth * DRAWER_MAX_RATIO));

/** The close button's corner: half the padding in, or iOS's circle a little inside the padding; `top` clears the status bar. */
export const getClosePlace = (top: number, padding: number, filled: boolean) => {
  const inset = filled ? padding - 4 : padding / 2;
  return {
    top: top + inset,
    end: inset,
  };
};
