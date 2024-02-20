import { render, screen, waitFor } from '@testing-library/react';
import { CardTotalsHome } from './CardTotalsHome';

jest.mock('../../assets/Icons/Up.svg', () => ({
  ReactComponent: () => <svg data-testid="up" />,
}));

jest.mock('../../assets/Icons/PilNed.svg', () => ({
  ReactComponent: () => <svg data-testid="pil-ned" />,
}));

jest.mock('../../context/auth/AuthProvider', () => ({
  useAuth: () => ({ accessToken: 'mock-access-token' }),
}));

jest.mock('../../services/location/location-service', () => ({
  locationRequest: jest.fn(() => ({ total_locations: 100 })),
}));

jest.mock('../../services/user/user-service', () => ({
  userRequest: jest.fn(() => ({ total_users: 500 })),
}));

jest.mock('../../services/review-number/review-number-service', () => ({
  reviewNumberRequest: jest.fn(() => ({ total_review: 200 })),
}));

test('renders total data correctly', async () => {
  render(<CardTotalsHome />);

  await waitFor(() =>
    expect(screen.getByText(/Usuários totais/)).toBeInTheDocument()
  );

  expect(screen.getByText(/Usuários totais/)).toBeInTheDocument();
  expect(screen.getByText(/Locais/)).toBeInTheDocument();
  expect(screen.getByText(/Reviews/)).toBeInTheDocument();

  expect(screen.getByText(/500/)).toBeInTheDocument();
  expect(screen.getByText(/100/)).toBeInTheDocument();
  expect(screen.getByText(/200/)).toBeInTheDocument();
});
