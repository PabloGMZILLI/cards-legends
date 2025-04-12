'use client';

import { useEffect, useState } from 'react';
import { Button, DataTable, Spinner } from '@/components';
import { Round, RoundWithChampionship } from '@/types/RoomTypes';
import { useRouter } from 'next/navigation';

import styles from './RoundsPage.module.css';
import { formatTimestamp } from '@/utils/functions';

export default function RoundsPage() {
    const [rounds, setRounds] = useState<RoundWithChampionship[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchRounds = async () => {
        try {
            const data = await fetch('/api/rounds').then((res) => res.json());
            setRounds(data);
        } catch (error) {
            console.error('Erro ao buscar rodadas:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (round: Round) => {
        alert(`Editar região: ${round.name}`);
        // TODO: abrir modal ou redirecionar para tela de edição
    };

    const handleDelete = async (round: Round) => {
        const confirm = window.confirm(`Tem certeza que deseja deletar o round "${round.name}"?`);
        if (!confirm) return;

        try {
            await fetch(`/api/rounds/${round.id}`, {
                method: 'DELETE',
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao deletar round');
                }
                setRounds((prev) => prev.filter((r) => r.id !== round.id));
                return res.json();
            });

        } catch (err) {
            console.error('Erro ao deletar round:', err);
            alert('Erro ao deletar.');
        }
    };

    useEffect(() => {
        fetchRounds();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Rodadas</h1>
                <Button onClick={() => router.push('/admin/rounds/create')}>Adicionar Nova Rodada</Button>
            </div>

            {loading ? (
                <Spinner center />
            ) : rounds.length === 0 ? (
                <p>Nenhuma rodada cadastrada.</p>
            ) : (
                <DataTable
                    data={rounds}
                    withActions
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    columns={[
                        { key: 'name', label: 'Nome' },
                        { key: 'roundNumber', label: 'Rodada' },
                        {
                            key: 'startDate', label: 'Início', render: (item) =>
                                formatTimestamp(item.startDate),
                        },
                        {
                            key: 'endDate', label: 'Fim', render: (item) =>
                                formatTimestamp(item.endDate),
                        },
                        {
                            key: 'championship',
                            label: 'Campeonato',
                            render: (item) => item.championshipData?.name || '-',
                        },
                    ]}
                />
            )}
        </div>
    );
}
