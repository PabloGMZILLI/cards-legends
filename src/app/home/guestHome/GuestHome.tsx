'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import placeholderImage from '@/assets/placeholder.jpg';

import styles from './GuestHome.module.css';
import { Button } from '@/components';

export default function GuestHome() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src={placeholderImage} alt="Placeholder" width={400} height={300} className={styles.image} />
      
      <h1 className="text-3xl font-bold text-center mb-4">Bem-vindo ao Cards Legends!</h1>

      <p className="text-center text-lg mb-6 max-w-xl mx-auto">
        O Cards Legends é uma plataforma criada para avaliar jogadores durante eventos e campeonatos.
        Monte salas de avaliação, participe como espectador ou avaliador, e veja os rankings das rodadas em tempo real!
        Torne cada partida ainda mais interativa e divertida.
      </p>

      <Button onClick={() => router.push('/login')}>
        Entrar
      </Button>
    </div>
  );
}
