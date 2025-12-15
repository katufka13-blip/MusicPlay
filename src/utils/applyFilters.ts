import { TrackTypes } from '../sharedTypes/shared.Types';
import { initialStateType } from '../store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackTypes[] => {
   let filtered = state.allTracks; 

  if (state.filters.authors.length) {
    filtered = filtered.filter((track) =>
      state.filters.authors.includes(track.author)
    );
  }

  if (state.filters.genres.length) {
    filtered = filtered.filter((track) => {
      return state.filters.genres.some((filterGenre) =>
        track.genre?.includes(filterGenre)
      );
    });
  }

  if (state.searchInput) {
    const lowerCaseSearchInput = state.searchInput.toLowerCase();
    filtered = filtered.filter(
      (track) =>
        track.name.toLowerCase().includes(lowerCaseSearchInput) ||
        track.author.toLowerCase().includes(lowerCaseSearchInput) ||
        track.album.toLowerCase().includes(lowerCaseSearchInput),
    );
  }

  return filtered;
};

export const applySorting = (tracks: TrackTypes[], sortBy: string): TrackTypes[] => {
    let sorted = [...tracks];

    switch (sortBy) {
        case 'Сначала новые':
            sorted.sort((a, b) => {
                if (a.release_date > b.release_date) return -1;
                if (a.release_date < b.release_date) return 1;
                return 0;
            });
            break;
        case 'Сначала старые':
            sorted.sort((a, b) => {
                if (a.release_date > b.release_date) return 1;
                if (a.release_date < b.release_date) return -1;
                return 0;
            });
            break;
        case 'По умолчанию':
        default:

            break;
    }
    return sorted;
};