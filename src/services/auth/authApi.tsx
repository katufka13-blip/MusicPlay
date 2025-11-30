import axios from 'axios';
import { BASE_URL } from '../constants';

interface authUserForm {
  email: string;
  password: string;
}

interface authUserReturn {
  email: string;
  password: string;
  _id: number;
}

interface refreshTokenType {
  refresh: string;
}

interface accessTokenType {
  access: string;
}

type tokenType = accessTokenType & refreshTokenType;

export const authUser = (data: authUserForm): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data);
};

export const regUser = ({
  email,
  password,
}: authUserForm): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', {
    email,
    password,
    username: email,
  });
};

export const getToken = async ({
  email,
  password,
}: authUserForm): Promise<tokenType> => {
  const res = await axios.post(BASE_URL + '/user/token/', { email, password });
  return res.data;
};

export const refreshToken = async (refresh: string): Promise<tokenType> => {
  const res = await axios.post(BASE_URL + '/user/token/refresh/', { refresh });
  return res.data;
};
