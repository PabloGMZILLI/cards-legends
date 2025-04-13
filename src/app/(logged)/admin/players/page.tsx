// src/app/(logged)/admin/teams/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, DataTable, Spinner } from '@/components';
import { TeamPlayerWithDetails } from '@/types/Team';
import styles from './PlayersPage.module.css';
import Image from 'next/image';

export default function PlayersPage() {
    const [players, setPlayers] = useState<TeamPlayerWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    console.log('players', players);

    const fetchPlayers = async () => {
        setLoading(true);
        fetch('/api/players/full')
            .then((res) => res.json())
            .then((data: TeamPlayerWithDetails[]) => {
                setPlayers(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar jogadores:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = async (player: TeamPlayerWithDetails) => {
        const confirmed = confirm('Deseja mesmo deletar este jogador?');
        if (!confirmed) return;
        const { uid } = player;

        await fetch(`/api/players/${uid}`, { method: 'DELETE' }).then((res) => {
            if (!res.ok) {
                console.error('Erro ao deletar jogador:');
                throw new Error('Erro ao deletar time');
            }
            setPlayers((prev) => prev.filter((p) => p.uid !== uid));
        });
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Jogadores</h1>
                <Button onClick={() => router.push('/admin/players/create')}>
                    Adicionar Novo Jogador
                </Button>
            </div>

            {loading ? (
                <Spinner center />
            ) : players.length === 0 ? (
                <p>Nenhum jogador cadastrado.</p>
            ) : (
                <DataTable
                    data={players}
                    withActions
                    onDelete={handleDelete}
                    onEdit={(player) => router.push(`/admin/players/${player.uid}/edit`)}
                    columns={[
                        {
                            key: 'image',
                            label: '',
                            render: (player) => (
                                <Image
                                    src={player.image}
                                    alt={`Imagem de ${player.name}`}
                                    width={60}
                                    height={60}
                                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                                />
                            ),
                        },
                        { key: 'name', label: 'Nome' },
                        { key: 'role', label: 'Função' },
                        {
                            key: 'team',
                            label: 'Time',
                            render: (player) => {
                                if (!player.teamData?.logoUrl) return '-';
                                return <Image
                                    src={player.teamData?.logoUrl || ''}
                                    alt={player.teamData?.logoUrl || ''}
                                    width={40}
                                    height={40}
                                />
                            },
                        },
                        {
                            key: 'nacionality',
                            label: 'Nacionalidade',
                            render: (player) => player.nacionalityData?.name || '-',
                        },
                    ]}
                />
            )}
        </div>
    );
}
