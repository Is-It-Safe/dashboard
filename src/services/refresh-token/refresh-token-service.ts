import axios from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export interface RefreshTokenResponse {
  refresh_token: string;
  token_jwt: string;
  token_type: string;
  user: {
    email: string;
    id: number;
    name: string;
    role: string;
  };
}

export async function getRefreshToken(
  token: string | null
): Promise<RefreshTokenResponse> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post<RefreshTokenResponse>(
    `${baseUrl}/is-it-safe/auth/dashboard/refreshtoken`,
    {},
    { headers }
  );

  return response.data;
}
