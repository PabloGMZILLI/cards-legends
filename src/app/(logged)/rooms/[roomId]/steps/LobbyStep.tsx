'use client';

import { LobbyStepProps, RoomKeys } from '@/types/RoomTypes';
import styles from '../styles/LobbyStep.module.css';

import { Icon } from '@/components';
import PlayerRoomCard from '../components/PlayerRoomCard';
import { User } from 'firebase/auth';

export default function LobbyStep({
  room,
  currentUserId,
  onUpdateRoom,
  nextStep,
}: LobbyStepProps) {
  const isLeader = room.leaderId === currentUserId;

  const handleKickPlayer = (id: string, type: RoomKeys) => {
    const users = room[type] as User[];

    const filtered = users.filter(user => user.uid !== id);
    onUpdateRoom({ ...room, [type]: filtered });
  };

  const handleTransferLeadership = (playerId: string) => {
    onUpdateRoom({ ...room, leaderId: playerId });
  };

  const handleSwitchToParticipant = () => {
    const updatedSpecs = room.specs.filter(s => s.uid !== currentUserId);
    const newPlayer = room.specs.find(s => s.uid === currentUserId);

    if (newPlayer) {
      onUpdateRoom({
        ...room,
        specs: updatedSpecs,
        users: [...room.users, newPlayer],
      });
    }
  };

  const handleSwitchToSpec = () => {
    const updatedPlayers = room.users.filter(p => p.uid !== currentUserId);
    const newSpec = room.users.find(p => p.uid === currentUserId);

    if (newSpec) {
      onUpdateRoom({
        ...room,
        users: updatedPlayers,
        specs: [...room.specs, newSpec],
      });
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.sectionTitle}>Avaliadores</h2>
        <div className={styles.grid}>
          {room.users.map((p) => {
            const isTheLeader = p.uid === room.leaderId;
            const isMe = p.uid === currentUserId;

            return (
              p.uid && p.displayName && <PlayerRoomCard
                key={p.uid}
                id={p.uid}
                name={p.displayName}
                type="participant"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(p.uid as string, 'users')}
                onTransferLeadership={() => handleTransferLeadership(p.uid as string)}
                loggedUserIsLeader={isLeader}
              />
            );
          })}
          <div className={styles.switchCard} onClick={handleSwitchToParticipant}>
            <Icon name="arrowRight" size={20} />
          </div>
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Espectadores</h2>
        <div className={styles.grid}>
          {room.specs.map((s) => {
            const isMe = s.uid === currentUserId;
            const isTheLeader = s.uid === room.leaderId;

            return (
              s.uid && s.displayName && <PlayerRoomCard
                key={s.uid}
                id={s.uid}
                name={s.displayName}
                type="spec"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(s.uid as string, 'specs')}
                onTransferLeadership={() => handleTransferLeadership(s.uid as string)}
                loggedUserIsLeader={isLeader}
              />
            );
          })}
          <div className={styles.switchCard} onClick={handleSwitchToSpec}>
            <Icon name="arrowRight" size={20} />
          </div>
        </div>
      </section>
      <section className={styles.actions}>
        {isLeader && (
          <div className={styles.buttonGroup}>
            <button className={styles.dangerButton}>Fechar Sala</button>
            <button
              onClick={nextStep}
              className={styles.primaryButton}
            >
              Iniciar
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
