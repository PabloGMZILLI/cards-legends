'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import styles from './CreateNacionalityPage.module.css';

export default function CreateNacionalityPage() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !icon) return;

    setLoading(true);
    try {
      await fetch('/api/nacionalities', {
        method: 'POST',
        body: JSON.stringify({ name, icon }),
      });

      router.push('/admin/nacionalities');
    } catch (err) {
      console.error('Erro ao criar nacionalidade:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Nova Nacionalidade</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome da Nacionalidade"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Brasil"
        />

        <Input
          label="Ícone (URL ou caminho local)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="/images/flags/br.png"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
