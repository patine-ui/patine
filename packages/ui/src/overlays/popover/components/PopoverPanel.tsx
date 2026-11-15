import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import { usePresence } from '@/core/animation/hooks/usePresence';
import { useReturnFocus } from '@/core/hooks/useReturnFocus';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { usePopoverContext } from '@/overlays/popover/hooks/usePopoverContext';
import { POPOVER_DESIGN } from '@/overlays/popover/popover.constants';
import type { PopoverContentProps } from '@/overlays/popover/popover.types';
import { toLocalRect } from '@/overlays/sheet/sheet.utils';
import { FloatingModal } from './FloatingModal';
import { FloatingPanel } from './FloatingPanel';

/** The popover by its trigger, in a modal: focus moves into it on the web and goes back to the trigger when it closes. */
export const PopoverPanel = ({
  children,
  side,
  align,
  sideOffset,
  arrow,
  accessibilityLabel,
  style,
  theme: themeProp,
  design,
  testID,
}: Omit<PopoverContentProps, 'presentation'>) => {
  const { open, setOpen, anchor } = usePopoverContext();
  const { theme } = useComponentTheme(themeProp, design);
  const look = POPOVER_DESIGN[theme.design];
  const windowSize = useWindowDimensions();
  const { mounted, progress } = usePresence({ visible: open, duration: theme.animation.duration });
  useReturnFocus(mounted);
  const { measure, rect: trigger } = anchor;
  // Measured on every open, also when `open` is set from outside, since the trigger may have scrolled.
  useEffect(() => {
    if (open) measure();
  }, [open, measure]);
  if (!mounted || !trigger) return null;

  return (
    <FloatingModal visible={open} onClose={() => setOpen(false)}>
      {(rect) => {
        const area = rect ?? { x: 0, y: 0, ...windowSize };
        return (
          <FloatingPanel
            role="dialog"
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            pointerEvents={open ? 'auto' : 'none'}
            trigger={toLocalRect(trigger, area)}
            area={area}
            side={side}
            align={align}
            sideOffset={sideOffset ?? look.sideOffset}
            progress={progress}
            ready={!!rect}
            arrowColor={(arrow ?? look.arrow) ? theme.colors.sheet : undefined}
            style={[
              {
                width: look.width,
                padding: look.padding,
                backgroundColor: theme.colors.sheet,
                borderRadius: theme.radius[look.radius],
                borderWidth: look.border ? 1 : 0,
                borderColor: theme.colors.border,
                boxShadow: theme.shadows.lg,
              },
              style,
            ]}
          >
            {children}
          </FloatingPanel>
        );
      }}
    </FloatingModal>
  );
};
