'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select } from '@/components';

import { getRoundsByChampionship } from '@/services/roundService';

import styles from './CreateMatchPage.module.css';
import { TeamType } from '@/types/Team';
import { Option } from '@/components/Select/types';

export default function CreateMatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [championships, setChampionships] = useState<Option[]>([]);
  const [rounds, setRounds] = useState<Option[]>([]);
  const [teams, setTeams] = useState<Option[]>([]);
  const [teamsSecondOption, setTeamsSecondOption] = useState<Option[]>([]);
  const [championshipId, setChampionshipId] = useState('');
  const [roundId, setRoundId] = useState('');
  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');

  useEffect(() => {
    fetch('/api/championships')
      .then((res) => res.json())
      .then((data: TeamType[]) => {
        const options = data.map((championship) => ({
          label: championship.name,
          value: championship.id,
        }));
        setChampionships(options);
      })
      .catch(() => alert('Erro ao carregar times'));

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

  useEffect(() => {
    if (!championshipId) return;

    const fetchRounds = async () => {
      const rounds = await getRoundsByChampionship(championshipId);
      setRounds(rounds.map((r) => ({ label: r.name, value: r.id })));
    };

    fetchRounds();
  }, [championshipId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!championshipId || !roundId || !teamAId || !teamBId) return;

    setLoading(true);
    await fetch('/api/matches', {
      method: 'POST',
      body: JSON.stringify({
        championshipId,
        roundId,
        teamAId,
        teamBId
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Erro ao criar partida');
      }
      router.push('/admin/matches');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <h1>Nova Partida</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Campeonato"
          value={championshipId}
          onChange={(val) => setChampionshipId(val as string)}
          options={championships}
        />

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
