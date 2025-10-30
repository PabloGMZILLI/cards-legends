
import { RoomStatus, RoomStep } from '@/types/RoomTypes';
import styles from './Header.module.css';

interface HeaderProps {
  roomName: string;
  step: RoomStep;
  status: RoomStatus;
}

const stepLabels: Record<RoomStep, string> = {
  lobby: 'Lobby',
  selectTeam: 'Seleção de Time',
  selectPlayer: 'Seleção de Jogador',
  voting: 'Votação',
  summary: 'Resumo',
};

const getStatusLabel = (status: RoomStatus) => {
  switch (status) {
    case 'waiting':
      return 'Aguardando avaliadores...';
    case 'inProgress':
      return 'Em andamento';
    case 'finished':
      return 'Finalizado';
    default:
      return status;
  }
}

export default function Header({ roomName, step, status }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.roomName}>{roomName}</h1>
        <p className={styles.step}>Etapa: {stepLabels[step]}</p>
      </div>
      <div className={styles.status}>{getStatusLabel(status)}</div>
    </header>
  );
}
