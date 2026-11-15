import { View } from 'react-native';

import { Button } from '@/actions/button/Button';
import { BUTTON_DESIGN } from '@/actions/button/button.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { ARROW_FOCUS } from '@/core/utils/keyboard.utils';
import { Text } from '@/foundations/text/Text';
import { DEFAULT_PAGINATION_LABELS, ELLIPSIS, NEXT_ARROW, PAGINATION_DESIGN, PREV_ARROW } from './pagination.constants';
import type { PaginationProps } from './pagination.types';
import { clampPage, getPageItems } from './pagination.utils';

/**
 * Page buttons for a long list or table: Previous, the pages around the current one with ellipses, and Next. The
 * `compact` variant shows "Page 3 of 10" between the arrows, for a phone.
 */
export const Pagination = ({
  pageCount,
  page: pageProp,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  variant = 'numbers',
  iconOnly = false,
  disabled = false,
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
  ...rest
}: PaginationProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [rawPage, setPage] = useControllableState(pageProp, defaultPage, onPageChange);
  const page = clampPage(rawPage, pageCount);
  const labels = { ...DEFAULT_PAGINATION_LABELS, ...labelsProp };
  const look = PAGINATION_DESIGN[theme.design];
  const side = BUTTON_DESIGN[theme.design].heights.default;
  const go = (to: number) => {
    const next = clampPage(to, pageCount);
    if (next !== page) setPage(next);
  };
  const arrow = (direction: -1 | 1) => {
    const label = direction === -1 ? labels.previous : labels.next;
    const glyph = direction === -1 ? PREV_ARROW : NEXT_ARROW;
    return (
      <Button
        theme={themeOverride}
        variant={look.other}
        size={iconOnly ? 'icon' : 'default'}
        disabled={disabled || (direction === -1 ? page <= 1 : page >= pageCount)}
        accessibilityLabel={label}
        onPress={() => go(page + direction)}
      >
        {iconOnly ? glyph : direction === -1 ? `${glyph} ${label}` : `${label} ${glyph}`}
      </Button>
    );
  };
  return (
    <View
      role="navigation"
      aria-label={labels.nav}
      style={[{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: theme.spacing.xs }, style]}
      {...ARROW_FOCUS}
      {...rest}
    >
      {arrow(-1)}
      {variant === 'compact' ? (
        <Text theme={themeOverride} color="textSecondary" style={{ paddingHorizontal: theme.spacing.sm }} aria-live="polite">
          {labels.status(page, pageCount)}
        </Text>
      ) : (
        getPageItems(page, pageCount, siblingCount, boundaryCount).map((item) =>
          typeof item === 'number' ? (
            <Button
              key={item}
              theme={themeOverride}
              variant={item === page ? look.current : look.other}
              size="icon"
              disabled={disabled}
              aria-current={item === page ? 'page' : undefined}
              accessibilityLabel={labels.page(item)}
              accessibilityState={{ selected: item === page, disabled }}
              onPress={() => go(item)}
              style={[{ minWidth: side, width: undefined, paddingHorizontal: theme.spacing.xs }, look.round && { borderRadius: side / 2 }]}
            >
              {String(item)}
            </Button>
          ) : (
            <Text key={item} theme={themeOverride} color="textSecondary" aria-hidden style={{ width: side, textAlign: 'center' }}>
              {ELLIPSIS}
            </Text>
          )
        )
      )}
      {arrow(1)}
    </View>
  );
};
