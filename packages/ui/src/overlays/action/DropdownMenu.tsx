import { useWindowDimensions } from 'react-native';

import { useFinePointer } from '@/core/hooks/useFinePointer';
import { Scroll } from '@/core/primitives/Scroll';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useDirection } from '@/core/theme/ThemeProvider';
import { Dropdown } from '@/overlays/sheet/Dropdown';
import { useDropdownFit } from '@/overlays/sheet/hooks/useDropdownFit';
import { ActionSheet } from './ActionSheet';
import { COMPACT_MENU, MENU_ALIGN, MENU_DESIGN, MENU_PRESENTATION } from './action.constants';
import { styles } from './action.styles';
import type { DropdownMenuProps } from './action.types';
import { getMenuAnchor } from './action.utils';
import { ActionSheetHeader } from './components/ActionSheetHeader';
import { ActionSheetRow } from './components/ActionSheetRow';
import { useDropdownMenu } from './hooks/useDropdownMenu';

/** A menu of actions that drops from its trigger, or opens as an ActionSheet. Tap the trigger, or long-press it as a context menu. */
export const DropdownMenu = (props: DropdownMenuProps) => {
  const rtl = useDirection() === 'rtl';
  const {
    actions,
    children,
    title,
    align = MENU_ALIGN.auto,
    width,
    presentation = MENU_PRESENTATION.menu,
    openOnLongPress = false,
    disabled,
    'aria-label': accessibilityLabel,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = MENU_DESIGN[theme.design];
  const windowSize = useWindowDimensions();
  const menu = useDropdownMenu(props);
  const rect = menu.anchor.rect;
  const fit = useDropdownFit();
  // A mouse needs no 44 pt rows: desktop menus are compact and quiet, as on macOS and Windows.
  const compact = useFinePointer();

  return (
    <ThemeScope theme={themeOverride}>
      <View ref={menu.anchor.ref} collapsable={false} style={style}>
        {typeof children === 'function' ? (
          children({ open: menu.open, visible: menu.visible })
        ) : (
          <Touchable
            theme={theme}
            onPress={openOnLongPress ? undefined : menu.open}
            onLongPress={openOnLongPress ? menu.open : undefined}
            disabled={disabled}
            role="button"
            aria-label={accessibilityLabel}
            aria-expanded={menu.visible}
            aria-disabled={disabled}
            style={slots?.trigger}
            testID={testID}
          >
            {children}
          </Touchable>
        )}
      </View>
      {presentation === MENU_PRESENTATION.sheet ? (
        <ActionSheet
          open={menu.visible}
          onOpenChange={menu.close}
          actions={actions}
          title={title}
          styles={slots}
          theme={themeProp}
          design={design}
          testID={testID && `${testID}-menu`}
        />
      ) : (
        <Dropdown
          visible={menu.visible}
          anchor={rect && getMenuAnchor(rect, width ?? look.width, align, windowSize.width, rtl)}
          onClose={menu.close}
          onClosed={menu.onClosed}
          maxHeight={fit.height}
          ready={fit.measured}
          style={slots?.menu}
          theme={themeProp}
          design={design}
          testID={testID && `${testID}-menu`}
        >
          <Scroll style={styles.list} bounces={false} onContentSizeChange={fit.onContentSizeChange}>
            <ActionSheetHeader title={title} grouped={look.centeredTitle && !compact} compact={compact} theme={theme} slots={slots} />
            {actions.map((action, i) => (
              <ActionSheetRow
                key={action.label}
                action={action}
                onPress={menu.press}
                grouped={false}
                separated={look.separators && (i > 0 || !!title)}
                rowHeight={compact ? COMPACT_MENU.rowHeight : look.rowHeight}
                compact={compact}
                iconAtEnd={look.iconAtEnd}
                theme={theme}
                slots={slots}
              />
            ))}
          </Scroll>
        </Dropdown>
      )}
    </ThemeScope>
  );
};
