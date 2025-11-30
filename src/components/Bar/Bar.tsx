'use client';

import Link from 'next/link';
import styles from './Bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '../../store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { getTimePanel } from '../../utils/helpers';
import { useLikeTrack } from '../../hooks/useLikeTracks';

export default function Bar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const { toggleLike, isLike } = useLikeTrack(currentTrack);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else if (audioRef.current && !currentTrack) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      dispatch(setIsPlay(false));
    }
  }, [currentTrack, isPlay, isLoop, isShuffle, dispatch]);

  const togglePlay = () => {
    if (currentTrack) {
      dispatch(setIsPlay(!isPlay));
    }
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (audioRef.current) {
      setCurrentTime(e.currentTarget.currentTime);
    }
  };
  const onVolumeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (audioRef.current) {
      setVolume(e.currentTarget.volume);
    }
  };
  const onLoadMetaData = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const ChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const showTrackTime = () => {
    return getTimePanel(currentTime, currentTrack?.duration_in_seconds);
  };

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={onVolumeUpdate}
        onLoadedMetadata={onLoadMetaData}
        onEnded={onNextTrack}
      ></audio>
      <div className={styles.bar__TimeTrack}>{showTrackTime()}</div>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          value={currentTime}
          step={0.01}
          onChange={onChangeProgress}
          readOnly={!isLoadedTrack}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.player__btnPlay, styles.btn)}
              >
                {isPlay ? (
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                ) : (
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                )}
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={toggleLoop}
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles._active]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onToggleShuffle}
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                <svg
                  className={classNames(styles.player__btnShuffleSvg, {
                    [styles._active]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack?.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                {user ? (
                  <div
                    className={classNames(
                      styles.player__btnShuffle,
                      styles.btnIcon,
                    )}
                    onClick={toggleLike}
                  >
                    <svg
                      className={classNames(`${styles.trackPlay__likeSvg},
                ${isLike ? styles.trackPlay__liked : styles.trackPlay__likeSvg}`)}
                    >
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
                      ></use>
                    </svg>
                  </div>
                ) : (
                  <div
                    className={classNames(
                      styles.trackPlay__dislike,
                      styles.btnIcon,
                    )}
                  >
                    <svg className={styles.trackPlay__dislikeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                    </svg>
                  </div>
                )}
                {/* {isLike && <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>}
               { !isLike && <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>} */}
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <AudioPlayer value={volume} onChange={ChangeVolume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
