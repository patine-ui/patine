import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Stat } from './Stat';

describe('Stat', () => {
  it('reads as one sentence and colors a rise green', async () => {
    await render(<Stat label="Revenue" value="$48,210" change="+12.5%" description="vs last month" />);
    expect(screen.getByLabelText('Revenue, $48,210, up 12.5%, vs last month')).toBeTruthy();
    expect(screen.getByText('↑ +12.5%')).toHaveStyle({ color: lightTheme.colors.success });
  });

  it('colors a fall green when down is good', async () => {
    await render(<Stat label="Churn" value="2.1%" change={-0.4} invertTrend />);
    expect(screen.getByText('↓ -0.4')).toHaveStyle({ color: lightTheme.colors.success });
  });
});
