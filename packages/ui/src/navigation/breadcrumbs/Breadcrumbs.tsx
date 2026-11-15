import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { BREADCRUMB_ELLIPSIS, BREADCRUMBS_DESIGN, DEFAULT_BREADCRUMBS_LABEL, DEFAULT_EXPAND_LABEL } from './breadcrumbs.constants';
import type { BreadcrumbsProps } from './breadcrumbs.types';
import { getBreadcrumbEntries } from './breadcrumbs.utils';

/**
 * Where the page sits in a hierarchy, each level a link back up: Home / Docs / Components. The last item is the current
 * page. Past `maxItems`, the middle folds into '…', which unfolds when pressed.
 */
export const Breadcrumbs = ({
  items,
  separator,
  maxItems,
  accessibilityLabel = DEFAULT_BREADCRUMBS_LABEL,
  expandLabel = DEFAULT_EXPAND_LABEL,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: BreadcrumbsProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [expanded, setExpanded] = useState(false);
  const look = BREADCRUMBS_DESIGN[theme.design];
  const linkColor = look.primaryLinks ? 'primary' : 'textSecondary';
  const last = items.length - 1;
  const crumb = (label: string, onPress?: () => void, accessibilityName?: string, icon?: ReactNode) => (
    <Touchable
      theme={theme}
      role="link"
      aria-label={accessibilityName}
      onPress={onPress}
      disabled={!onPress}
      hitSlop={{ top: 12, bottom: 12 }}
      style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs, borderRadius: theme.radius.sm, paddingHorizontal: 2 }}
    >
      {icon}
      <PickerText theme={theme} size="sm" color={linkColor} style={slots?.item}>
        {label}
      </PickerText>
    </Touchable>
  );
  return (
    <View
      role="navigation"
      aria-label={accessibilityLabel}
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: theme.spacing.sm, rowGap: theme.spacing.xs },
        style,
      ]}
      {...rest}
    >
      {getBreadcrumbEntries(items, maxItems, expanded).map((entry, i) => (
        <Fragment key={entry.kind === 'item' ? entry.index : 'ellipsis'}>
          {i > 0 ? (
            <View aria-hidden>
              {typeof (separator ?? look.separator) === 'string' ? (
                <PickerText theme={theme} size="sm" color="textSecondary" style={slots?.separator}>
                  {separator ?? look.separator}
                </PickerText>
              ) : (
                separator
              )}
            </View>
          ) : null}
          {entry.kind === 'ellipsis' ? (
            crumb(BREADCRUMB_ELLIPSIS, () => setExpanded(true), expandLabel)
          ) : entry.index === last ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
              {entry.item.icon}
              <PickerText theme={theme} size="sm" weight={look.currentWeight} aria-current="page" style={slots?.current}>
                {entry.item.label}
              </PickerText>
            </View>
          ) : (
            crumb(entry.item.label, entry.item.onPress, undefined, entry.item.icon)
          )}
        </Fragment>
      ))}
    </View>
  );
};
