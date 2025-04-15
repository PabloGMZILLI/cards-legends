'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import styles from './Sidebar.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  { label: 'Salas', path: '/rooms' },
  { label: 'Estatísticas', path: '/stats' },
  { label: 'Perfil', path: '/profile' },
  {
    label: 'Configurações',
    path: '/settings',
    subItems: [
      { label: 'Regiões', path: '/admin/regions' },
      { label: 'Nacionalidades', path: '/admin/nacionalities' },
      { label: 'Times', path: '/admin/teams' },
      { label: 'Jogadores', path: '/admin/players' },
      { label: 'Rodadas', path: '/admin/rounds' },
      { label: 'Partidas', path: '/admin/matches' },
      { label: 'Campeonatos', path: '/admin/championships' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const handleLogout = async () => {
    await signOut().then(() => {
      router.push('/login');
    })
  };

  const toggleSubmenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          {menuItems.map(({ label, path, subItems }) => {
            const isActive = pathname.startsWith(path);
            const isOpen = openMenus[path] ?? subItems?.some(({ path: subPath }) => pathname.startsWith(subPath));

            return (
              <li key={path} className={isActive ? styles.active : ''}>
                {subItems ? (
                  <div className={styles.dropdownHeader} onClick={() => toggleSubmenu(path)}>
                    <span>{label}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                ) : (
                  <Link href={path}>{label}</Link>
                )}

                {subItems && isOpen && (
                  <ul className={styles.submenu}>
                    {subItems.map(({ label: subLabel, path: subPath }) => (
                      <li
                        key={subPath}
                        className={pathname.startsWith(subPath) ? styles.activeSub : ''}
                      >
                        <Link href={subPath}>{subLabel}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          <li className={styles.logout}>
            <button onClick={handleLogout}>Deslogar</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
