import { Children, createContext, isValidElement, useContext, useMemo } from 'react';

import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { useControllableState } from '@/core/hooks/useControllableState';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { groupStyles, styles } from './button.styles';
import { ToggleButton } from './ToggleButton';
import { BUTTON_GROUP_DESIGN } from './toggle.constants';
import type { ToggleGroupContextValue, ToggleGroupItemProps, ToggleGroupProps } from './toggle.types';
import { getJoinedStyle, toggleValue } from './toggle.utils';

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

const toArray = (value: string | null | readonly string[] | undefined): string[] =>
  value == null ? [] : typeof value === 'string' ? [value] : [...value];

/** One button of a ToggleGroup, for when the items need more than `items` gives. */
export const ToggleGroupItem = ({ value, disabled, style, ...rest }: ToggleGroupItemProps) => {
  const group = useContext(ToggleGroupContext);
  if (!group) throw new Error('ToggleGroupItem must be inside a ToggleGroup');
  const pressed = group.isPressed(value);
  const single = group.type === 'single';
  return (
    <ToggleButton
      variant={group.variant}
      size={group.size}
      theme={group.themeOverride}
      disabled={group.disabled || disabled}
      pressed={pressed}
      onPressedChange={() => group.toggle(value)}
      role={single ? 'radio' : 'button'}
      aria-checked={single ? pressed : undefined}
      aria-pressed={single ? undefined : pressed}
      style={[group.itemStyle(value), style]}
      {...rest}
    />
  );
};

/**
 * A row of toggle buttons, one pressed (`type="single"`) or any number (`type="multiple"`), as Radix's ToggleGroup: text
 * alignment, bold / italic / underline, view switchers. `attached` joins them into one bar.
 */
export const ToggleGroup = (props: ToggleGroupProps) => {
  const {
    type,
    items,
    children,
    variant,
    size,
    attached = false,
    orientation = 'horizontal',
    disabled,
    theme: themeProp,
    design,
    style,
    value: _value,
    defaultValue,
    onValueChange: _onValueChange,
    ...rest
  } = props;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [value, setValue] = useControllableState<string[]>(
    props.value === undefined ? undefined : toArray(props.value),
    () => toArray(defaultValue),
    (next) => (props.type === 'single' ? props.onValueChange?.(next[0] ?? null) : props.onValueChange?.(next))
  );
  const vertical = orientation === 'vertical';
  const look = BUTTON_GROUP_DESIGN[theme.design];
  const values = items
    ? items.map((item) => item.value)
    : Children.toArray(children).flatMap((child) =>
        isValidElement<{ value?: string }>(child) && child.props.value ? [child.props.value] : []
      );
  const context = useMemo<ToggleGroupContextValue>(
    () => ({
      type,
      isPressed: (v) => value.includes(v),
      toggle: (v) => setValue(toggleValue(type, value, v)),
      variant,
      size,
      disabled,
      themeOverride,
      itemStyle: (v) => (attached ? getJoinedStyle(values.indexOf(v), values.length, vertical, look) : undefined),
    }),
    [type, value, setValue, variant, size, disabled, themeOverride, attached, values, vertical, look]
  );
  return (
    <ThemeScope theme={themeOverride}>
      <ToggleGroupContext.Provider value={context}>
        <View
          role={type === 'single' ? 'radiogroup' : 'group'}
          aria-orientation={orientation}
          style={[vertical ? styles.groupColumn : styles.groupRow, attached ? groupStyles(theme).joined : groupStyles(theme).apart, style]}
          {...ARROW_FOCUS}
          {...rest}
        >
          {items
            ? items.map(({ value: v, label, icon, accessibilityLabel, disabled: itemDisabled }) => (
                <ToggleGroupItem key={v} value={v} startIcon={icon} aria-label={accessibilityLabel} disabled={itemDisabled}>
                  {label}
                </ToggleGroupItem>
              ))
            : children}
        </View>
      </ToggleGroupContext.Provider>
    </ThemeScope>
  );
};
