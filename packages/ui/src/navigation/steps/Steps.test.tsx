import { fireEvent, render, screen } from '@testing-library/react-native';

import { Steps } from './Steps';

const STEPS = [{ title: 'Cart' }, { title: 'Shipping' }, { title: 'Payment' }];

describe('Steps', () => {
  it('names each step with its place and state, and marks the current one', async () => {
    await render(<Steps steps={STEPS} value={1} />);
    expect(screen.getByLabelText('Step 1 of 3: Cart, completed')).toBeTruthy();
    expect(screen.getByLabelText('Step 2 of 3: Shipping')).toBeSelected();
    expect(screen.getByLabelText('Step 3 of 3: Payment')).not.toBeSelected();
  });

  it('goes back to a done step when pressable, and only to done steps', async () => {
    const onValueChange = jest.fn();
    await render(<Steps steps={STEPS} value={2} onValueChange={onValueChange} orientation="vertical" />);
    await fireEvent.press(screen.getByRole('button', { name: 'Step 1 of 3: Cart, completed' }));
    expect(onValueChange).toHaveBeenCalledWith(0);
    expect(screen.queryByRole('button', { name: 'Step 3 of 3: Payment' })).toBeNull();
  });

  it("keeps a done step that can't be reopened out of the buttons", async () => {
    const onValueChange = jest.fn();
    await render(
      <Steps
        steps={[{ title: 'Cart', disabled: true }, { title: 'Shipping' }, { title: 'Payment' }]}
        value={2}
        onValueChange={onValueChange}
      />
    );
    expect(screen.queryByRole('button', { name: 'Step 1 of 3: Cart, completed' })).toBeNull();
    expect(screen.getByLabelText('Step 1 of 3: Cart, completed')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Step 2 of 3: Shipping, completed' })).toBeTruthy();
  });

  it('shows a progress bar with the step in the progress variant', async () => {
    await render(<Steps steps={STEPS} value={1} variant="progress" />);
    expect(screen.getByText('Step 2 of 3 · Shipping')).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: 'Step 2 of 3' }).props['aria-valuenow']).toBe(67);
  });
});
