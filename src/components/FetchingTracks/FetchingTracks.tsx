'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '../../store/features/trackSlice';
import { getTracks } from '../../services/tracks/tracksApi';
import { AxiosError } from 'axios';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            if (err.response) {
              console.log(err.response.data);
              setFetchError(err.response.data.message);
            } else if (err.request) {
              setFetchError('Что-то с интернетом');
            } else {
              console.log('error:', err);
              setFetchError('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);
  return <></>;
}
