'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CenterBlock from '../../../../components/CenterBlock/CenterBlock';
import { getTracksId } from '../../../../services/tracks/tracksApi';
import { TrackTypes } from '../../../../sharedTypes/shared.Types';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../../../store/store';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!fetchIsLoading && allTracks.length) {
      getTracksId(id)
        .then((res) => {
          setTitle(res.name);
          const tracksItems = res.items;
          const filterTracks = allTracks.filter((el) =>
            tracksItems.includes(el._id),
          );
          setTracks(filterTracks);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            if (err.response) {
              console.log(err.response.data);
              setError(err.response.data.message);
            } else if (err.request) {
              setError('Что-то с интернетом');
            } else {
              console.log('error:', error);
              setError('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fetchIsLoading, error, id]);
  return (
    <>
      <CenterBlock
        title={title}
        tracks={tracks}
        errorRes={errorRes || fetchError}
        isLoading={isLoading}
      />
    </>
  );
}
