'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearSearchInput, setSearchInput } from '../../store/features/trackSlice';


export default function Search() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.tracks.searchInput);

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchInput());
    };
  }, [dispatch]);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={onSearchInput}
        value={searchInput}
      />
    </div>
  );
}
