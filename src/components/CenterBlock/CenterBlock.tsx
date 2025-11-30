import styles from './centerBlock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import classNames from 'classnames';
import Track from '../Track/Track';
import { TrackTypes } from '../../sharedTypes/shared.Types';

interface CenterBLockProps {
  tracks: TrackTypes[];
  title: string;
  errorRes: string | null;
  isLoading: boolean;
}

export default function CenterBlock({
  tracks,
  title,
  errorRes,
  isLoading,
}: CenterBLockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {errorRes ? (
            errorRes
          ) : isLoading ? (
            <span style={{ color: 'white' }}>Загрузка...</span>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playList={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
