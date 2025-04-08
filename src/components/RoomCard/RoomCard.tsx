'use client';

import { useRouter } from 'next/navigation';
import styles from './RoomCard.module.css';
import { RoomCardProps } from './types';

export default function RoomCard({ room }: { room: RoomCardProps }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/rooms/${room.id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleCardClick();
      }}
    >
      <h2 className={styles.title}>{room.name}</h2>
      <p className={styles.detail}>Host: {room.host}</p>
      <p className={styles.detail}>Jogadores: {room.players}</p>
      <p className={styles.detail}>Max Jogadores: {room.maxPlayers}</p>
    </div>
  );
}
