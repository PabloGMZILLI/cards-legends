'use client';

import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Bem-vindo de volta Logged!</h1>
      {/* Add logged-in specific content here */}
    </main>
  );
}
