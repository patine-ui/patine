import { startAlign } from '@/core/core.styles';
import { View } from '@/core/primitives/View';
import { useDirection } from '@/core/theme/ThemeProvider';
import { Heading } from '@/foundations/text/Heading';
import { styles, themed } from '@/pickers/date/date.styles';
import type { DateHeadlineProps } from '@/pickers/date/date.types';

/** The picked date in large type, above a Material calendar. */
export const DateHeadline = ({ text, theme }: DateHeadlineProps) => {
  const dir = useDirection();
  return (
    <View style={[styles.headline, themed(theme).headline]}>
      <Heading level={2} weight="regular" theme={theme} size="xl" style={[startAlign[dir], styles.headlineText]}>
        {text}
      </Heading>
    </View>
  );
};
