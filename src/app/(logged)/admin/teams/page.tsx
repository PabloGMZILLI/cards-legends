'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, DataTable, Spinner } from '@/components';
import { TeamType } from '@/types/Team';
import styles from './TeamsPage.module.css';
import Image from 'next/image';

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTeams = async () => {
    setLoading(true);
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar times:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (team: TeamType) => {
    const confirmed = confirm('Tem certeza que deseja deletar este time?');
    if (!confirmed) return;
    const { id } = team;

    await fetch(`/api/teams/${id}`, { method: 'DELETE' }).then((res) => {
      if (!res.ok) {
        throw new Error('Erro ao deletar time');
      }
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== id));
    });

  };

  const handleEdit = (team: TeamType) => {
    alert(`Editar região: ${team.name}`);
    // TODO: abrir modal ou redirecionar para tela de edição
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Times</h1>
        <Button onClick={() => router.push('/admin/teams/create')}>
                    Adicionar Novo Time
        </Button>
      </div>

      {loading ? (
        <Spinner center />
      ) : teams.length === 0 ? (
        <p>Nenhum time cadastrado.</p>
      ) : (
        <DataTable
          data={teams}
          withActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          columns={[
            {
              key: 'logoUrl',
              label: '',
              render: (team) =>
                team.logoUrl ? (
                  <Image
                    src={team.logoUrl}
                    alt={`Logo de ${team.name}`}
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
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
