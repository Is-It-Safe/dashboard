import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';
export type Location = {
  id: number;
  name: string;
  endereco: string;
  type: string;
  imgUrl: string | null;
  cep: string;
  latitude: string | null;
  longitude: string | null;
  totalReviews: number;
  isActive: boolean;
  pendingValidation: boolean;
  averageGrade: number;
  reviews: number;
};

export const getLocationById = async (
  token: string | null,
  id: number | undefined
) => {
  const locationData: Location = await axios
    .get(`${baseUrl}/is-it-safe/location/dashboard/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return locationData;
};
