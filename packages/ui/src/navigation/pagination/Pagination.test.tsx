import { fireEvent, render, screen } from '@testing-library/react-native';

import { PatineProvider } from '@/core/theme/ThemeProvider';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('marks the current page and goes to the one pressed', async () => {
    const onPageChange = jest.fn();
    await render(<Pagination pageCount={10} defaultPage={5} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Page 5', selected: true })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Page 8' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Page 6' }));
    expect(onPageChange).toHaveBeenLastCalledWith(6);
    await fireEvent.press(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenLastCalledWith(7);
  });

  it('disables Previous on the first page and Next on the last', async () => {
    await render(<Pagination pageCount={3} page={1} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await screen.rerender(<Pagination pageCount={3} page={3} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('compact: shows where you are in words', async () => {
    await render(<Pagination pageCount={12} page={3} variant="compact" />);
    expect(screen.getByText('Page 3 of 12')).toBeTruthy();
  });

  it("speaks the provider's language, and its own labels prop wins", async () => {
    await render(
      <PatineProvider labels={{ pagination: { next: 'Suivant', previous: 'Précédent' } }}>
        <Pagination pageCount={3} defaultPage={2} labels={{ previous: 'Retour' }} />
      </PatineProvider>
    );
    expect(screen.getByRole('button', { name: 'Suivant' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Retour' })).toBeTruthy();
  });
});
