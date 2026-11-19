import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ACTIVE_TAB, CATEGORY_BAR_POSITION, EMOJI_DESIGN } from '@/pickers/emoji/emoji.constants';
import { styles, themed } from '@/pickers/emoji/emoji.styles';
import type { CategoryBarProps } from '@/pickers/emoji/emoji.types';

export const CategoryBar = ({ tabs, active, position, labels, icons, onSelect, theme, slots }: CategoryBarProps) => {
  const { activeTab } = EMOJI_DESIGN[theme.design];
  const underlined = activeTab === ACTIVE_TAB.underline;
  const pill = activeTab === ACTIVE_TAB.pill;
  return (
    <View
      style={[
        styles.bar,
        position === CATEGORY_BAR_POSITION.top ? styles.barTop : styles.barBottom,
        !underlined && styles.markedBar,
        themed(theme).bar,
        slots?.categoryBar,
      ]}
    >
      {tabs.map((key) => {
        const selected = active === key;
        const icon = icons[key];
        return (
          <Touchable
            key={key}
            theme={theme}
            onPress={() => onSelect(key)}
            role="tab"
            aria-label={labels[key]}
            aria-selected={selected}
            style={[
              styles.tab,
              !underlined && styles.markedTab,
              pill ? themed(theme).pillTab : themed(theme).tab,
              !underlined && selected && (pill ? themed(theme).pillOn : themed(theme).tabOn),
              slots?.categoryTab,
              selected && slots?.activeCategoryTab,
            ]}
          >
            {typeof icon === 'string' ? <Text style={[styles.tabIcon, !selected && styles.inactiveTab]}>{icon}</Text> : icon}
            {underlined ? (
              <View
                style={[
                  styles.tabIndicator,
                  position === CATEGORY_BAR_POSITION.top ? styles.tabIndicatorTop : styles.tabIndicatorBottom,
                  selected && themed(theme).indicatorOn,
                  slots?.categoryIndicator,
                ]}
              />
            ) : null}
          </Touchable>
        );
      })}
    </View>
  );
};
