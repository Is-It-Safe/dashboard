import axios from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export const locationRequest = async (token: string | null) => {
  const response = await axios.get(`${baseUrl}/is-it-safe/dashboard/location`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

export const locationPendingValidationRequest = async (
  token: string | null
) => {
  const response = await axios.get(
    `${baseUrl}/is-it-safe/dashboard/location/validate/locations`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  return response.data;
};
