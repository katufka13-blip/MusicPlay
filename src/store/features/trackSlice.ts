import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import { applyFilters, applySorting } from '../../utils/applyFilters';

export type initialStateType = {
  currentTrack: TrackTypes | null;
  isPlay: boolean;
  playList: TrackTypes[];
  isShuffle: boolean;
  shaffledPlayList: TrackTypes[];
  allTracks: TrackTypes[];
  favoriteTracks: TrackTypes[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  pageFavorite: TrackTypes[];
  filters: {
    authors: string[];
    years: string;
    genres: string[];
  };
  filteredTracks: TrackTypes[];
  searchInput: string;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  isShuffle: false,
  shaffledPlayList: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  pageFavorite: [],
  filters: {
    authors: [],
    years: 'По умолчанию',
    genres: [],
  },
  filteredTracks: [],
  searchInput: '',
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackTypes>) => {
      state.currentTrack = action.payload;
    },

    setCurrentTrackList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.playList = action.payload;
      state.shaffledPlayList = [...state.playList].sort(
        () => Math.random() - 0.5,
      );
    },

    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlayList
        : state.playList;
      const curInd = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curInd === -1 || curInd === state.playList.length - 1) return;
      const nextInd = curInd + 1;
      state.currentTrack = state.playList[nextInd];
    },

    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlayList
        : state.playList;
      const curInd = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curInd <= 0) return;
      const prevInd = curInd - 1;
      state.currentTrack = state.playList[prevInd];
    },

    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },

    setAllTracks: (state, action: PayloadAction<TrackTypes[]>) => {
      state.allTracks = action.payload;
      state.filteredTracks = applyFilters(state);
    },

    setFavoriteTracks: (state, action: PayloadAction<TrackTypes[]>) => {
      state.favoriteTracks = action.payload;
    },

    addLikedTracks: (state, action: PayloadAction<TrackTypes>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },

    removeLikedTracks: (state, action: PayloadAction<TrackTypes>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },

    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },

    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },

    setFilterAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (el) => el !== author,
        );
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }
      state.filteredTracks = applyFilters(state);
    },

    setFilterYear: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filteredTracks = applySorting(
        state.filteredTracks,
        state.filters.years,
      );
    },

    setFilterGenre: (state, action: PayloadAction<string>) => {
      const genres = action.payload;

      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter(
          (el) => el !== genres,
        );
      } else {
        state.filters.genres.push(genres);
      }

      state.filteredTracks = applyFilters(state);
    },

    resetFilters: (state) => {
      state.filters = {
        authors: [],
        years: 'По умолчанию',
        genres: [],
      };
      state.searchInput = '';
      state.filteredTracks = applyFilters(state);
    },

    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
      state.filteredTracks = applyFilters(state);
    },

    clearSearchInput: (state) => {
      state.searchInput = '';
      state.filteredTracks = applyFilters(state);
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentTrackList,
  setNextTrack,
  toggleShuffle,
  setPrevTrack,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthor,
  setFilterGenre,
  setFilterYear,
  resetFilters,
  setSearchInput,
  clearSearchInput,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
