'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Select } from '@/components';
import { Championship, MatchWithDetails } from '@/types/RoomTypes';
import { useRouter } from 'next/navigation';

import styles from './RoundCreatePage.module.css';

export default function RoundCreatePage() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [roundNumber, setRoundNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [championshipId, setChampionshipId] = useState('');
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [matchOptions, setMatchOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedMatchIds, setSelectedMatchIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [championshipRes, matchesRes] = await Promise.all([
        fetch('/api/championships'),
        fetch('/api/matches'),
      ]);

      const championships = await championshipRes.json();
      const matches = await matchesRes.json();

      setChampionships(championships);

      const matchOptions = matches.map((match: MatchWithDetails) => ({
        value: match.id,
        label: `${match.teamAData?.name} vs ${match.teamBData?.name}`,
      }))

      setMatchOptions(matchOptions);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !roundNumber || !startDate || !endDate || !championshipId) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);

    await fetch('/api/rounds', {
      method: 'POST',
      body: JSON.stringify({
        name,
        roundNumber: Number(roundNumber),
        startDate,
        endDate,
        championshipId,
        matchIds: selectedMatchIds, // ← inclui matches aqui
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setError('Erro ao criar rodada');
        }

        router.push('/admin/rounds');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Criar Rodada</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />

        <Input
          label="Número da Rodada"
          type="number"
          value={roundNumber}
          onChange={(e) => setRoundNumber(e.target.value)}
        />

        <Input
          label="Data de Início"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          label="Data de Fim"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Select
          label="Campeonato"
          value={championshipId}
          onChange={(val) => setChampionshipId(val as string)}
          options={championships.map((c) => ({
            value: c.id,
            label: `${c.name} - ${c.split} ${c.year}`,
          }))}
        />

        <Select
          label="Partidas da Rodada"
          value={selectedMatchIds}
          onChange={(val) => setSelectedMatchIds(Array.isArray(val) ? val : [])}
          options={matchOptions}
          multi
          placeholder="Selecione as partidas"
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Rodada'}
        </Button>
      </form>
    </div>
  );
}
