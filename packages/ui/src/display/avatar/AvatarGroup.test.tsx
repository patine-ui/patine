import { render, screen } from '@testing-library/react-native';

import { AvatarGroup } from './AvatarGroup';

const PEOPLE = ['Maya Cohen', 'Daniel Okafor', 'Ana Pérez', 'Noah Kim', 'Priya Raman'].map((name) => ({ name }));

describe('AvatarGroup', () => {
  it('shows up to max with a +N, read as one image', async () => {
    await render(<AvatarGroup avatars={PEOPLE} max={3} />);
    expect(screen.getByRole('img', { name: 'Maya Cohen, Daniel Okafor and 3 others' })).toBeTruthy();
    expect(screen.getByText('+3', { includeHiddenElements: true })).toBeTruthy();
  });

  it('shows everyone without max', async () => {
    await render(<AvatarGroup avatars={PEOPLE.slice(0, 2)} />);
    expect(screen.getByRole('img', { name: 'Maya Cohen and Daniel Okafor' })).toBeTruthy();
  });
});
