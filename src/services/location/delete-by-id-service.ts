import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const deleteLocationById = async (
  token: string | null,
  id: number | undefined
) => {
  const deleteStatus: boolean | string = await axios
    .delete(`${baseUrl}/is-it-safe/location/delete/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
      if (res.status === 204) {
        return true;
      } else {
        return res.data.message;
      }
    })
    .catch((err: AxiosError) => {
      if (err.status === 400) {
        return false;
      } else {
        throw new Error(err.message);
      }
    });

  return deleteStatus;
};
