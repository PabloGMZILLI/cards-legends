import Sidebar from '@/components/Sidebar/Sidebar';

import styles from './layout.module.css';

export default function LoggedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className={styles.wrapper}>
        {children}
      </main>
    </div>
  );
}
