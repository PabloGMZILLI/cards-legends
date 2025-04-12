'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select } from '@/components';
import { Championship, Round } from '@/types/RoomTypes';

import { getChampionships } from '@/services/championshipService';
import { getRoundsByChampionship } from '@/services/roundService';
import { getTeamsFromRounds } from '@/services/teamService';
import { createMatch } from '@/services/matchesService';

import styles from './CreateMatchPage.module.css';
import { TeamType } from '@/types/Team';

export default function CreateMatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [teams, setTeams] = useState<TeamType[]>([]);

  const [championshipId, setChampionshipId] = useState('');
  const [roundId, setRoundId] = useState('');
  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');
  const [winner, setWinner] = useState<'teamA' | 'teamB' | null>(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getChampionships();
      setChampionships(data);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!championshipId) return;

    const fetchRoundsAndTeams = async () => {
      const r = await getRoundsByChampionship(championshipId);
      setRounds(r);

      const t = await getTeamsFromRounds(r);
      setTeams(t);
    };

    fetchRoundsAndTeams();
  }, [championshipId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!championshipId || !roundId || !teamAId || !teamBId || !date) return;

    setLoading(true);
    try {
      await createMatch({
        championshipId,
        roundId,
        teamAId,
        teamBId,
        winner,
        date,
      });

      router.push('/admin/matches');
    } catch (err) {
      console.error('Erro ao criar partida:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Nova Partida</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Campeonato"
          value={championshipId}
          onChange={(val) => setChampionshipId(val as string)}
          options={championships.map((c) => ({ label: c.name, value: c.id }))}
        />

        <Select
          label="Rodada"
          value={roundId}
          onChange={(val) => setRoundId(val as string)}
          options={rounds.map((r) => ({ label: r.name, value: r.id }))}
        />

        <Select
          label="Time A"
          value={teamAId}
          onChange={(val) => setTeamAId(val as string)}
          options={teams.map((t) => ({ label: t.name, value: t.id }))}
        />

        <Select
          label="Time B"
          value={teamBId}
          onChange={(val) => setTeamBId(val as string)}
          options={teams.map((t) => ({ label: t.name, value: t.id }))}
        />

        <Select
          label="Vencedor"
          value={winner || ''}
          onChange={(val) => setWinner(val as 'teamA' | 'teamB' | null)}
          options={[
            { label: 'Time A', value: 'teamA' },
            { label: 'Time B', value: 'teamB' },
            { label: 'Empate', value: '' },
          ]}
        />

        <Input
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
