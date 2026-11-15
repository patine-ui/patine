import { StyleSheet, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { DESCRIPTION_LIST_DESIGN } from './descriptions.constants';
import type { DescriptionListProps } from './descriptions.types';

/**
 * Terms and their details, for read-only facts: an order summary, a profile, a device's About page. Each row is the
 * term beside or above its value, and a screen reader reads them together.
 */
export const DescriptionList = ({
  items,
  orientation,
  dividers = true,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: DescriptionListProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = DESCRIPTION_LIST_DESIGN[theme.design];
  const horizontal = (orientation ?? look.orientation) === 'horizontal';
  return (
    <View role="list" style={style} {...rest}>
      {items.map(({ term, details }, i) => (
        <View
          key={term}
          role="listitem"
          accessible
          accessibilityLabel={typeof details === 'string' || typeof details === 'number' ? `${term}, ${details}` : undefined}
          style={[
            {
              flexDirection: horizontal ? 'row' : 'column',
              alignItems: horizontal ? 'center' : 'stretch',
              gap: horizontal ? theme.spacing.md : 2,
              paddingVertical: theme.spacing.md,
              minHeight: 44,
            },
            dividers && i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border },
            slots?.row,
          ]}
        >
          <PickerText
            theme={theme}
            role="term"
            size={look.mutedTerm ? 'sm' : 'md'}
            weight={look.mutedTerm ? 'medium' : 'regular'}
            color={look.mutedTerm ? 'textSecondary' : 'text'}
            style={[horizontal && { width: look.termWidth }, slots?.term]}
          >
            {term}
          </PickerText>
          <View role="definition" style={[horizontal && { flex: 1, alignItems: look.detailsAtEnd ? 'flex-end' : 'flex-start' }]}>
            {typeof details === 'string' || typeof details === 'number' ? (
              <PickerText
                theme={theme}
                color={look.mutedTerm ? 'text' : 'textSecondary'}
                style={[look.detailsAtEnd && horizontal && { textAlign: 'right' }, slots?.details]}
              >
                {details}
              </PickerText>
            ) : (
              details
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
