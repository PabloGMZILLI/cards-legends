'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nacionality } from '@/types/RoomTypes';
import { Button, Spinner } from '@/components';
import Image from 'next/image';
import DataTable from '@/components/DataTable/DataTable';
import styles from './NacionalityPage.module.css';

export default function NacionalitiesPage() {
  const [nacionalities, setNacionalities] = useState<Nacionality[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNacionalities = async () => {
    try {
      const data = await fetch('/api/nacionalities').then((res) => res.json());
      setNacionalities(data);
    } catch (err) {
      console.error('Erro ao carregar nacionalidades:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Nacionality) => {
    alert(`Editar nacionalidade: ${item.name}`);
  };

  const handleDelete = async (item: Nacionality) => {
    const confirm = window.confirm(`Deseja realmente deletar "${item.name}"?`);
    if (!confirm) return;

    try {
      await fetch(`/api/nacionalities/${item.id}`, { method: 'DELETE' });
      setNacionalities((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  useEffect(() => {
    fetchNacionalities();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nacionalidades</h1>
        <Button onClick={() => router.push('/admin/nacionalities/create')}>
          Adicionar Nova Nacionalidade
        </Button>
      </div>

      {loading ? (
        <Spinner center />
      ) : nacionalities.length === 0 ? (
        <p>Nenhuma nacionalidade cadastrada.</p>
      ) : (
        <DataTable
          data={nacionalities}
          withActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          columns={[
            {
              key: 'icon',
              label: 'Ícone',
              render: (item) =>
                item.icon ? (
                  <Image src={item.icon} alt="ícone" width={32} height={32} />
                ) : (
                  '-'
                ),
            },
            {
              key: 'name',
              label: 'Nome', 
            },
          ]}
        />
      )}
    </div>
  );
}
