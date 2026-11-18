import { useDesignOverride } from '@/core/theme/ThemeProvider';
import { PickerSheet } from '@/overlays/sheet';
import { EmojiPicker } from './EmojiPicker';
import { DEFAULT_SHEET_HEIGHT } from './emoji.constants';
import type { EmojiPickerSheetProps } from './emoji.types';
import { useSheetRecent } from './hooks/useSheetRecent';

export const EmojiPickerSheet = ({
  open: visible = false,
  onOpenChange,
  title,
  confirmLabel,
  cancelLabel,
  showCancel = false,
  presentation,
  sheetProps,
  theme: themeProp,
  design,
  closeOnSelect = true,
  onSelect,
  height = DEFAULT_SHEET_HEIGHT,
  recent: recentProp,
  defaultRecent,
  onRecentChange,
  ...rest
}: EmojiPickerSheetProps) => {
  const theme = useDesignOverride(themeProp, design);
  const onClose = () => onOpenChange?.(false);
  const recent = useSheetRecent({ visible, closeOnSelect, recent: recentProp, defaultRecent, onRecentChange });
  return (
    <PickerSheet
      {...{ open: visible, onOpenChange: onClose, title, confirmLabel, cancelLabel, showCancel, presentation, sheetProps, theme }}
    >
      <EmojiPicker
        {...rest}
        {...recent}
        height={height}
        theme={theme}
        onSelect={(char, data) => {
          onSelect(char, data);
          if (closeOnSelect) onClose();
        }}
      />
    </PickerSheet>
  );
};
