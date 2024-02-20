import axios from 'axios';
import { doLogin, LoginParams, LoginResponse } from './login-service';

jest.mock('axios');

describe('login', () => {
  const requestMock = axios.post as jest.MockedFunction<typeof axios.post>;
  const baseUrl = import.meta.env.VITE_API_URL as string;

  const mockResponse: LoginResponse = {
    refresh_token: 'mockRefreshToken',
    token_jwt: 'mockTokenJWT',
    token_type: 'Bearer',
    user: {
      email: 'test@test.com',
      id: 1,
      name: 'Test User',
      role: 'admin',
    },
  };

  it('should send a POST request to the login endpoint with the provided params', async () => {
    const mockParams: LoginParams = {
      username: 'test@example.com',
      password: 'password',
    };

    requestMock.mockResolvedValueOnce({ data: mockResponse });

    const response = await doLogin(mockParams);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}/is-it-safe/auth/dashboard/login`,
      mockParams,
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the login request fails', async () => {
    const mockParams: LoginParams = {
      username: 'test@example.com',
      password: 'password',
    };

    requestMock.mockRejectedValueOnce(new Error('Login failed'));

    await expect(doLogin(mockParams)).rejects.toThrow('Login failed');
  });
});
