'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Select } from '@/components';
import { Championship } from '@/types/RoomTypes';
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const fetchChampionships = async () => {
    const response = await fetch('/api/championships');
    const data = await response.json();
    setChampionships(data);
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
      }),
    }).then((res) => {
      if (!res.ok) {
        setError('Erro ao criar rodada');
      }

      router.push('/admin/rounds');
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchChampionships();
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
        {error && <p className={styles.error} >{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Rodada'}
        </Button>
      </form>
    </div>
  );
}
