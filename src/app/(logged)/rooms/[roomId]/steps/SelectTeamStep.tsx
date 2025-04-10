'use client';

import { useState } from 'react';
import { Room, TeamType } from '@/types/RoomTypes';
import { Icon } from '@/components';
import Image from 'next/image';

import styles from '../styles/SelectTeamStep.module.css';

type SelectTeamStepProps = {
    room: Room;
    currentUserId: string;
    onHandleNext: (teamId: string) => void;
};

const mockTeams: TeamType[] = [
    {
        id: 'team1',
        name: 'Pain',
        logoUrl: '/images/teams/pain.png',
        region: 'Sul',
        players: [
            {
                id: 'player1',
                name: 'Zika',
                imageUrl: 'https://placehold.co/48x48?text=Z',
                position: 'Top',
                age: 22,
            },
            {
                id: 'player2',
                name: 'Kita',
                imageUrl: 'https://placehold.co/48x48?text=K',
                position: 'Jungle',
                age: 23,
            },
        ],
    },
    {
        id: 'team2',
        name: 'Fire Wolves',
        logoUrl: '/images/teams/pain.png',
        region: 'Sudeste',
        players: [
            {
                id: 'player3',
                name: 'Luxinha',
                imageUrl: 'https://placehold.co/48x48?text=L',
                position: 'Mid',
                age: 20,
            },
            {
                id: 'player4',
                name: 'Drako',
                imageUrl: 'https://placehold.co/48x48?text=D',
                position: 'ADC',
                age: 21,
            },
        ],
    },
];


export default function SelectTeamStep({
    room,
    currentUserId,
    onHandleNext,
}: SelectTeamStepProps) {
    const isLeader = room.leaderId === currentUserId;
    const teams = mockTeams; // Aqui você pode substituir pelo array de times que você tem
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
                onClick={() => selectedTeamId && onHandleNext(selectedTeamId)}
            >
                Próximo <Icon name="arrowRight" size={16} />
            </button>
        </div>
    );
}
