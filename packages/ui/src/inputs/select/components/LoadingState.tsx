import { ActivityIndicator } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/select/select.styles';
import type { LoadingStateProps } from '@/inputs/select/select.types';

export const LoadingState = ({ text, renderLoading, theme, slots }: LoadingStateProps) => (
  <View style={[styles.loading, themed(theme).loading, slots?.loading]} role="progressbar">
    {renderLoading ? (
      renderLoading(theme)
    ) : (
      <>
        <ActivityIndicator color={theme.colors.primary} />
        <Text size="sm" color="textSecondary" style={slots?.loadingText}>
          {text}
        </Text>
      </>
    )}
  </View>
);
