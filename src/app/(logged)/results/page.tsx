'use client';

import { useState } from 'react';
import styles from './ResultsPage.module.css';
import { Input, PlayerCard } from '@/components';
import Image from 'next/image';
import { ResolvedPlayer } from '@/types/RoomTypes';

type PlayerResult = {
  player: ResolvedPlayer;
  score: number;
}

const mockPlayers: PlayerResult[] = [
  {
    score: 95,
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
  {
    score: 92,
    player: {
      uid: '2',
      name: 'Cacia',
      role: 'Mid',
      team: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          icon: '/images/regions/lta-sul.png',
        },
        logoUrl: '/images/teams/idl.png',
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
      image: '/images/players/cacia.png',
    },
  },
  {
    score: 88,
    player: {
      uid: '3',
      name: 'Wizer',
      role: 'Top',
      team: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          icon: '/images/regions/lta-north.png',
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
        icon: '/images/regions/lta-north.png',
      },
      image: '/images/players/wizer.png',
    },
  },
  {
    score: 87,
    player: {
      uid: '4',
      name: 'Kuri',
      role: 'Jungle',
      team: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          icon: '/images/regions/lta-sul.png',
        },
        logoUrl: '/images/teams/idl.png',
      },
      nacionality: {
        id: '',
        name: '',
        icon: '/images/flags/south-korea.png',
      },
      region: {
        id: '',
        name: '',
        icon: '/images/regions/lta-sul.png',
      },
      image: '/images/players/kuri.png',
    },
  },
  {
    score: 85,
    player: {
      uid: '5',
      name: 'Roamer',
      role: 'Support',
      team: {
        id: '',
        name: '',
        region: {
          id: '',
          name: '',
          icon: '/images/regions/lta-north.png',
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
        icon: '/images/regions/lta-north.png',
      },
      image: '/images/players/roamer.png',
    },
  },
];

export default function ResultsPage() {
  const [search, setSearch] = useState('');

  const filteredPlayers = mockPlayers.filter((result) => {
    return (
      result.player.name.toLowerCase().includes(search.toLowerCase())
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