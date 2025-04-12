'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import styles from './CreateRegionPage.module.css';

export default function CreateRegionPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !icon) return;

    setLoading(true);
    try {
      await fetch('/api/regions', {
        method: 'POST',
        body: JSON.stringify({ name, icon }),
      });

      router.push('/admin/regions');
    } catch (err) {
      console.error('Erro ao criar região:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Nova Região</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome da Região"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: LTA Sul"
        />

        <Input
          label="Ícone (URL ou caminho local)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="/images/regions/..."
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
