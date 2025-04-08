'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import placeholderImage from '@/assets/placeholder.jpg';
import { LoremSection, WelcomeMessage } from '@/components';

import styles from './GuestHome.module.css';

export default function GuestHome() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src={placeholderImage} alt="Placeholder" width={400} height={300} className={styles.image} />
      <WelcomeMessage />
      <LoremSection />
      <button className={styles.button} onClick={() => router.push('/login')}>
        Entrar
      </button>
    </div>
  );
}
