'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Region } from '@/types/RoomTypes';
import { Button, Input, Select, Spinner } from '@/components';
import styles from './CreateChampionshipPage.module.css';

export default function CreateChampionshipPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [split, setSplit] = useState('');
  const [year, setYear] = useState('');
  const [regionId, setRegionId] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions');
        const data = await response.json();
        setRegions(data);
      } catch (err) {
        console.error('Erro ao carregar regiões:', err);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !split || !year || !regionId) return;

    setLoading(true);
    try {
      await fetch('/api/championships', {
        method: 'POST',
        body: JSON.stringify({
          name,
          split,
          year: parseInt(year),
          regionId,
        }),
      });

      router.push('/admin/championships');
    } catch (err) {
      console.error('Erro ao criar campeonato:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Campeonato</h1>

      {loadingRegions ? (
        <Spinner center />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome do Campeonato"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: LTA"
          />

          <Input
            label="Split"
            value={split}
            type="number"
            onChange={(e) => setSplit(e.target.value)}
            placeholder="Ex: Split 1"
          />

          <Input
            label="Ano"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ex: 2025"
          />

          <Select
            label="Região"
            options={regions.map((r) => ({ label: r.name, value: r.id }))}
            value={regionId}
            onChange={(val) => setRegionId(val as string)}
            placeholder="Selecione uma região"
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar'}
          </Button>
        </form>
      )}
    </div>
  );
}
