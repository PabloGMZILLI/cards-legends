'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, DataTable, Spinner } from '@/components';
import { MatchWithDetails } from '@/types/RoomTypes';

import styles from './MatchesPage.module.css';

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches');
      if (!res.ok) {
        throw new Error('Erro ao buscar partidas');
      }
      const data = await res.json();
      setMatches(data);
    } catch (error) {
      console.error('Erro ao buscar partidas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (match: MatchWithDetails) => {
    const confirmed = confirm('Deseja mesmo deletar esta partida?');
    if (!confirmed) return;
    const { id } = match;

    const res = await fetch(`/api/matches/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      console.error('Erro ao deletar partida:');
      throw new Error('Erro ao deletar partida');
    }

    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Partidas</h1>
        <Button onClick={() => router.push('/admin/matches/create')}>
          Adicionar Nova Partida
        </Button>
      </div>

      {loading ? (
        <Spinner center />
      ) : matches.length === 0 ? (
        <p>Nenhuma partida cadastrada.</p>
      ) : (
        <DataTable
          data={matches}
          withActions
          onEdit={(match) => router.push(`/admin/matches/${match.id}/edit`)}
          onDelete={handleDelete}
          columns={[
            {
              key: 'teamA',
              label: 'Time A',
              render: (match) => match.teamAData?.name || '-',
            },
            {
              key: 'teamB',
              label: 'Time B',
              render: (match) => match.teamBData?.name || '-',
            },
            {
              key: 'winner',
              label: 'Vencedor',
              render: (match) => {
                if (match.winner === 'teamA') return match.teamAData?.name || '-';
                if (match.winner === 'teamB') return match.teamBData?.name || '-';
                return '-';
              },
            },
            {
              key: 'round',
              label: 'Info',
              render: (match) => { 
                const split = match.roundData?.championshipData?.split
                const year = match.roundData?.championshipData?.year
                const number = match.roundData?.roundNumber
                return `Rodada ${number} - Split ${split} - ${year}`
              },
            },
          ]}
        />
      )}
    </div>
  );
}
