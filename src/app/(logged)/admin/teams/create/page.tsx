'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, Spinner } from '@/components';
import { Region } from '@/types/RoomTypes';
import { Option } from '@/components/Select/types';

import styles from './CreateTeamPage.module.css';

export default function CreateTeamPage() {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [regionId, setRegionId] = useState('');
  const [regions, setRegions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch('/api/regions')
      .then((res) => res.json())
      .then((data: Region[]) => {
        const options = data.map((region) => ({
          label: region.name,
          value: region.id,
        }));
        setRegions(options);
      })
      .catch(() => {
        alert('Erro ao carregar regiões');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !logoUrl || !regionId) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify({ name, logoUrl, regionId }),
    })
      .then((res) => {
        if (!res.ok) {
        throw new Error('Erro ao criar time');
        }
        router.push('/admin/teams');
      })
      .catch((err) => {
        console.error('Erro ao criar time:', err);
        alert('Erro ao criar time');
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Cadastrar Time</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome do Time"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Pain Gaming"
        />

        <Input
          label="Logo (URL ou path)"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="/images/teams/pain.png"
        />

        <Select
          label="Região"
          options={regions}
          value={regionId}
          onChange={(val) => setRegionId(val as string)}
          placeholder="Selecione a região"
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size={16} /> : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
