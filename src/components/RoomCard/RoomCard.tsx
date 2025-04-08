import styles from './RoomCard.module.css';
import { RoomCardProps } from './types';

export default function RoomCard({ room }: { room: RoomCardProps }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{room.name}</h2>
      <p className={styles.detail}>Host: {room.host}</p>
      <p className={styles.detail}>Jogadores: {room.players}</p>
      <p className={styles.detail}>Max Jogadores: {room.maxPlayers}</p>
    </div>
  );
}
