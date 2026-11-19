import { Fragment, useState } from 'react';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { BREADCRUMB_ELLIPSIS, BREADCRUMBS_DESIGN } from './breadcrumbs.constants';
import { styles, themed } from './breadcrumbs.styles';
import type { BreadcrumbsProps } from './breadcrumbs.types';
import { getBreadcrumbEntries } from './breadcrumbs.utils';
import { Crumb } from './components/Crumb';

/**
 * Where the page sits in a hierarchy, each level a link back up: Home / Docs / Components. The last item is the current
 * page. Past `maxItems`, the middle folds into '…', which unfolds when pressed.
 */
export const Breadcrumbs = ({
  items,
  separator,
  maxItems,
  accessibilityLabel: accessibilityLabelProp,
  expandLabel: expandLabelProp,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: BreadcrumbsProps) => {
  const words = useLabels();
  const expandLabel = expandLabelProp ?? words.breadcrumbs.expand;
  const accessibilityLabel = accessibilityLabelProp ?? words.breadcrumbs.nav;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [expanded, setExpanded] = useState(false);
  const look = BREADCRUMBS_DESIGN[theme.design];
  const last = items.length - 1;
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View role="navigation" aria-label={accessibilityLabel} style={[styles.trail, sheet.trail, style]} {...rest}>
        {getBreadcrumbEntries(items, maxItems, expanded).map((entry, i) => (
          <Fragment key={entry.kind === 'item' ? entry.index : 'ellipsis'}>
            {i > 0 ? (
              <View aria-hidden>
                {typeof (separator ?? look.separator) === 'string' ? (
                  <Text size="sm" color="textSecondary" style={slots?.separator}>
                    {separator ?? look.separator}
                  </Text>
                ) : (
                  separator
                )}
              </View>
            ) : null}
            {entry.kind === 'ellipsis' ? (
              <Crumb
                label={BREADCRUMB_ELLIPSIS}
                onPress={() => setExpanded(true)}
                accessibilityName={expandLabel}
                labelStyle={slots?.item}
              />
            ) : entry.index === last ? (
              <View style={[styles.crumb, sheet.crumb]}>
                {entry.item.icon}
                <Text size="sm" weight={look.currentWeight} aria-current="page" style={slots?.current}>
                  {entry.item.label}
                </Text>
              </View>
            ) : (
              <Crumb
                label={entry.item.label}
                onPress={entry.item.onPress}
                href={entry.item.href}
                external={entry.item.external}
                icon={entry.item.icon}
                labelStyle={slots?.item}
              />
            )}
          </Fragment>
        ))}
      </View>
    </ThemeScope>
  );
};
