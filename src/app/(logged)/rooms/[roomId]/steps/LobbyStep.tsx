'use client';

import { LobbyStepProps, RoomKeys, RoomUser } from '@/types/RoomTypes';
import styles from '../styles/LobbyStep.module.css';

import { Icon } from '@/components';
import PlayerRoomCard from '../components/PlayerRoomCard';

export default function LobbyStep({
  room,
  currentUserId,
  onUpdateRoom,
  handleStartRoom,
}: LobbyStepProps) {
  const isLeader = room.leaderId === currentUserId;

  const handleKickPlayer = (id: string, type: RoomKeys) => {
    const users = room[type] as RoomUser[];

    const filtered = users.filter(user => user.id !== id);
    onUpdateRoom({ ...room, [type]: filtered });
  };

  const handleTransferLeadership = (playerId: string) => {
    onUpdateRoom({ ...room, leaderId: playerId });
  };

  const handleSwitchToParticipant = () => {
    const updatedSpecs = room.specs.filter(s => s.id !== currentUserId);
    const newPlayer = room.specs.find(s => s.id === currentUserId);

    if (newPlayer) {
      onUpdateRoom({
        ...room,
        specs: updatedSpecs,
        players: [...room.players, newPlayer],
      });
    }
  };

  const handleSwitchToSpec = () => {
    const updatedPlayers = room.players.filter(p => p.id !== currentUserId);
    const newSpec = room.players.find(p => p.id === currentUserId);

    if (newSpec) {
      onUpdateRoom({
        ...room,
        players: updatedPlayers,
        specs: [...room.specs, newSpec],
      });
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.sectionTitle}>Avaliadores</h2>
        <div className={styles.grid}>
          {room.players.map((p) => {
            const isTheLeader = p.id === room.leaderId;
            const isMe = p.id === currentUserId;

            return (
              <PlayerRoomCard
                key={p.id}
                id={p.id}
                name={p.name}
                type="participant"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(p.id, 'players')}
                onTransferLeadership={() => handleTransferLeadership(p.id)}
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
            const isMe = s.id === currentUserId;
            const isTheLeader = s.id === room.leaderId;

            return (
              <PlayerRoomCard
                key={s.id}
                id={s.id}
                name={s.name}
                type="spec"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(s.id, 'specs')}
                onTransferLeadership={() => handleTransferLeadership(s.id)}
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
              onClick={() => handleStartRoom('selectTeam')}
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
