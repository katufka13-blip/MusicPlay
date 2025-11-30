import { useState } from 'react';
import { TrackTypes } from '../sharedTypes/shared.Types';
import { useAppDispatch, useAppSelector } from '../store/store';
import { AxiosError } from 'axios';
import { addLike, removeLike } from '../services/tracks/tracksApi';
import {
  addLikedTracks,
  removeLikedTracks,
} from '../store/features/trackSlice';
import { withReauth } from '../utils/withReauth';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: (e: React.MouseEvent<HTMLElement>) => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackTypes | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!access || !refresh) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || access, track._id),

        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message);
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMsg('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
