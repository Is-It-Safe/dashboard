import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export interface ILocationListItemResponse {
  id: number;
  name: string;
  endereco: string;
  locationType: string;
  imgUrl: string | null;
  pendingValidation: boolean;
  isActive: boolean;
}

export interface ILocationListResponse {
  content: ILocationListItemResponse[];
}

export const getAllLocations = async (token: string | null) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    params: {
      size: 2000,
    },
  };
  const locationListData: ILocationListResponse = await axios
    .get(`${baseUrl}/is-it-safe/location/dashboard/find-all`, config)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return locationListData;
};
