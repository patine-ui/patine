import { useState } from 'react';
import { KeyboardAvoidingView, useWindowDimensions } from 'react-native';

import { useReturnFocus } from '@/core/a11y/hooks/useReturnFocus';
import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { KEYBOARD_AVOID_BEHAVIOR } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { Modal } from '@/core/primitives/Modal';
import { Slot } from '@/core/primitives/Slot';
import { AnimatedView, Pressable, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels, usePlatform } from '@/core/theme/ThemeProvider';
import { SheetCloseButton } from './components/SheetCloseButton';
import { SheetDragArea } from './components/SheetDragArea';
import { SheetHeader } from './components/SheetHeader';
import { useSheetAnimation } from './hooks/useSheetAnimation';
import { useSheetResize } from './hooks/useSheetResize';
import { DEFAULT_MAX_HEIGHT_RATIO, DIALOG_RISE, SHEET_PRESENTATION } from './sheet.constants';
import { sheetStyles, styles } from './sheet.styles';
import type { BottomSheetProps } from './sheet.types';
import { getBottomInset, getHeight, getSheetBox, getSheetDefaults, resolvePresentation, resolveSheetHeight } from './sheet.utils';

/**
 * A sheet that slides up from the bottom, drags to resize and swipes away; a centered card on wide web windows. Give it a
 * `trigger` to open itself, or control it with `open` + `onOpenChange`.
 */
export const BottomSheet = ({ open, defaultOpen = false, onOpenChange, trigger, ...rest }: BottomSheetProps) => {
  const [visible, setVisible] = useControllableState(open, defaultOpen, onOpenChange);
  return (
    <>
      {trigger ? (
        <Slot onPress={() => setVisible(true)} aria-expanded={visible}>
          {trigger}
        </Slot>
      ) : null}
      <SheetPanel {...rest} open={visible} onOpenChange={setVisible} />
    </>
  );
};

const SheetPanel = ({
  open: visible = false,
  onOpenChange,
  children,
  title,
  headerLeft,
  headerRight,
  footer,
  enableSwipeToClose = true,
  draggable: draggableProp,
  expandable = true,
  expandedHeight,
  showHandle = true,
  closeOnBackdropPress = true,
  maxHeightRatio = DEFAULT_MAX_HEIGHT_RATIO,
  height,
  bottomInset: bottomInsetProp,
  presentation = SHEET_PRESENTATION.auto,
  closeLabel: closeLabelProp,
  showCloseButton = true,
  styles: slots,
  theme: themeProp,
  design,
  onOpened,
  onClosed,
  testID,
}: Omit<BottomSheetProps, 'trigger' | 'defaultOpen'>) => {
  const words = useLabels();
  const closeLabel = closeLabelProp ?? words.close;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const onClose = () => onOpenChange?.(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  // The room the modal really has: the window on native, but on the web it can be a smaller host (a phone mock-up in a page).
  const [area, setArea] = useState<number>();
  const areaHeight = area ?? windowHeight;
  const platform = usePlatform();
  const defaults = getSheetDefaults(platform);
  const draggable = draggableProp ?? defaults.draggable;
  const bottomInset = bottomInsetProp ?? defaults.bottomInset;
  const dialog = resolvePresentation(presentation, platform, windowWidth) === SHEET_PRESENTATION.modal;
  const { mounted, progress, slide } = useSheetAnimation({
    visible,
    duration: theme.animation.duration,
    slideDistance: dialog ? DIALOG_RISE : windowHeight,
    onOpened,
    onClosed,
  });
  const expandedPx = resolveSheetHeight(expandedHeight, areaHeight) ?? areaHeight - defaults.expandedTopInset;
  const resize = useSheetResize({
    active: mounted && visible,
    slide,
    draggable: !dialog,
    expandable: expandable && !dialog,
    swipeToClose: enableSwipeToClose && !dialog,
    expandedHeight: expandedPx,
    onClose,
  });
  const surface = sheetStyles(theme);
  // An animated value: the backdrop (and a dialog) fade in.
  const fade = { opacity: progress };
  useReturnFocus(mounted);

  if (!mounted) return null;
  const resolvedHeight = resolveSheetHeight(height, areaHeight);
  const closeButton =
    dialog && showCloseButton && !headerRight ? <SheetCloseButton label={closeLabel} onPress={onClose} theme={theme} /> : null;
  const right = headerRight ?? closeButton;

  return (
    <ThemeScope theme={themeOverride}>
      <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={onClose} testID={testID}>
        <KeyboardAvoidingView behavior={KEYBOARD_AVOID_BEHAVIOR} style={styles.fill} onLayout={(e) => setArea(e.nativeEvent.layout.height)}>
          <AnimatedView style={[styles.fill, surface.backdrop, fade, slots?.backdrop]}>
            {/* Only a button when it closes the sheet, so a screen reader never lands on a "Close" that does nothing */}
            <Pressable
              style={styles.fill}
              onPress={closeOnBackdropPress ? onClose : undefined}
              accessible={closeOnBackdropPress}
              role={closeOnBackdropPress ? 'button' : undefined}
              aria-label={closeOnBackdropPress ? closeLabel : undefined}
            />
          </AnimatedView>
          <View style={dialog ? styles.dialogContainer : styles.container} pointerEvents="box-none">
            {/* Two layers: the frame slides and drags, the sheet clips its content */}
            <AnimatedView style={[styles.sheetFrame, resize.frameStyle, dialog && fade]}>
              <View
                ref={resize.sheetRef}
                {...ARROW_FOCUS}
                onLayout={resize.onLayout}
                style={[
                  styles.sheet,
                  surface.surface,
                  getSheetBox(resize.expanded, expandedPx, areaHeight * maxHeightRatio, resolvedHeight),
                  dialog ? surface.dialog : [surface.sheet, getBottomInset(bottomInset)],
                  slots?.sheet,
                ]}
                role="dialog"
                aria-modal
                aria-label={typeof title === 'string' ? title : undefined}
                accessibilityViewIsModal
                onAccessibilityEscape={onClose}
              >
                {resize.dragArea ? <SheetDragArea {...resize.dragArea} /> : null}
                {/* collapsable={false}: not flattened away, so a touch anywhere on the strip reaches the drag handlers */}
                <View style={dialog && styles.dialogHeader} pointerEvents="box-none">
                  {!dialog && showHandle && (
                    <View
                      {...resize.panHandlers}
                      collapsable={false}
                      pointerEvents={resize.dragArea ? 'none' : undefined}
                      style={styles.handleArea}
                    >
                      <View style={[styles.handle, surface.handle, slots?.handle]} />
                    </View>
                  )}
                  {(title || headerLeft || right) && (
                    <View
                      {...(draggable && !dialog ? resize.panHandlers : null)}
                      collapsable={false}
                      pointerEvents={draggable && resize.dragArea ? 'box-none' : undefined}
                    >
                      <SheetHeader title={title} headerLeft={headerLeft} headerRight={right} theme={theme} slots={slots} />
                    </View>
                  )}
                </View>
                <View style={[resolvedHeight || resize.expanded ? styles.flex : styles.shrink, slots?.content]}>{children}</View>
                {footer ? <View style={[surface.footer, slots?.footer]}>{footer}</View> : null}
              </View>
              {dialog ? null : <View style={[styles.filler, surface.surface, getHeight(expandedPx)]} />}
            </AnimatedView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ThemeScope>
  );
};
