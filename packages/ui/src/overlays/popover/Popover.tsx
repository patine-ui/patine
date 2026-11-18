import { Children, cloneElement, type ReactElement } from 'react';
import { View } from 'react-native';

import { useControllableState } from '@/core/hooks/useControllableState';
import { BottomSheet } from '@/overlays/sheet/BottomSheet';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';
import { PopoverPanel } from './components/PopoverPanel';
import { PopoverContext, usePopoverContext } from './hooks/usePopoverContext';
import { POPOVER_PRESENTATION } from './popover.constants';
import type { PopoverCloseProps, PopoverContentProps, PopoverProps, PopoverTriggerProps, TriggerChildProps } from './popover.types';
import { chain } from './popover.utils';

/**
 * Holds a popover's open state for its trigger, content and close buttons. Controlled with `open`, or on its own. Give it a
 * `trigger` and its children are the content; or compose PopoverTrigger and PopoverContent for full control.
 */
export const Popover = ({ children, open: openProp, defaultOpen = false, onOpenChange, trigger, ...content }: PopoverProps) => {
  const [open, setValue] = useControllableState(openProp, defaultOpen, onOpenChange);
  const anchor = useAnchor();
  const value = {
    open,
    setOpen: (next: boolean) => {
      if (next !== open) setValue(next);
    },
    anchor,
  };
  return (
    <PopoverContext.Provider value={value}>
      {trigger ? (
        <>
          <PopoverTrigger>{trigger}</PopoverTrigger>
          <PopoverContent {...content}>{children}</PopoverContent>
        </>
      ) : (
        children
      )}
    </PopoverContext.Provider>
  );
};

/** Wraps a pressable, such as a Button: pressing it opens or closes the popover, and it reports whether it's expanded. */
export const PopoverTrigger = ({ children, style }: PopoverTriggerProps) => {
  const { open, setOpen, anchor } = usePopoverContext();
  const child = Children.only(children) as ReactElement<TriggerChildProps>;
  return (
    <View ref={anchor.ref} collapsable={false} style={style}>
      {cloneElement(child, {
        onPress: chain(child.props.onPress, () => setOpen(!open)),
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
      })}
    </View>
  );
};

/** Wraps a pressable inside the content that closes the popover, such as Done or Cancel. */
export const PopoverClose = ({ children }: PopoverCloseProps) => {
  const { setOpen } = usePopoverContext();
  const child = Children.only(children) as ReactElement<TriggerChildProps>;
  return cloneElement(child, { onPress: chain(child.props.onPress, () => setOpen(false)) });
};

/** The popover itself: beside the trigger, flipped and kept on screen, or a bottom sheet with `presentation="sheet"`. */
export const PopoverContent = ({ presentation = POPOVER_PRESENTATION.popover, ...props }: PopoverContentProps) => {
  const { open, setOpen } = usePopoverContext();
  if (presentation === POPOVER_PRESENTATION.sheet) {
    return (
      <BottomSheet open={open} onOpenChange={setOpen} theme={props.theme} design={props.design} testID={props.testID}>
        {props.children}
      </BottomSheet>
    );
  }
  return <PopoverPanel {...props} />;
};
