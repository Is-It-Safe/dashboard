import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const saveLocation = async (token: string | null, data: FormData) => {
  const response = await axios
    .post(`${baseUrl}/is-it-safe/location/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
  return response;
};
