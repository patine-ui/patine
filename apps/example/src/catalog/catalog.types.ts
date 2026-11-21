import type { ElementType, ReactNode } from 'react';

import type { PLAYGROUND } from './catalog.constants';

export type PlaygroundKey = (typeof PLAYGROUND)[keyof typeof PLAYGROUND];

export type PlaygroundOption = string | number | boolean | readonly string[];

export type PlaygroundSelection = Record<string, PlaygroundOption>;

export interface PlaygroundControl {
  prop: string;
  options: readonly PlaygroundOption[];
  /** The component's own default, left out of the code. `null` when it has none of these (always shown). Defaults to the first option. */
  default?: PlaygroundOption | null;
  /** The option selected at first. Defaults to `default`, then the first option. */
  initial?: PlaygroundOption;
  /** An option that leaves the prop out, so the component picks (e.g. 'auto': the design's default). Make it the first option. */
  unset?: string;
  /** Options that stand for something a string can't, like an icon: the live prop and how it reads in the code. */
  values?: Record<string, PlaygroundValue>;
}

export interface PlaygroundValue {
  live: unknown;
  /** The attribute's value in the code, e.g. `<MailIcon />` */
  code: string;
}

export interface PlaygroundConfig {
  /** A desktop-wide preview on the Web tab, for a picker that spreads out there (DateTimePicker's time beside its calendar). */
  wide?: boolean;
  /** `false` hides the docs' iOS / Android / Web switch, which shows by itself for a component that behaves differently by platform (a field's sheet or dropdown). */
  platforms?: boolean;
  /** Component name used in the generated code. */
  name: string;
  component: ElementType;
  controls: readonly PlaygroundControl[];
  /** Props that never change, passed as-is. */
  props?: Record<string, unknown>;
  /** The fixed attributes as they should read in the code, e.g. `items={sizes} value={size} onValueChange={setSize}`. */
  code?: string;
  /** Makes the demo controlled. A function of the selection is re-run when a control changes (e.g. `mode` changes the value's type). */
  value?: unknown;
  /** The callback that receives the new value. */
  changeProp?: string;
  /** Renders a button that opens the component, which gets `open` and `onOpenChange`. */
  opener?: string;
  children?: ReactNode;
}

/** A component page in the docs sidebar and the example app's drawer. `K` widens the keys for playgrounds kept outside this app. */
export interface CatalogPage<K extends string = PlaygroundKey> {
  /** The docs page id, e.g. `components/date-picker` */
  doc: string;
  label: string;
  playgrounds: readonly K[];
  /** Pages nested under this one, like date ranges under DatePicker */
  pages?: readonly CatalogPage<K>[];
}

export interface CatalogGroup<K extends string = PlaygroundKey> {
  label: string;
  /** A Patine Icons name, e.g. `calendar`: the docs sidebar draws it beside the group's label */
  icon: string;
  pages: readonly CatalogPage<K>[];
}

export type CatalogEntry<K extends string = PlaygroundKey> = CatalogGroup<K> | CatalogPage<K>;
