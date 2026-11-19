import type { ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { BREADCRUMBS_DESIGN } from '@/navigation/breadcrumbs/breadcrumbs.constants';
import { styles, themed } from '@/navigation/breadcrumbs/breadcrumbs.styles';

interface Props {
  label: string;
  onPress?: () => void;
  href?: string;
  external?: boolean;
  accessibilityName?: string;
  icon?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
}

/** One level of the trail: a link back up, or plain text when it has nowhere to go. */
export const Crumb = ({ label, onPress, href, external, accessibilityName, icon, labelStyle }: Props) => {
  const theme = useTheme();
  const look = BREADCRUMBS_DESIGN[theme.design];
  const style = [styles.crumb, themed(theme).crumb];
  const content = (
    <>
      {icon}
      <Text size="sm" color={look.primaryLinks ? 'primary' : 'textSecondary'} style={labelStyle}>
        {label}
      </Text>
    </>
  );
  // A crumb without onPress is plain text, not a disabled link.
  if (!onPress && !href)
    return (
      <View aria-label={accessibilityName} style={style}>
        {content}
      </View>
    );
  return (
    <Touchable
      role="link"
      aria-label={accessibilityName}
      onPress={onPress}
      href={href}
      external={external}
      hitSlop={CRUMB_SLOP}
      style={style}
    >
      {content}
    </Touchable>
  );
};

/** Text links are short; this reaches 44pt above and below. */
const CRUMB_SLOP = { top: 12, bottom: 12 };
