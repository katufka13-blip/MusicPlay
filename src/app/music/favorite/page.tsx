'use client';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import { getFavoriteTracks } from '../../../services/tracks/tracksApi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addLikedTracks } from '../../../store/features/trackSlice';
import { AxiosError } from 'axios';
import { TrackTypes } from '../../../sharedTypes/shared.Types';
import { access } from 'fs';
import { RootState } from '@reduxjs/toolkit/query';

export default function FavoritePage() {
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <>
      <CenterBlock
        tracks={favoriteTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Мои треки'}
      />
    </>
  );
}
