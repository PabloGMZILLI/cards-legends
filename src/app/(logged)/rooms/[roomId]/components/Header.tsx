
import { RoomStep } from '@/types/RoomTypes';
import styles from './Header.module.css';

interface HeaderProps {
  roomName: string;
  step: RoomStep;
  status: string;
}

const stepLabels: Record<RoomStep, string> = {
  lobby: 'Lobby',
  selectTeam: 'Seleção de Time',
  selectPlayer: 'Seleção de Jogador',
  voting: 'Votação',
  summary: 'Resumo',
};

export default function Header({ roomName, step, status }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.roomName}>{roomName}</h1>
        <p className={styles.step}>Etapa: {stepLabels[step]}</p>
      </div>
      <div className={styles.status}>{status}</div>
    </header>
  );
}
