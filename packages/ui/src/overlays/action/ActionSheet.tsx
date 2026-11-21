import { useControllableState } from '@/core/hooks/useControllableState';
import { Scroll } from '@/core/primitives/Scroll';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { BottomSheet } from '@/overlays/sheet/BottomSheet';
import { ACTION_SHEET_DESIGN } from './action.constants';
import { styles, themed } from './action.styles';
import type { ActionSheetProps } from './action.types';
import { ActionSheetHeader } from './components/ActionSheetHeader';
import { ActionSheetRow } from './components/ActionSheetRow';
import { useActionPress } from './hooks/useActionPress';

/** A list of actions in a bottom sheet: iOS cards with a separate Cancel, or Material and web rows with icons. `useActionSheet` shows one from a call. */
export const ActionSheet = ({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  actions,
  title,
  message,
  cancelLabel: cancelLabelProp,
  showCancel,
  presentation,
  sheetProps,
  styles: slots,
  theme: themeProp,
  design,
  testID,
}: ActionSheetProps) => {
  const words = useLabels();
  const cancelLabel = cancelLabelProp ?? words.cancel;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [visible, setVisible] = useControllableState(open, defaultOpen, onOpenChange);
  const onClose = () => setVisible(false);
  const look = ACTION_SHEET_DESIGN[theme.design];
  const { grouped } = look;
  const { press, onClosed } = useActionPress(onClose, sheetProps?.onClosed);
  const hasHeader = !!(title || message);
  const group = grouped && [styles.group, themed(theme).groupCard, slots?.group];

  return (
    <ThemeScope theme={themeOverride}>
      <BottomSheet
        expandable={false}
        showHandle={!grouped}
        presentation={presentation}
        // Its own rows and Cancel close it; a ✕ would only add a header row
        showCloseButton={false}
        {...sheetProps}
        styles={grouped ? { ...sheetProps?.styles, sheet: [styles.groupedSheet, sheetProps?.styles?.sheet] } : sheetProps?.styles}
        trigger={trigger}
        open={visible}
        onOpenChange={setVisible}
        onClosed={onClosed}
        theme={themeProp}
        design={design}
        testID={testID}
      >
        <View style={group || styles.group}>
          <ActionSheetHeader title={title} message={message} grouped={grouped} theme={theme} slots={slots} />
          <Scroll style={styles.list} bounces={false}>
            {actions.map((action, i) => (
              <ActionSheetRow
                key={action.label}
                action={action}
                onPress={press}
                grouped={grouped}
                separated={grouped && (i > 0 || hasHeader)}
                rowHeight={look.rowHeight}
                theme={theme}
                slots={slots}
              />
            ))}
          </Scroll>
        </View>
        {(showCancel ?? look.showCancel) && (
          <View style={[group, grouped && styles.cancelGroup]}>
            <ActionSheetRow
              action={{ label: cancelLabel, testID: testID ? `${testID}-cancel` : undefined }}
              onPress={() => onClose()}
              grouped={grouped}
              cancel
              separated={!grouped}
              rowHeight={look.rowHeight}
              theme={theme}
              slots={slots}
            />
          </View>
        )}
      </BottomSheet>
    </ThemeScope>
  );
};
