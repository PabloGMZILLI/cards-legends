'use client';

import { useState } from 'react';
import { Button, Input, Select } from '@/components';

import styles from './CreateRoomPage.module.css';

const mockRegions = [
  { label: 'LTA Sul', value: 'lta-sul' },
  { label: 'LTA Norte', value: 'lta-norte' },
  { label: 'LTA LATAM', value: 'lta-latam' },
];

const mockRounds = [
  { label: 'Rodada 1', value: 'round-1' },
  { label: 'Rodada 2', value: 'round-2' },
  { label: 'Rodada 3', value: 'round-3' },
];

export default function CreateRoomPage() {
  const [region, setRegion] = useState('');
  const [rounds, setRounds] = useState<string[]>([]);
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(5);

  const handleSubmit = () => {
    console.log({
      region,
      rounds,
      roomName,
      maxPlayers,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar nova sala</h1>
      <Select
        label="Região"
        options={mockRegions}
        value={region}
        onChange={(value) => setRegion(typeof value === 'string' ? value : '')}
        placeholder="Selecione a região"
      />

      <Select
        label="Rodadas"
        options={mockRounds}
        value={rounds}
        onChange={(value) => setRounds(Array.isArray(value) ? value : [])}
        multi
        placeholder="Selecione uma ou mais rodadas"
      />

      <Input
        label='Nome da sala'
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Digite um nome"
      />

      <Input
        label='Máximo de participantes'
        type="number"
        value={maxPlayers}
        onChange={(e) => setMaxPlayers(Number(e.target.value))}
        min={2}
        max={10}
      />

      <Button onClick={handleSubmit}>Criar sala</Button>
    </div>
  );
}
