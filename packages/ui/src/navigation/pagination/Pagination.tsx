import { Button } from '@/actions/button/Button';
import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { ChevronMark } from '@/core/components/ChevronMark';
import { useControllableState } from '@/core/hooks/useControllableState';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { ELLIPSIS, PAGINATION_DESIGN } from './pagination.constants';
import { styles, themed } from './pagination.styles';
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
  const words = useLabels();
  const labels = { ...words.pagination, ...labelsProp };
  const look = PAGINATION_DESIGN[theme.design];
  const sheet = themed(theme);
  const go = (to: number) => {
    const next = clampPage(to, pageCount);
    if (next !== page) setPage(next);
  };
  const arrow = (direction: -1 | 1) => {
    const label = direction === -1 ? labels.previous : labels.next;
    // Drawn, in the button's label color, and mirrored in right-to-left layouts.
    const chevron = <ChevronMark direction={direction === -1 ? 'back' : 'forward'} />;
    return (
      <Button
        variant={look.other}
        size={iconOnly ? 'icon' : 'default'}
        disabled={disabled || (direction === -1 ? page <= 1 : page >= pageCount)}
        aria-label={label}
        onPress={() => go(page + direction)}
        startIcon={!iconOnly && direction === -1 ? chevron : undefined}
        endIcon={!iconOnly && direction === 1 ? chevron : undefined}
      >
        {iconOnly ? chevron : label}
      </Button>
    );
  };
  return (
    <ThemeScope theme={themeOverride}>
      <View role="navigation" aria-label={labels.nav} style={[styles.root, sheet.root, style]} {...ARROW_FOCUS} {...rest}>
        {arrow(-1)}
        {variant === 'compact' ? (
          <Text color="textSecondary" style={sheet.status} aria-live="polite">
            {labels.status(page, pageCount)}
          </Text>
        ) : (
          getPageItems(page, pageCount, siblingCount, boundaryCount).map((item) =>
            typeof item === 'number' ? (
              <Button
                key={item}
                variant={item === page ? look.current : look.other}
                size="icon"
                disabled={disabled}
                aria-current={item === page ? 'page' : undefined}
                aria-label={labels.page(item)}
                aria-selected={item === page}
                aria-disabled={disabled}
                onPress={() => go(item)}
                style={sheet.page}
              >
                {String(item)}
              </Button>
            ) : (
              <Text key={item} color="textSecondary" aria-hidden style={[styles.ellipsis, sheet.ellipsis]}>
                {ELLIPSIS}
              </Text>
            )
          )
        )}
        {arrow(1)}
      </View>
    </ThemeScope>
  );
};
