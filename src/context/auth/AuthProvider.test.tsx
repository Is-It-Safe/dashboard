import { render, act, RenderResult } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider';

// Mock the jwt-decode function
jest.mock('jwt-decode', () => ({ default: jest.fn(() => ({})) }));
// Mock the services used in the component
jest.mock('../../services/refresh-token/refresh-token-service', () => ({
  getRefreshToken: jest
    .fn()
    .mockResolvedValue({ refresh_token: 'fake-refresh-token' }),
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  it('should provide access to tokens and token-related functions', async () => {
    // Render the component
    let component: RenderResult | undefined;

    await act(async () => {
      component = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    if (!component) {
      throw new Error('Component not rendered');
    }

    // Custom component to test the context
    function TestComponent() {
      const {
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        handleLogout,
      } = useAuth();

      return (
        <div>
          <div data-testid="access-token">{accessToken}</div>
          <div data-testid="refresh-token">{refreshToken}</div>
          <button
            data-testid="set-tokens"
            onClick={() => {
              setAccessToken('fake-access-token');
              setRefreshToken('fake-refresh-token');
            }}
          >
            Set Tokens
          </button>
          <button data-testid="clear-tokens" onClick={handleLogout}>
            Clear Tokens
          </button>
        </div>
      );
    }

    // Test initial token values
    expect(component.getByTestId('access-token').textContent).toBe('');
    expect(component.getByTestId('refresh-token').textContent).toBe('');

    // Set tokens and test their values
    act(() => {
      component!.getByTestId('set-tokens').click();
    });
    expect(component.getByTestId('access-token').textContent).toBe(
      'fake-access-token'
    );
    expect(component.getByTestId('refresh-token').textContent).toBe(
      'fake-refresh-token'
    );

    // Clear tokens and test their values
    act(() => {
      component!.getByTestId('clear-tokens').click();
    });
    expect(component.getByTestId('access-token').textContent).toBe('');
    expect(component.getByTestId('refresh-token').textContent).toBe('');
  });
});
