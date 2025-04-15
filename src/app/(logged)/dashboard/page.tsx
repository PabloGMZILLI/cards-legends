'use client';

import styles from './dashboard.module.css';
import { Spinner } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Bem-vindo(a) de volta, {user?.name}!</h1>
      {/* Add logged-in specific content here */}
    </main>
  );
}
