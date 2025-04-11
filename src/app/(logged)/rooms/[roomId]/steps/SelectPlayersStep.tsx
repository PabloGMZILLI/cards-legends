'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SelectPlayersStepProps } from '@/types/RoomTypes';

import styles from '../styles/SelectPlayersStep.module.css';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components';
import { TeamPlayer } from '@/types/Team';
import { getPlayersByTeam } from '@/services/playerService';

export default function SelectPlayersStep({
  room,
  nextStep,
  onUpdateRoom,
}: SelectPlayersStepProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user, loading: userLoading } = useAuth();

  useEffect(() => {
    const fetchTeams = async () => {
      const players = await getPlayersByTeam(room.selectedTeam?.id as string);
      setPlayers(players);
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (!user || loading || userLoading) {
    return <Spinner />;
  }

  const isLeader = room.leaderId === user.uid;

  const handleSelect = (uid: string) => {
    setSelectedPlayerId(uid);
  };

  const handleNextClick = () => {
    if (!selectedPlayerId) return;

    const selected = players.find((p) => p.uid === selectedPlayerId);
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
            key={player.uid}
            className={`${styles.card} ${selectedPlayerId === player.uid ? styles.selected : ''}`}
            onClick={() => handleSelect(player.uid)}
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
