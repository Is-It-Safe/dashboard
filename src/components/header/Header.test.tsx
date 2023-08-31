import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter
import { AuthProvider } from '../../context/auth/AuthProvider';
import Header from './Header';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';

jest.mock('../../services/get-logged-user/get-logged-user-service');
jest.mock('../../utils/ baseUrl.ts', () => ({'someUrl': 'http://www.url.com'}));
jest.mock('../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));
jest.mock('../../assets/profile.png', () =>  'src/assets/profile.png');


interface User {
  nickname: string;
  profilePhoto: string;
}

describe('Header', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it('renders the header component with user information', async () => {
    const user = {
      nickname: 'John Doe',
      profilePhoto: 'src/assets/profile.png',
    } as User;
    (getLoggedUser as jest.Mock).mockResolvedValueOnce(user);

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            {' '}
            <Header />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    );

    await screen.findByText('olá John Doe');

    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByText('olá John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile-pic')).toHaveAttribute(
      'src',
      'src/assets/profile.png'
    );
  });
});
