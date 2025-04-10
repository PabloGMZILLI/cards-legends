'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SelectPlayersStepProps } from '@/types/RoomTypes';

import styles from '../styles/SelectPlayersStep.module.css';

export default function SelectPlayersStep({
  room,
  currentUserId,
  nextStep,
  onUpdateRoom,
}: SelectPlayersStepProps) {
  const isLeader = room.leaderId === currentUserId;
  const players = room.selectedTeam?.players || [];

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedPlayerId(id);
  };

  const handleNextClick = () => {
    if (!selectedPlayerId) return;

    const selected = players.find((p) => p.id === selectedPlayerId);
    if (!selected) return;

    onUpdateRoom({
      ...room,
      selectedPlayer: selected,
    });

    nextStep();
  };

  if (!isLeader) {
    return (
      <div className={styles.waitingContainer}>
        <p className={styles.waitingText}>Aguardando o líder escolher um jogador para avaliação...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Selecione um jogador para avaliação</h2>

      <div className={styles.grid}>
        {players.map((player) => (
          <div
            key={player.id}
            className={`${styles.card} ${selectedPlayerId === player.id ? styles.selected : ''}`}
            onClick={() => handleSelect(player.id)}
          >
            <Image
              src={player.image}
              alt={player.name}
              width={96}
              height={96}
              className={styles.avatar}
            />
            <p className={styles.name}>{player.name}</p>
            <p className={styles.role}>{player.role}</p>
          </div>
        ))}
      </div>

      <button onClick={handleNextClick} className={styles.nextButton} disabled={!selectedPlayerId}>
        Próximo
      </button>
    </div>
  );
}
