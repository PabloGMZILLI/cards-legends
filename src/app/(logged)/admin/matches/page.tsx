// src/app/(logged)/admin/matches/page.tsx

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
       fetch('/api/matches').then(async (res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Erro ao buscar partidas');
        }
        const data = await res.json();
        setMatches(data);

      });
    } catch (error) {
      console.error('Erro ao buscar partidas:', error);
    } finally {
      setLoading(false);
    }
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
                return 'Empate';
              },
            },
            {
              key: 'date',
              label: 'Data',
              render: (match) => new Date(match.date).toLocaleDateString('pt-BR'),
            },
            {
              key: 'championship',
              label: 'Campeonato',
              render: (match) => match.championshipData?.name || '-',
            },
          ]}
        />
      )}
    </div>
  );
}
