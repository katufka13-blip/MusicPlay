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
// return (
//     <div className={styles.centerblock__filter}>
//       <div className={styles.filter__title}>Искать по:</div>

//       {/* Фильтр по исполнителю */}
//       <div
//         className={classNames(styles.filter__button, {
//           [styles.active]: isAuthorModalOpen,
//         })}
//         onClick={() => {
//           if (!isAuthorModalOpen) {
//             closeAllModals();
//             setIsAuthorModalOpen(true);
//           } else {
//             setIsAuthorModalOpen(false);
//           }
//         }}
//       >
//         {getButtonText('author')}
//         {isAuthorModalOpen && (
//           <FilterItem
//             items={authors} //  
//             onSelectItem={handleSelectAuthor}
//             // styles={{}} // Пропсы для стилизации FilterItem
//           />
//         )}
//       </div>

//       {/* Фильтр по году выпуска */}
//       <div
//         className={classNames(styles.filter__button, {
//           [styles.active]: isYearModalOpen,
//         })}
//         onClick={() => {
//           if (!isYearModalOpen) {
//             closeAllModals();
//             setIsYearModalOpen(true);
//           } else {
//             setIsYearModalOpen(false);
//           }
//         }}
//       >
//         {getButtonText('year')}
//         {isYearModalOpen && (
//           <FilterItem
//             items={yearItemsForFilter} // Массив строк
//             onSelectItem={handleSelectYear} // Ожидает строку
//           />
//         )}
//       </div>

//       {/* Фильтр по жанру */}
//       <div
//         className={classNames(styles.filter__button, {
//           [styles.active]: isGenreModalOpen,
//         })}
//         onClick={() => {
//           if (!isGenreModalOpen) {
//             closeAllModals();
//             setIsGenreModalOpen(true);
//           } else {
//             setIsGenreModalOpen(false);
//           }
//         }}
//       >
//         {getButtonText('genre')}
//         {isGenreModalOpen && (
//           <FilterItem
//             items={genres} // Массив строк
//             onSelectItem={handleSelectGenre} // Ожидает строку
//           />
//         )}
//       </div>

//       {/* Кнопка сброса фильтров */}
//       {(selectedAuthor || selectedYear || selectedGenre) && ( // Показываем кнопку, только если есть активные фильтры
//         <button onClick={handleResetFilters} className={styles.resetFiltersButton}>
//           Сбросить фильтры
//         </button>
//       )}
//     </div>
//   );
// }
