'use client';

import { useState } from 'react';
import { Room } from '@/types/RoomTypes';
import { Icon } from '@/components';
import Image from 'next/image';

import styles from '../styles/SelectTeamStep.module.css';
import { mockTeams } from '@/mocks';

type SelectTeamStepProps = {
    room: Room;
    currentUserId: string;
    nextStep: () => void;
};

export default function SelectTeamStep({
    room,
    currentUserId,
    nextStep,
}: SelectTeamStepProps) {
    const isLeader = room.leaderId === currentUserId;
    const teams = mockTeams;
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

    if (!isLeader) {
        return (
            <div className={styles.waiting}>
                <p>Aguardando o líder escolher o time...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Selecione um time para iniciar a avaliação</h2>

            <div className={styles.grid}>
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className={`${styles.card} ${selectedTeamId === team.id ? styles.selected : ''}`}
                        onClick={() => setSelectedTeamId(team.id)}
                    >
                        {team.logoUrl &&
                            <Image src={team.logoUrl}   width={64}
                            height={64} alt={team.name} className={styles.logo} />
                        }
                        <h3 className={styles.name}>{team.name}</h3>
                    </div>
                ))}
            </div>

            <button
                className={styles.nextButton}
                disabled={!selectedTeamId}
                onClick={nextStep}
            >
                Próximo <Icon name="arrowRight" size={16} />
            </button>
        </div>
    );
}
