import { Text } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('shows a heading, what to do and an action', async () => {
    await render(<EmptyState icon="📭" title="No messages" description="New messages land here." action={<Text>Compose</Text>} />);
    expect(screen.getByRole('heading', { name: 'No messages' })).toBeTruthy();
    expect(screen.getByText('New messages land here.')).toBeTruthy();
    expect(screen.getByText('Compose')).toBeTruthy();
  });
});
