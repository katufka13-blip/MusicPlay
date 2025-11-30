import axios from 'axios';
import { BASE_URL } from '../constants';
import { CategoryType, TrackTypes } from '../../sharedTypes/shared.Types';

export const getTracks = async (): Promise<TrackTypes[]> => {
  const res = await axios.get(BASE_URL + '/catalog/track/all/');
  return res.data.data;
};

export const getTracksId = async (id: string): Promise<CategoryType> => {
  const res = await axios.get(BASE_URL + `/catalog/selection/${id}/`, {});
  return res.data.data;
};

export const getFavoriteTracks = async (
  access: string,
): Promise<TrackTypes[]> => {
  const res = await axios.get(BASE_URL + `/catalog/track/favorite/all/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return res.data.data;
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
