import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UserSearch from '../components/UserSearch/UserSearch';

export default function Home() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Github Language Diagram</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <UserSearch />
        </main>
      </div>
    );
}
