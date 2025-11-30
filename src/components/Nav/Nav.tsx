'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function handleLogout(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
    e.preventDefault();
    dispatch(logout());
    router.push('/auth/signIn');
  }

  return (
    <nav className={styles.main__nav}>
      <Link href="/music/main">
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </div>
      </Link>
      <div onClick={toggleModal} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isModalOpen ? (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {user && (
              <li className={styles.menu__item}>
                <Link href="/music/favorite" className={styles.menu__link}>
                  Мои треки
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.menu__item}>
                <p onClick={handleLogout} className={styles.menu__link}>
                  Выйти
                </p>
              </li>
            )}
            {!user && (
              <li className={styles.menu__item}>
                <Link href="/auth/signIn" className={styles.menu__link}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
