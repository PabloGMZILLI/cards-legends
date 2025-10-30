'use client';

import Image from 'next/image';
import styles from './PlayerCard.module.css';
import { ResolvedPlayer } from '@/types/RoomTypes';

interface PlayerCardProps {
  player: ResolvedPlayer;
  averageScore: number;
}

export default function PlayerCard({ player, averageScore }: PlayerCardProps) {
  const backgroundPath = `/images/backgrounds/${averageScore >= 50 ? '1' : '2'}.png`;
  const framePath = `/images/frames/${averageScore >= 50 ? '1' : '2'}.png`;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <Image
          src={framePath}
          alt="Card Frame"
          fill
          className={styles.frameImage}
          priority
        />

        <div className={styles.innerCard}>
          <Image
            src={backgroundPath}
            alt="Card Background"
            fill
            className={styles.backgroundImage}
            priority
          />

          <div className={styles.badges}>
            <Image
              src={player.team.logoUrl}
              alt="Time"
              width={32}
              height={32}
              className={styles.badgeIcon}
            />
            <Image
              src={player.nacionality.icon}
              alt="País"
              width={32}
              height={32}
              className={styles.badgeIcon}
            />
            <Image
              src={player.region.icon}
              alt="Região"
              width={32}
              height={32}
              className={styles.badgeIcon}
            />
          </div>

          <div className={styles.content}>
            <span className={styles.averageScore}>{averageScore}</span>

            <Image
              src={player.image}
              alt={player.name}
              width={100}
              height={100}
              className={styles.playerImage}
            />

            <h3 className={styles.name}>{player.name}</h3>
            <span className={styles.role}>{player.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}