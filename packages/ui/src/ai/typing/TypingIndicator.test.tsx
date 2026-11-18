import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { TypingIndicator } from './TypingIndicator';

describe('TypingIndicator', () => {
  it('says who is typing, politely, when it appears', async () => {
    await render(<TypingIndicator name="Maya" />);
    expect(screen.getByLabelText('Maya is typing')).toHaveProp('aria-live', 'polite');
  });

  it('takes the shape of an incoming bubble in each design', async () => {
    await render(<TypingIndicator testID="t" design="web" />);
    expect(screen.getByTestId('t')).toHaveStyle({ borderRadius: 8, backgroundColor: lightTheme.colors.background });
    await render(<TypingIndicator testID="i" design="ios" accessibilityLabel="Assistant is thinking" />);
    expect(screen.getByLabelText('Assistant is thinking')).toHaveStyle({ borderRadius: 18, borderWidth: 0 });
  });
});
