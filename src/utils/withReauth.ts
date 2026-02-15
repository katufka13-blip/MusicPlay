import { AxiosError } from 'axios';
import { refreshToken } from '../services/auth/authApi';
import { setToken } from '../store/features/authSlice';
import { AppDispatch } from '../store/store';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,

  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction("");
  } catch (error) {
    const axiosError = error as AxiosError;

    // Если ошибка 401, обновляем токен и повторяем запрос
    if (axiosError.response?.status === 401) {
      try {
        const newToken = await refreshToken(refresh); // Обновляем токен
        dispatch(setToken(newToken.access));
        // Повторяем исходный запрос
        return await apiFunction(newToken.access);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    throw error;
  }
};
