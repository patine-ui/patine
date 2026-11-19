import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { DESCRIPTION_LIST_DESIGN } from './descriptions.constants';
import { styles, themed } from './descriptions.styles';
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
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = DESCRIPTION_LIST_DESIGN[theme.design];
  const horizontal = (orientation ?? look.orientation) === 'horizontal';
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View role="list" style={style} {...rest}>
        {items.map(({ term, details }, i) => (
          <View
            key={term}
            role="listitem"
            accessible
            aria-label={typeof details === 'string' || typeof details === 'number' ? `${term}, ${details}` : undefined}
            style={[
              styles.row,
              sheet.row,
              horizontal ? [styles.side, sheet.side] : styles.stacked,
              dividers && i > 0 && sheet.divider,
              slots?.row,
            ]}
          >
            <Text
              role="term"
              size={look.mutedTerm ? 'sm' : 'md'}
              weight={look.mutedTerm ? 'medium' : 'regular'}
              color={look.mutedTerm ? 'textSecondary' : 'text'}
              style={[horizontal && sheet.term, slots?.term]}
            >
              {term}
            </Text>
            <View role="definition" style={horizontal && [styles.details, look.detailsAtEnd ? styles.end : styles.start]}>
              {typeof details === 'string' || typeof details === 'number' ? (
                <Text
                  color={look.mutedTerm ? 'text' : 'textSecondary'}
                  style={[look.detailsAtEnd && horizontal && styles.endText, slots?.details]}
                >
                  {details}
                </Text>
              ) : (
                details
              )}
            </View>
          </View>
        ))}
      </View>
    </ThemeScope>
  );
};
