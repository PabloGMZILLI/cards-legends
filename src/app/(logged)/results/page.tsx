'use client';

import { useState } from 'react';
import styles from './ResultsPage.module.css';
import { Input, Select, PlayerCard } from '@/components';
import Image from 'next/image';
import { ResolvedPlayer } from '@/types/RoomTypes';

const mockStreamers = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Streamer Baiano',
    value: 'Baiano',
  },
  {
    label: 'Streamer Minerva',
    value: 'Minerva',
  },
];

type PlayerResult = {
  player: ResolvedPlayer;
  score: number;
  streamer: string;
}

const mockPlayers: PlayerResult[] = [
  {
    score: 95,
    streamer: 'Baiano',
    player: {
      uid: '1',
      name: 'Titan',
      role: 'ADC',
      team: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          icon: '/images/regions/lta-sul.png',
        },
        logoUrl: '/images/teams/pain.png',
      },
      nacionality: {
        id: '',
        name: '',
        icon: '/images/flags/br.png',
      },
      region: {
        id: '',
        name: '',
        icon: '/images/regions/lta-sul.png',
      },
      image: '/images/players/titan.png',
    },
  },
];

export default function ResultsPage() {
  const [search, setSearch] = useState('');
  const [streamer, setStreamer] = useState('');

  const filteredPlayers = mockPlayers.filter((result) => {
    return (
      result.player.name.toLowerCase().includes(search.toLowerCase()) &&
      (streamer === '' || result.streamer === streamer)
    );
  });

  const winner = mockPlayers[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resultados da Última Rodada</h1>

      <section className={styles.championSection}>
        <h2>🏆 Campeão da Rodada</h2>
        <div className={styles.championCard}>
          <PlayerCard player={winner.player} averageScore={winner.score} />
        </div>
      </section>

      <section className={styles.filtersSection}>
        <Input
          placeholder="Buscar jogador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          options={mockStreamers}
          value={streamer}
          onChange={(val) => setStreamer(val as string)}
          placeholder="Filtrar por Streamer"
        />
      </section>

      <section className={styles.rankingSection}>
        <h2>Ranking Geral</h2>

        {filteredPlayers.length === 0 ? (
          <p>Nenhum jogador encontrado.</p>
        ) : (
          <table className={styles.rankingTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Jogador</th>
                <th>Função</th>
                <th>Time</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((result, index) => {
                const { player } = result;
                return (
                  <tr key={player.uid}>
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.role}</td>
                    <td className={styles.playerCell}>
                      <Image
                        src={player.team.logoUrl}
                        alt="Card Frame"
                        width="30"
                        height="30"
                        className={styles.teamLogo}
                        priority
                      />
                    </td>
                    <td>{result.score}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}