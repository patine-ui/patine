import type React from 'react';
import type { HostInstance, KeyDownEvent, PressableProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { DisclosureIconOptions, DisclosureLook, SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { ACCORDION_TYPE } from './accordion.constants';

export type AccordionType = ValueOf<typeof ACCORDION_TYPE>;

interface AccordionBaseProps extends ViewProps, ThemableProps {
  /** Disables every item */
  disabled?: boolean;
  /** Shorthand: the sections, so you don't compose AccordionItem, AccordionTrigger and AccordionContent */
  items?: AccordionListItem[];
  /** The parts: AccordionItems. Leave out when you give `items` */
  children?: React.ReactNode;
}

/** One section for the shorthand `items`. */
export interface AccordionListItem {
  /** What `value` and `onValueChange` call it. Default: its index, as a string */
  value?: string;
  /** The heading */
  title: React.ReactNode;
  /** What it shows while open */
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionSingleProps extends AccordionBaseProps {
  /** One item open at a time. Default: 'single' */
  type?: 'single';
  /** The open item's value, controlled. `''` when none is open */
  value?: string;
  /** The value at first, when it keeps its own state */
  defaultValue?: string;
  /** Called with the open item's value when the user opens or closes one; `''` when they close it */
  onValueChange?: (value: string) => void;
  /** Let the open item close, leaving none open. Default: false */
  collapsible?: boolean;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  /** Any number of items open */
  type: 'multiple';
  /** The open items' values, controlled */
  value?: string[];
  /** The value at first, when it keeps its own state */
  defaultValue?: string[];
  /** Called with the open items' values when the user opens or closes one */
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends ViewProps {
  /** Identifies the item: in the Accordion's `value` while it's open */
  value: string;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends Omit<PressableProps, 'children' | 'style' | 'onPress' | 'role'>, DisclosureIconOptions {
  /** The heading. A string is drawn in the theme's text style */
  children: React.ReactNode;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `label` */
  styles?: SlotStyles<'label'>;
}

export interface AccordionContentProps extends ViewProps {
  children: React.ReactNode;
}

export interface AccordionDesign extends DisclosureLook {
  minHeight: number;
}

export interface TriggerEntry {
  value: string;
  disabled: boolean;
  ref: React.RefObject<HostInstance | null>;
}

export interface AccordionContextValue {
  open: readonly string[];
  toggle: (value: string) => void;
  theme: Theme;
  disabled: boolean;
  baseId: string;
  /** Adds a trigger in render order and returns the function that removes it */
  register: (entry: TriggerEntry) => () => void;
  /** Focuses the enabled trigger `step` places from `from`, wrapping around */
  move: (from: string, step: number) => void;
  /** Focuses the first or last enabled trigger */
  moveToEdge: (last: boolean) => void;
}

/** What `useAccordionTrigger` gives a trigger. */
export interface AccordionTriggerState {
  accordion: AccordionContextValue;
  item: AccordionItemContextValue;
  ref: React.RefObject<HostInstance | null>;
  keys: { focusable: boolean; onKeyDown: (e: KeyDownEvent) => void };
}

export interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}
