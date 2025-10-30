// src/app/(logged)/admin/players/[id]/edit/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Input, Select, Spinner } from '@/components';
import { getPlayerDetails } from '@/services/playersService';
import { getAllNacionalities } from '@/services/nacionalityService';
import { getTeams } from '@/services/teamsService';
import { Option } from '@/components/Select/types';
import { TeamPlayerRole } from '@/types/Team';

import styles from '../../create/CreatePlayerPage.module.css';

const roles: Option[] = [
  {
    label: 'Top',
    value: 'Top', 
  },
  {
    label: 'Jungle',
    value: 'Jungle', 
  },
  {
    label: 'Mid',
    value: 'Mid', 
  },
  {
    label: 'ADC',
    value: 'ADC', 
  },
  {
    label: 'Support',
    value: 'Support', 
  },
  {
    label: 'Head Coach',
    value: 'HeadCoach', 
  },
];

export default function EditPlayerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState<TeamPlayerRole>('Top');
  const [teamId, setTeamId] = useState('');
  const [nacionalityId, setNacionalityId] = useState('');

  const [teams, setTeams] = useState<Option[]>([]);
  const [nacionalities, setNacionalities] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    getPlayerDetails(id).then((player) => {
      if (!player) return;
      setName(player.name);
      setImage(player.image);
      setRole(player.role);
      setTeamId('id' in player.team ? player.team.id : '');
      setNacionalityId('id' in player.nacionality ? player.nacionality.id : '');
    });

    getTeams().then((data) => {
      setTeams(data.map((team) => ({
        label: team.name,
        value: team.id, 
      })));
    });

    getAllNacionalities().then((data) => {
      setNacionalities(data.map((nat) => ({
        label: nat.name,
        value: nat.id, 
      })));
    });

    setLoading(false);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || typeof id !== 'string') return;

    setSubmitting(true);

    try {
      await fetch(`/api/players/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          image,
          role,
          teamId,
          nacionalityId, 
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao atualizar jogador');
        }
        router.push('/admin/players');
      });

    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
      alert('Erro ao atualizar jogador.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner center />;

  return (
    <div className={styles.container}>
      <h1>Editar Jogador</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Imagem" value={image} onChange={(e) => setImage(e.target.value)} />

        <Select
          label="Função"
          options={roles}
          value={role}
          onChange={(val) => setRole(val as TeamPlayerRole)}
        />

        <Select
          label="Time"
          options={teams}
          value={teamId}
          onChange={(val) => setTeamId(val as string)}
        />

        <Select
          label="Nacionalidade"
          options={nacionalities}
          value={nacionalityId}
          onChange={(val) => setNacionalityId(val as string)}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? <Spinner size={16} /> : 'Salvar Alterações'}
        </Button>
      </form>
    </div>
  );
}
