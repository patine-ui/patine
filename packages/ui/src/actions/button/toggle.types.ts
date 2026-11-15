import type React from 'react';
import type { ViewProps } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { ButtonProps, ButtonSize, ButtonVariant } from './button.types';
import type { TOGGLE_VARIANT } from './toggle.constants';

export type ToggleVariant = ValueOf<typeof TOGGLE_VARIANT>;

type ColorKey = keyof Theme['colors'];

export interface ToggleButtonProps extends Omit<ButtonProps, 'variant' | 'loading' | 'onPress'> {
  /** Controlled state */
  pressed?: boolean;
  /** Initial state when uncontrolled. Default: false */
  defaultPressed?: boolean;
  /** Called with the new state when the user presses it */
  onPressedChange?: (pressed: boolean) => void;
  /** 'default': no edge until pressed. 'outline': a border either way. Default: 'default' */
  variant?: ToggleVariant;
  onPress?: ButtonProps['onPress'];
}

/** How a design colors a toggle, as theme color names. */
export interface ToggleDesign {
  /** The fill while off; null leaves it clear */
  offFill: ColorKey | null;
  onFill: ColorKey;
  onText: ColorKey;
}

export interface ToggleGroupItemData<T extends string = string> {
  value: T;
  /** Text, or any node such as an icon */
  label?: React.ReactNode;
  /** Before the label */
  icon?: React.ReactNode;
  /** Names an icon-only item for screen readers */
  accessibilityLabel?: string;
  disabled?: boolean;
}

interface ToggleGroupBase extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The buttons, as data. Or pass ToggleGroupItem children */
  items?: ReadonlyArray<ToggleGroupItemData>;
  children?: React.ReactNode;
  variant?: ToggleVariant;
  /** Default: 'default' */
  size?: Exclude<ButtonSize, 'icon'> | 'icon';
  /** Joins the buttons into one bar, as a toolbar does. Default: false */
  attached?: boolean;
  /** Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export interface ToggleGroupSingleProps extends ToggleGroupBase {
  /** 'single': at most one pressed, like a radio group that can be cleared. 'multiple': any number */
  type: 'single';
  value?: string | null;
  defaultValue?: string | null;
  /** The pressed value, or null when the user un-presses it */
  onValueChange?: (value: string | null) => void;
}

export interface ToggleGroupMultipleProps extends ToggleGroupBase {
  type: 'multiple';
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export interface ToggleGroupItemProps extends Omit<ToggleButtonProps, 'pressed' | 'defaultPressed' | 'onPressedChange'> {
  value: string;
}

export interface ToggleGroupContextValue {
  type: 'single' | 'multiple';
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
  variant?: ToggleVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** The item's corners and edges when the group is attached */
  itemStyle: (value: string) => ButtonProps['style'];
  themeOverride?: ThemableProps['theme'];
}

export interface ButtonGroupProps extends ViewProps, ThemableProps {
  /** Buttons, joined into one bar */
  children?: React.ReactNode;
  /** Passed to each Button that doesn't set its own */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
}

/** How a design joins a button group: Material 3 leaves a gap and softens inner corners; the others share an edge. */
export interface ButtonGroupDesign {
  gap: number;
  /** The corners where two buttons meet */
  innerRadius: number;
}
