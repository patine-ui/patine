import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import { useReturnFocus } from '@/core/a11y/hooks/useReturnFocus';
import { usePresence } from '@/core/animation/hooks/usePresence';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { usePopoverContext } from '@/overlays/popover/hooks/usePopoverContext';
import { POPOVER_DESIGN } from '@/overlays/popover/popover.constants';
import { themed } from '@/overlays/popover/popover.styles';
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
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
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
    <ThemeScope theme={themeOverride}>
      <FloatingModal visible={open} onClose={() => setOpen(false)}>
        {(rect) => {
          const area = rect ?? { x: 0, y: 0, ...windowSize };
          return (
            <FloatingPanel
              role="dialog"
              aria-label={accessibilityLabel}
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
              style={[themed(theme).panel, style]}
            >
              {children}
            </FloatingPanel>
          );
        }}
      </FloatingModal>
    </ThemeScope>
  );
};
