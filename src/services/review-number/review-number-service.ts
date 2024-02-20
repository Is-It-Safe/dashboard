import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const reviewNumberRequest = async (token: string | null) => {
  const response = await axios
    .get(`${baseUrl}/is-it-safe/dashboard/review`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return response;
};
