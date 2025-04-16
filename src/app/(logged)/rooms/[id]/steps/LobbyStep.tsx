'use client';

import { LobbyStepProps, RoomKeys } from '@/types/RoomTypes';
import styles from '../styles/LobbyStep.module.css';

import { Icon, Spinner } from '@/components';
import PlayerRoomCard from '../components/PlayerRoomCard';
import { useAuth } from '@/context/AuthContext';
import { CustomUser } from '@/types';

export default function LobbyStep({
  room,
  onUpdateRoom,
  nextStep,
}: LobbyStepProps) {
  const { user, loading } = useAuth();

  if (!user || loading) {
    return <Spinner center={true} />;
  }

  const isLeader = room.host === user.uid;

  const handleKickPlayer = (id: string, type: RoomKeys) => {
    const users = room[type] as CustomUser[];

    const filtered = users.filter(user => user.uid !== id);
    onUpdateRoom({ ...room, [type]: filtered });
  };

  const handleTransferLeadership = (teamPlayer: string) => {
    onUpdateRoom({ ...room, host: teamPlayer });
  };

  const handleSwitchRole = (isSwitchingToParticipant = true) => {
    const sourceKey = isSwitchingToParticipant ? 'specs' : 'users';
    const targetKey = isSwitchingToParticipant ? 'users' : 'specs';

    const updatedSource = room[sourceKey].filter((member) => member.uid !== user.uid);
    const switchingMember = room[sourceKey].find((member) => member.uid === user.uid);

    console.log('room[sourceKey]: ', room[sourceKey])

    if (!switchingMember) return;

    const updatedTarget = room[targetKey].filter((member) => member.uid !== user.uid);

    const updatedRoom = {
      ...room,
      [sourceKey]: updatedSource.filter((member, i, arr) => arr.findIndex((x) => x.uid === member.uid) === i),
      [targetKey]: [...updatedTarget, switchingMember].filter((member, i, arr) => arr.findIndex((x) => x.uid === member.uid) === i),
    }


    onUpdateRoom(updatedRoom);
  };

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.sectionTitle}>Avaliadores</h2>
        <div className={styles.grid}>
          {room.users.map((p) => {
            const isTheLeader = p.uid === room.host;
            const isMe = p.uid === user.uid;

            return (
              p.uid && p.name && <PlayerRoomCard
                key={p.uid}
                uid={p.uid}
                name={p.name}
                type="participant"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(p.uid as string, 'users')}
                onTransferLeadership={() => handleTransferLeadership(p.uid as string)}
                loggedUserIsLeader={isLeader}
              />
            );
          })}
          <div className={styles.switchCard} onClick={() => handleSwitchRole(true)}>
            <Icon name="arrowRight" size={20} />
          </div>
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Espectadores</h2>
        <div className={styles.grid}>
          {room.specs.map((s) => {
            const isMe = s.uid === user.uid;
            const isTheLeader = s.uid === room.host;

            return (
              s.uid && s.name && <PlayerRoomCard
                key={s.uid}
                uid={s.uid}
                name={s.name}
                type="spec"
                isMe={isMe}
                isLeader={isTheLeader}
                onKick={() => handleKickPlayer(s.uid as string, 'specs')}
                onTransferLeadership={() => handleTransferLeadership(s.uid as string)}
                loggedUserIsLeader={isLeader}
              />
            );
          })}
          <div className={styles.switchCard} onClick={() => handleSwitchRole(false)}>
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
