'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { clearSessionCookie } from '@/utils/cookies';

const menuItems = [
  { label: 'Salas', path: '/rooms' },
  { label: 'Estatísticas', path: '/stats' },
  { label: 'Perfil', path: '/profile' },
  { label: 'Configurações', path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await clearSessionCookie();
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          {menuItems.map(({ label, path }) => (
            <li key={path} className={pathname.startsWith(path) ? styles.active : ''}>
              <Link href={path}>{label}</Link>
            </li>
          ))}
          <li className={styles.logout}>
            <button onClick={handleLogout}>Deslogar</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
