'use client';

import Image from 'next/image';
import styles from './EditPlayerCard.module.css';
import { ResolvedPlayer } from '@/types/RoomTypes';

interface PlayerCardProps {
    player: ResolvedPlayer;
    score: number;
    averageScore: number;
    voted: boolean;
    onScoreChange: (newScore: number) => void;
}

export default function PlayerCard({
    player,
    score,
    averageScore,
    onScoreChange,
}: PlayerCardProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        onScoreChange(value);
    };

    const backgroundPath = `/images/backgrounds/${score >= 50 ? '1' : '2'}.png`;
    const framePath = `/images/frames/${score >= 50 ? '1' : '2'}.png`;

    console.log('player: ', player)
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
                            src={player?.team && 'logoUrl' in player.team ? player.team.logoUrl : ''}
                            alt="Time"
                            width={32}
                            height={32}
                            className={styles.badgeIcon}
                        />
                        <Image
                            src={'icon' in player.nacionality ? player.nacionality.icon : ''}
                            alt="País"
                            width={32}
                            height={32}
                            className={styles.badgeIcon}
                        />
                        <Image
                            src={'icon' in player.region ? player.region.icon : ''}
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

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={score}
                            onChange={handleChange}
                            className={styles.slider}
                        />
                        <p className={styles.scoreValue}>Sua nota: {score}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
