import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const updateLocation = async (
  token: string | null,
  formData: FormData,
  id: number | undefined
) => {
  const response = await axios
    .put(`${baseUrl}/is-it-safe/location/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
  console.log(response);
  return response;
};
