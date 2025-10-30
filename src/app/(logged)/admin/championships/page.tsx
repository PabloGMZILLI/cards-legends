'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Championship, ChampionshipWithRegion } from '@/types/RoomTypes';
import { Button, Spinner } from '@/components';
import DataTable from '@/components/DataTable/DataTable';
import styles from './ChampionshipPage.module.css';

export default function ChampionshipsPage() {
  const [championships, setChampionships] = useState<ChampionshipWithRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchChampionships = async () => {
    try {
      const data = await fetch('/api/championships').then((res) => res.json());
      setChampionships(data);
    } catch (err) {
      console.error('Erro ao carregar campeonatos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (champ: Championship) => {
    alert(`Editar campeonato: ${champ.name}`);
  };

  const handleDelete = async (champ: Championship) => {
    const confirm = window.confirm(`Deseja excluir o campeonato "${champ.name}"?`);
    if (!confirm) return;

    try {
      await fetch(`/api/championships/${champ.id}`, { method: 'DELETE' });
      setChampionships((prev) => prev.filter((c) => c.id !== champ.id));
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  useEffect(() => {
    fetchChampionships();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Campeonatos</h1>
        <Button onClick={() => router.push('/admin/championships/create')}>
          Adicionar Campeonato
        </Button>
      </div>

      {loading ? (
        <Spinner center />
      ) : championships.length === 0 ? (
        <p>Nenhum campeonato cadastrado.</p>
      ) : (
        <DataTable
          data={championships}
          withActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          columns={[
            {
              key: 'name',
              label: 'Nome', 
            },
            {
              key: 'split',
              label: 'Split', 
            },
            {
              key: 'year',
              label: 'Ano', 
            },
            {
              key: 'region',
              label: 'Região',
              render: (champ) =>
                champ.regionData?.name || (
                  <span style={{ opacity: 0.5 }}>(não carregado)</span>
                ),
            },
          ]}
        />
      )}
    </div>
  );
}
