import { formatTime, getUniqueValueByKey } from "./helpers";

import { TrackTypes } from '../sharedTypes/shared.Types';

describe('formatTime />', () => {
  it('Добавление 0, если секунд < 10', () => {
    expect(formatTime(61)).toBe("1 : 01") 
  });

});



const mockTracks: TrackTypes[] = [
  {
    _id: 1, name: 'T1', author: 'A', release_date: '2020-01-01', genre: ['Rock', 'Pop'], duration_in_seconds: 100, album: 'A1', logo: null, track_file: '', stared_user: [],
  },
  {
    _id: 2, name: 'T2', author: 'B', release_date: '2021-01-01', genre: ['Pop', 'Jazz'], duration_in_seconds: 100, album: 'A2', logo: null, track_file: '', stared_user: [],
  },
  {
    _id: 3, name: 'T3', author: 'A', release_date: '2022-01-01', genre: ['Rock'], duration_in_seconds: 100, album: 'A3', logo: null, track_file: '', stared_user: [],
  },
  {
    _id: 4, name: 'T4', author: 'C', release_date: '2023-01-01', genre: [], duration_in_seconds: 100, album: 'A4', logo: null, track_file: '', stared_user: [],
  },
];

describe('getUniqueValueByKey', () => {
  it('should return unique values when key is an array (genre)', () => {
    const uniqueGenres = getUniqueValueByKey(mockTracks, 'genre');

    expect(uniqueGenres).toHaveLength(3);
    expect(uniqueGenres).toContain('Rock');
    expect(uniqueGenres).toContain('Pop');
    expect(uniqueGenres).toContain('Jazz');
  });

  it('should return unique string values when key is a string (author)', () => {
    const uniqueAuthors = getUniqueValueByKey(mockTracks, 'author');

    expect(uniqueAuthors).toHaveLength(3);
    expect(uniqueAuthors).toEqual(expect.arrayContaining(['A', 'B', 'C']));
  });

  it('should handle empty arrays and return empty result if input is empty', () => {
    const uniqueGenres = getUniqueValueByKey([], 'genre');
    expect(uniqueGenres).toHaveLength(0);
  });
});