import { Heading } from '@/foundations/text/Heading';
import { useTabs } from './TabsContext';
import { TABS_VARIANT } from './tabs.constants';
import { themed } from './tabs.styles';
import type { TabsGroupLabelProps } from './tabs.types';

/** A small heading over a group of vertical tabs, such as a settings sidebar's "Advanced". Arrow keys pass over it. */
export const TabsGroupLabel = ({ style, ...rest }: TabsGroupLabelProps) => {
  const { theme, variant } = useTabs();
  const sheet = themed(theme);
  return (
    <Heading
      level={3}
      size="xs"
      weight="semibold"
      color="textSecondary"
      font="body"
      numberOfLines={1}
      style={[sheet.groupLabel, variant === TABS_VARIANT.pills ? sheet.pillsInset : sheet.underlineInset, style]}
      {...rest}
    />
  );
};
