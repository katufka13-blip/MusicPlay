'use client';

import Link from 'next/link';
import styles from './track.module.css';
import classNames from 'classnames';
import { formatTime } from '../../utils/helpers';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  setCurrentTrack,
  setCurrentTrackList,
  setIsPlay,
} from '../../store/features/trackSlice';
import { useLikeTrack } from '../../hooks/useLikeTracks';

interface trackTypeProp {
  track: TrackTypes;
  playList: TrackTypes[];
}

export default function Track({ track, playList }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentTrackId = useAppSelector(
    (state) => state.tracks.currentTrack?._id,
  );
  const { toggleLike, isLike, errorMsg } = useLikeTrack(track);
  const user = useAppSelector((state) => state.auth.user);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentTrackList(playList));
  };

  const shouldShowPlayingDot = currentTrack && currentTrackId === track._id;

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg
              className={classNames(styles.track__titleSvg, {
                [isPlay ? styles.playing_dot : styles.static_dot]:
                  shouldShowPlayingDot,
              })}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time} onClick={toggleLike}>
          {user ? (
            <svg
              className={classNames(`${styles.track__timeSvg},
                ${isLike ? styles.trackPlay__liked : styles.track__timeSvg}`)}
            >
              <use
                xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
              ></use>
            </svg>
          ) : (
            <svg className={styles.track__timeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
            </svg>
          )}
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
          <div className={styles.errorContainer}>{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}
