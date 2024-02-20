import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export interface IReviewListItemResponse {
  id: number;
  profilePhoto: string;
  author: string;
  review: string;
  createdAt: string;
  myGrade: number;
}

export interface IReviewListResponse {
  content: IReviewListItemResponse[];
}

export const getAllReviews = async (token: string | null) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    params: {
      size: 2000,
    },
  };
  const reviewListData: IReviewListResponse = await axios
    .get(`${baseUrl}/is-it-safe/review/paged-search`, config)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return reviewListData;
};
