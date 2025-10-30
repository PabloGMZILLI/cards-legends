'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, Spinner } from '@/components';
import { Region, Round } from '@/types/RoomTypes';
import styles from './CreateRoomPage.module.css';

export default function CreateRoomPage() {
  const router = useRouter();

  const [roomName, setRoomName] = useState('');
  const [regionId, setRegionId] = useState('');
  const [roundIds, setRoundIds] = useState<string[]>([]);
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [regions, setRegions] = useState<Region[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsRes, roundsRes] = await Promise.all([
          fetch('/api/regions'),
          fetch('/api/rounds'),
        ]);
        const [regionsData, roundsData] = await Promise.all([
          regionsRes.json(),
          roundsRes.json(),
        ]);
        setRegions(regionsData);
        setRounds(roundsData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName || !regionId || roundIds.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({
          name: roomName,
          region: regionId,
          roundIds,
          maxPlayers,
        }),
      });

      if (!res.ok) throw new Error('Erro ao criar sala');
      const { id } = await res.json();
      router.push(`/rooms/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar nova sala</h1>

      {loadingData ? (
        <Spinner center />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome da sala"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Ex: Sala 1"
          />

          <Select
            label="Região"
            options={regions.map((r) => ({
              label: r.name,
              value: r.id, 
            }))}
            value={regionId}
            onChange={(val) => setRegionId(val as string)}
            placeholder="Selecione a região"
          />

          <Select
            label="Rodadas"
            options={rounds.map((r) => ({
              label: r.name,
              value: r.id, 
            }))}
            value={roundIds}
            onChange={(val) => setRoundIds(Array.isArray(val) ? val : [])}
            placeholder="Selecione as rodadas"
            multi
          />

          <Input
            label="Máximo de participantes"
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
            min={2}
            max={10}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar sala'}
          </Button>
        </form>
      )}
    </div>
  );
}
