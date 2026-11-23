import type React from 'react';
import type { Animated, ScrollViewProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ValueOf } from '@/core/core.types';
import type { DialogDesign, DialogProps } from '@/overlays/dialog/dialog.types';
import type { DRAWER_SIDE, MODAL_LAYOUT, MODAL_SIZE } from './modal.constants';

type AnimatedNumber = Animated.AnimatedInterpolation<number>;

export type ModalSize = keyof typeof MODAL_SIZE;
export type DrawerSide = ValueOf<typeof DRAWER_SIDE>;

/** Shorthand slots Modal and Drawer add to Dialog's. */
interface ModalShorthandProps {
  /** Shorthand: what the ModalFooter draws before `actions`' buttons, such as an Edit button and a ⋯ menu */
  footer?: React.ReactNode;
}

export interface ModalProps extends DialogProps, ModalShorthandProps {
  /** Shorthand: ModalContent's `size`. Default: 'md' */
  size?: ModalSize;
  /** Shorthand: ModalContent's `fullScreen` */
  fullScreen?: boolean;
}

export interface DrawerProps extends DialogProps, ModalShorthandProps {
  /** Shorthand: DrawerContent's `side`. Default: 'end' */
  side?: DrawerSide;
  /** Shorthand: DrawerContent's `size`. Default: 'sm' */
  size?: ModalSize;
}

/** The shorthand's layout: the trigger, then `content` (a ModalContent or DrawerContent) wrapped around the sections. */
export interface ModalLayoutProps extends DialogProps, ModalShorthandProps {
  /** Wraps the header, body and footer in the panel */
  renderContent: (sections: React.ReactNode) => React.ReactNode;
}
export type ModalLayout = ValueOf<typeof MODAL_LAYOUT>;

interface PanelProps extends ViewProps {
  children?: React.ReactNode;
  /** A close button (✕) in the top corner. Default: true */
  showCloseButton?: boolean;
  /** What a screen reader says for the close button. Default: 'Close' */
  closeLabel?: string;
}

export interface ModalContentProps extends PanelProps {
  /** Its widest: 'sm' 400, 'md' 520, 'lg' 720, 'xl' 960, or 'full' to fill the screen. Default: 'md' */
  size?: ModalSize;
  /** Fill the screen, as phones show rich content. Default: on a screen narrower than 600pt, for every size but 'sm' */
  fullScreen?: boolean;
}

export interface DrawerContentProps extends PanelProps {
  /** The edge it slides in from, in the reading direction: 'start' (left in LTR) or 'end'. Default: 'end' */
  side?: DrawerSide;
  /** Its width: 'sm' 320, 'md' 400, 'lg' 560, at most 85% of the screen, or 'full'. Default: 'sm' */
  size?: ModalSize;
}

export interface ModalBodyProps extends ScrollViewProps {
  children?: React.ReactNode;
}

export interface ModalSectionProps extends ViewProps {
  children?: React.ReactNode;
}

/** How a design draws a modal. It's a dialog's design (Dialog's title, description and header read it) plus a few more. */
export interface ModalDesign extends DialogDesign {
  /** The close button sits on a gray circle, as in iOS sheets */
  closeFill: boolean;
  /** Hairlines under the header and over the footer */
  dividers: boolean;
  /** The drawer's corners on its open edge, as Material's navigation drawer rounds them */
  drawerRadius: number;
}

/** Where and how the panel sits, worked out from the layout and the screen. */
export interface ModalFrame {
  layout: ModalLayout;
  container: StyleProp<ViewStyle>;
  panel: StyleProp<ViewStyle>;
  /** Its entrance: a scale, a rise or a slide from the side */
  transform: ({ scale: Animated.AnimatedInterpolation<number> } | { translateX: AnimatedNumber } | { translateY: AnimatedNumber })[];
}
