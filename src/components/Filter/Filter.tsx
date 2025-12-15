'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import { getUniqueValueByKey } from '../../utils/helpers';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/store';
import FilterItem from '../FilterItem/FilterItem';
import {
  resetFilters,
  setFilterAuthor,
  setFilterGenre,
  setFilterYear,
} from '../../store/features/trackSlice';

interface FilterProps {
  tracks: TrackTypes[];
}

export default function Filter({ tracks }: FilterProps) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tracks);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  const closeAllModals = () => {
    setIsAuthorModalOpen(false);
    setIsYearModalOpen(false);
    setIsGenreModalOpen(false);
  };

  const authors = getUniqueValueByKey(tracks, 'author');
  const genres = getUniqueValueByKey(tracks, 'genre');

  const yearFilterOptions = [
    { label: 'По умолчанию', value: 'По умолчанию' },
    { label: 'Сначала новые', value: 'Сначала новые' },
    { label: 'Сначала старые', value: 'Сначала старые' },
  ];

  const handleSelectAuthor = (author: string) => {
    console.log(author);
    dispatch(setFilterAuthor(author));
  };

  const handleSelectYear = (year: string) => {
    dispatch(setFilterYear(year));
    setIsYearModalOpen(false);
  };

  const handleSelectGenre = (genre: string) => {
    dispatch(setFilterGenre(genre));
    setIsGenreModalOpen(false);
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
    closeAllModals();
  };

  const getFilterButtonInfo = (
    type: 'author' | 'release_date' | 'genre',
  ): { text: string; count: number; isActive: boolean } => {
    let count = 0;
    let isActive = false;
    let buttonText = '';

    switch (type) {
      case 'author':
        buttonText = 'исполнителю';
        count = filters.authors.length;
        isActive = count > 0;
        break;
      case 'release_date':
        buttonText = 'году выпуска';
        isActive = filters.years !== 'По умолчанию';
        break;
      case 'genre':
        buttonText = 'жанру';
        count = filters.genres.length;
        isActive = count > 0;
        break;
      default:
        break;
    }
    return { text: buttonText, count, isActive };
  };

  const authorFilterInfo = getFilterButtonInfo('author');
  const yearFilterInfo = getFilterButtonInfo('release_date');
  const genreFilterInfo = getFilterButtonInfo('genre');

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isAuthorModalOpen || filters.authors.length,
          [styles.filterActive]: authorFilterInfo.isActive,
        })}
        onClick={() => {
          if (!isAuthorModalOpen) {
            closeAllModals();
            setIsAuthorModalOpen(true);
          } else {
            setIsAuthorModalOpen(false);
          }
        }}
      >
        {authorFilterInfo.text}
        {authorFilterInfo.count > 0 && (
          <span className={styles.filterCount}>{authorFilterInfo.count}</span>
        )}
        {isAuthorModalOpen && (
          <FilterItem
            items={authors}
            onSelectItem={(selectedAuthor) => {
              handleSelectAuthor(selectedAuthor);
            }}
            activeItem={filters.authors}
          />
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isYearModalOpen || filters.years !== 'По умолчанию',
          [styles.filterActive]: yearFilterInfo.isActive,
        })}
        onClick={() => {
          if (!isYearModalOpen) {
            closeAllModals();
            setIsYearModalOpen(true);
          } else {
            setIsYearModalOpen(false);
          }
        }}
      >
        {filters.years !== 'По умолчанию' ? filters.years : yearFilterInfo.text}

        {isYearModalOpen && (
          <FilterItem
            items={yearFilterOptions.map((option) => option.label)}
            onSelectItem={(selectedLabel) => {
              const selectedOption = yearFilterOptions.find(
                (option) => option.label === selectedLabel,
              );
              if (selectedOption) {
                console.log(selectedOption.value);
                handleSelectYear(selectedOption.value);
                closeAllModals();
              }
            }}
            activeItem={filters.years}
          />
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isGenreModalOpen || filters.genres.length,
          [styles.filterActive]: genreFilterInfo.isActive,
        })}
        onClick={() => {
          if (!isGenreModalOpen) {
            closeAllModals();
            setIsGenreModalOpen(true);
          } else {
            setIsGenreModalOpen(false);
          }
        }}
      >
        {genreFilterInfo.text}
        {genreFilterInfo.count > 0 && (
          <span className={styles.filterCountG}>{genreFilterInfo.count}</span>
        )}
        {isGenreModalOpen && (
          <FilterItem
            items={[...genres]}
            onSelectItem={(selectedGenre) => {
              handleSelectGenre(selectedGenre);
            }}
            activeItem={filters.genres}
          />
        )}
      </div>

      <div className={styles.filter__button} onClick={handleResetFilters}>
        x
      </div>
    </div>
  );
}
