import { TrackTypes } from '../sharedTypes/shared.Types';
import { initialStateType } from '../store/features/trackSlice';

export const applyFilters = (state: initialStateType, sortBy: string): TrackTypes[] => {
   let filtered = state.allTracks; 

  if (state.filters.authors.length > 0) {
    filtered = filtered.filter((track) =>
      state.filters.authors.includes(track.author)
    );
  }

  if (state.filters.genres.length > 0) {
    filtered = filtered.filter((track) => {
      // Assuming track.genre is a string. If it's an array, adjust accordingly.
      // Example for string: if track.genre is "Pop Rock", and filter is "Pop"
      // If you need exact match, use track.genre === el
      return state.filters.genres.some((filterGenre) =>
        track.genre.includes(filterGenre)
      );
    });
  }

  // Filter by Year (assuming 'years' filter is a specific year string like '2023')
  // You might want to adjust this based on how you store and filter years.
  if (state.filters.years !== 'По умолчанию') {
 switch (sortBy) {
        case 'Сначала новые':
            filtered.sort((a, b) => {
                if (a.release_date > b.release_date) return -1;
                if (a.release_date < b.release_date) return 1;
                return 0;
            });
            break;
        case 'Сначала старые':
            filtered.sort((a, b) => {
                if (a.release_date > b.release_date) return 1;
                if (a.release_date < b.release_date) return -1;
                return 0;
            });
            break;
        case 'По умолчанию':
        default:

            break;
  }}
 
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

