'use client';

import { ReactNode } from 'react';
import styles from './layout.module.css';
import Bar from '../../components/Bar/Bar';
import Nav from '../../components/Nav/Nav';
import SideBar from '../../components/SideBar/SideBar';
import FetchingTracks from '../../components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '../../hooks/useInitAuth';

interface LayoutAuthProps {
  children: ReactNode;
}

export default function LayoutMusic({ children }: LayoutAuthProps) {
  useInitAuth();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          {children}
          <SideBar />
        </main>
        <Bar />
        <footer></footer>
      </div>
    </div>
  );
}
