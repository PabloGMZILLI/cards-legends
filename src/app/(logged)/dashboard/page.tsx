'use client';

import { useAuth } from '@/context/AuthContext';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();

  console.log('user: ', user)
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Bem-vindo(a) de volta {user?.displayName}!</h1>
      {/* Add logged-in specific content here */}
    </main>
  );
}
