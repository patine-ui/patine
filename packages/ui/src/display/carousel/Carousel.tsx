import { focusRing } from '@/core/a11y/a11y.utils';
import { useFocusVisible } from '@/core/a11y/hooks/useFocusVisible';
import { useAnimatedTo } from '@/core/animation';
import { IS_WEB } from '@/core/core.constants';
import { AnimatedScrollView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels, usePlatform } from '@/core/theme/ThemeProvider';
import { styles } from './carousel.styles';
import type { CarouselProps } from './carousel.types';
import { formatSlideLabel, getTrackStyle } from './carousel.utils';
import { CarouselArrow } from './components/CarouselArrow';
import { Dots } from './components/Dots';
import { usePager } from './hooks/usePager';

/** Outer loop copies are only there to scroll into: screen readers skip them. */
const HIDDEN = { 'aria-hidden': true };

/**
 * Slides that snap into place, with the next one peeking in when `itemWidth` is under 100%: dots that follow the finger,
 * arrows on the web, loop and autoplay. A paging scroll view, so it swipes natively on iOS and Android and snaps with CSS
 * on the web. Arrow keys, Home and End move it when focused on the web.
 */
export const Carousel = ({
  theme: themeProp,
  design,
  scrollEnabled = true,
  showIndicator = true,
  showArrows,
  gap: gapProp,
  accessibilityLabel,
  labels: labelsProp,
  style,
  styles: slots,
  testID,
  ...rest
}: CarouselProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const platform = usePlatform();
  const words = useLabels();
  const labels = { ...words.carousel, ...labelsProp };
  const pager = usePager({ ...rest, gap: gapProp ?? theme.spacing.md });
  const fallback = useAnimatedTo(pager.index, { duration: theme.animation.duration });
  const focus = useFocusVisible();
  const arrows = (showArrows ?? platform === 'web') && pager.count > 1;
  const sizeKey = pager.horizontal ? 'width' : 'height';
  const snap = rest.align === 'start' ? styles.snapStart : styles.snapCenter;

  return (
    <ThemeScope theme={themeOverride}>
      <View
        role="region"
        aria-label={accessibilityLabel}
        style={[focus.focusVisible && focusRing(theme.colors.primary), slots?.container, style]}
        testID={testID}
        {...pager.keys}
        {...pager.autoplay.handlers}
        onFocus={(e) => {
          pager.autoplay.handlers.onFocus();
          if (e.target === e.currentTarget) focus.onFocus();
        }}
        onBlur={() => {
          pager.autoplay.handlers.onBlur();
          focus.onBlur();
        }}
      >
        <View style={styles.viewport}>
          <AnimatedScrollView
            ref={pager.scrollRef}
            horizontal={pager.horizontal}
            scrollEnabled={scrollEnabled}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // The web snaps with CSS; its pagingEnabled wraps each slide in a view that doesn't stretch.
            pagingEnabled={!IS_WEB && rest.itemWidth === undefined && (gapProp ?? theme.spacing.md) === 0}
            snapToInterval={IS_WEB || pager.step <= 0 ? undefined : pager.step}
            decelerationRate="fast"
            disableIntervalMomentum
            {...pager.scrollProps}
            style={pager.horizontal ? styles.snapX : styles.snapY}
            contentContainerStyle={getTrackStyle(gapProp ?? theme.spacing.md, pager.horizontal, pager.lead, pager.trail)}
            testID={testID ? `${testID}-scroll` : undefined}
          >
            {Array.from({ length: pager.copies }, (_, copy) =>
              pager.slides.map((slide, i) => (
                <View
                  // biome-ignore lint/suspicious/noArrayIndexKey: copies of the same children; copy and position identify each.
                  key={`${copy}-${i}`}
                  style={[{ [sizeKey]: pager.item }, snap, slots?.item]}
                  {...(pager.copies > 1 && copy !== 1
                    ? HIDDEN
                    : IS_WEB
                      ? { role: 'group' as const, 'aria-label': formatSlideLabel(labels.slide, i + 1, pager.count) }
                      : {})}
                >
                  {slide}
                </View>
              ))
            )}
          </AnimatedScrollView>
          {arrows ? (
            <>
              <CarouselArrow
                forward={false}
                vertical={!pager.horizontal}
                label={labels.previous}
                disabled={!pager.canGoBack}
                onPress={() => pager.go(-1)}
                theme={theme}
                style={slots?.arrow}
              />
              <CarouselArrow
                forward
                vertical={!pager.horizontal}
                label={labels.next}
                disabled={!pager.canGoForward}
                onPress={() => pager.go(1)}
                theme={theme}
                style={slots?.arrow}
              />
            </>
          ) : null}
        </View>
        {showIndicator && pager.count > 1 ? (
          <Dots
            count={pager.count}
            value={pager.index}
            position={pager.position ?? fallback}
            label={labels.slide}
            theme={theme}
            onValueChange={pager.goTo}
            style={slots?.indicator}
            testID={testID ? `${testID}-indicator` : undefined}
          />
        ) : null}
      </View>
    </ThemeScope>
  );
};
