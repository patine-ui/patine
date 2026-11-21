import { render, screen } from '@testing-library/react-native';

import { Progress, Spinner } from './Progress';

describe('Progress', () => {
  it('reports its percentage to screen readers', async () => {
    await render(<Progress value={3} max={4} aria-label="Upload" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar.props['aria-valuenow']).toBe(75);
    expect(bar.props).toMatchObject({ 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': 75 });
  });

  it('is busy with no value while indeterminate', async () => {
    await render(<Progress aria-label="Syncing" />);
    const bar = screen.getByRole('progressbar', { name: 'Syncing' });
    expect(bar.props['aria-busy']).toBe(true);
    expect(bar.props['aria-valuenow']).toBeUndefined();
  });
});

describe('Spinner', () => {
  it('is named Loading by default', async () => {
    await render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });
});
