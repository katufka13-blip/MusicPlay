'use client';

import './page.css';
import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import { useAppSelector } from '../../../store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, filteredTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <>
      <CenterBlock
        title={'Треки'}
        tracks={filteredTracks}
        errorRes={fetchError}
        isLoading={fetchIsLoading}
      />
    </>
  );
}
