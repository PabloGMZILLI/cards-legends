// src/app/(logged)/admin/players/create/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, Spinner } from '@/components';
import { Nacionality } from '@/types/RoomTypes';
import { Option } from '@/components/Select/types';
import { TeamPlayerRole, TeamType } from '@/types/Team';
import styles from './CreatePlayerPage.module.css';

export default function CreatePlayerPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [teamId, setTeamId] = useState('');
  const [nacionalityId, setNacionalityId] = useState('');
  const [role, setRole] = useState('');
  const [teams, setTeams] = useState<Option[]>([]);
  const [nacionalities, setNacionalities] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const roles: Option[] = [
    { label: 'Top', value: 'Top' },
    { label: 'Jungle', value: 'Jungle' },
    { label: 'Mid', value: 'Mid' },
    { label: 'ADC', value: 'ADC' },
    { label: 'Support', value: 'Support' },
    { label: 'Head Coach', value: 'HeadCoach' },
  ];

  useEffect(() => {
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

    fetch('/api/nacionalities')
      .then((res) => res.json())
      .then((data: Nacionality[]) => {
        const options = data.map((nat) => ({
          label: nat.name,
          value: nat.id,
        }));
        setNacionalities(options);
      })
      .catch(() => alert('Erro ao carregar nacionalidades'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !image || !teamId || !role || !nacionalityId) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        body: JSON.stringify({
          name,
          image,
          teamId,
          nacionalityId,
          role,
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar jogador');

      router.push('/admin/players');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar jogador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Cadastrar Jogador</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome do Jogador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Titan"
        />

        <Input
          label="Imagem (URL ou path)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/players/titan.png"
        />

        <Select
          label="Função"
          options={roles}
          value={role}
          onChange={(val) => setRole(val as TeamPlayerRole)}
          placeholder="Selecione a função"
        />

        <Select
          label="Time"
          options={teams}
          value={teamId}
          onChange={(val) => setTeamId(val as string)}
          placeholder="Selecione o time"
        />

        <Select
          label="Nacionalidade"
          options={nacionalities}
          value={nacionalityId}
          onChange={(val) => setNacionalityId(val as string)}
          placeholder="Selecione a nacionalidade"
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size={16} /> : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
