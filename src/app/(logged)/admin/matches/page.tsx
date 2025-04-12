'use client';

import { useEffect, useState } from 'react';
import { Button, DataTable, Spinner } from '@/components';
import { Match } from '@/types/RoomTypes';
import { useRouter } from 'next/navigation';

import styles from './MatchesPage.module.css';

export default function MatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchMatches = async () => {
        try {
            const data = await fetch('/api/matches').then((res) => res.json());
            setMatches(data);
        } catch (error) {
            console.error('Erro ao buscar rodadas:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (match: Match) => {
        console.log(`Editar: ${match.id}`);
        // TODO: abrir modal ou redirecionar para tela de edição
    };

    const handleDelete = async (match: Match) => {
        const confirm = window.confirm(`Tem certeza que deseja deletar o match "${match.id}"?`);
        if (!confirm) return;

        try {
            await fetch(`/api/matches/${match.id}`, {
                method: 'DELETE',
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao deletar match');
                }
                setMatches((prev) => prev.filter((r) => r.id !== match.id));
                return res.json();
            });

        } catch (err) {
            console.error('Erro ao deletar match:', err);
            alert('Erro ao deletar.');
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Partidas</h1>
                <Button onClick={() => router.push('/admin/matches/create')}>Adicionar Partida</Button>
            </div>

            {loading ? (
                <Spinner center />
            ) : matches.length === 0 ? (
                <p>Nenhuma partida cadastrada.</p>
            ) : (
                <DataTable
                    data={matches}
                    withActions
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    columns={[
                        { key: 'id', label: 'Id' },
                    ]}
                />
            )}
        </div>
    );
}
