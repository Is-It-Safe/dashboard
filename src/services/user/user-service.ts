import axios from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const userRequest = async (token: string | null) => {
  const response = await axios.get(`${baseUrl}/is-it-safe/dashboard/user`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};
