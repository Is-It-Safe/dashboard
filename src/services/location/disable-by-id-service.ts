/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const disableLocationById = async (
  token: string | null,
  id: number | undefined
) => {
  const disableStatus = await axios
    .put(
      `${baseUrl}/is-it-safe/location/update/${id}/deactivate`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => console.log(res.data))
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
  return disableStatus;
};
