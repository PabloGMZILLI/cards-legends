'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select } from '@/components';

import styles from './CreateMatchPage.module.css';
import { TeamType } from '@/types/Team';
import { Option } from '@/components/Select/types';
import { Round } from '@/types/RoomTypes';

export default function CreateMatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rounds, setRounds] = useState<Option[]>([]);
  const [teams, setTeams] = useState<Option[]>([]);
  const [teamsSecondOption, setTeamsSecondOption] = useState<Option[]>([]);
  const [roundId, setRoundId] = useState('');
  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');

  useEffect(() => {
    fetch('/api/rounds')
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((round: Round) => ({
          label: round.name,
          value: round.id,
        }));
        setRounds(options);
      })
      .catch(() => alert('Erro ao carregar rodadas'));

    fetch('/api/teams')
      .then((res) => res.json())
      .then((data: TeamType[]) => {
        const options = data.map((team) => ({
          label: team.name,
          value: team.id,
        }));
        setTeams(options);
      })
      .catch(() => alert('Erro ao carregar times'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roundId || !teamAId || !teamBId) return;

    setLoading(true);
    await fetch('/api/matches', {
      method: 'POST',
      body: JSON.stringify({
        roundId,
        teamAId,
        teamBId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao criar partida');
        }
        router.push('/admin/matches');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Nova Partida</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Rodada"
          value={roundId}
          onChange={(val) => setRoundId(val as string)}
          options={rounds}
        />

        <Select
          label="Time A"
          value={teamAId}
          onChange={(val) => {
            setTeamAId(val as string);
            const selectedTeam = teams.find((team) => team.value === val);
            if (selectedTeam) {
              setTeamsSecondOption(teams.filter((team) => team.value !== selectedTeam.value));
            }
          }}
          options={teams}
        />

        <Select
          label="Time B"
          value={teamBId}
          onChange={(val) => setTeamBId(val as string)}
          options={teamsSecondOption}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
