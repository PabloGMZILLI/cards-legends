'use client';

import { Icon } from '@/components';
import styles from './PlayerRoomCard.module.css';

interface PlayerRoomCardProps {
  id: string;
  name: string;
  type: 'participant' | 'spec';
  isMe: boolean;
  isLeader: boolean;
  loggedUserIsLeader: boolean;
  onKick?: () => void;
  onTransferLeadership?: () => void;
}

export default function PlayerRoomCard({
  name,
  type,
  isMe,
  isLeader,
  onKick,
  onTransferLeadership,
  loggedUserIsLeader,
}: PlayerRoomCardProps) {
    
  return (
    <div className={`${styles.playerRoomCard} ${isMe ? styles.currentUser : ''}`}>
      <div className={styles.cardHeader}>
        <p className={styles.name}>{name}</p>
        <div className={styles.headerIcons}>
          {isLeader && (
            <Icon
              name="crown"
              title="Líder"
              className={styles.crownIcon}
            />
          )}
        </div>
      </div>

      <p className={styles.role}>
        {type === 'participant' ? 'Avaliador' : 'Spec'}
      </p>

      {!isMe && loggedUserIsLeader && (
        <div className={styles.iconActions}>
          {onKick && (
            <Icon
              name="x"
              title="Remover jogador"
              className={styles.actionIcon}
              onClick={onKick}
              size={16}
            />
          )}
          {onTransferLeadership && (
            <Icon
              size={16}
              name="crown"
              className={styles.actionIcon}
              title="Passar Liderança"
              onClick={onTransferLeadership}
            />
          )}
        </div>
      )}
    </div>
  );
}
