'use client';

import { useState } from 'react';
import styles from './RoomPage.module.css';
import { Button, PlayerCard } from '@/components';
import { Player } from '@/components/PlayerCard/types';

type Vote = {
    playerId: string;
    userId: string;
    score: number;
};

const mockPlayers: Player[] = [
    {
        id: '1',
        name: 'Titan',
        role: 'ADC',
        image: '/images/players/titan.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'Pain',
        stats: ['9/1/8', '10/3/13'],
    },
    {
        id: '2',
        name: 'Revolta',
        role: 'Jungle',
        image: '/images/players/revolta.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'paiN Gaming',
        stats: ['3/2/11', '7/0/9'],
    },
    {
        id: '3',
        name: 'Takeshi',
        role: 'Mid',
        image: '/images/players/takeshi.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'INTZ',
        stats: ['5/5/5', '8/1/7'],
    },
];

const mockUserId = 'user123';
const mockIsLeader = true;

export default function RoomPage() {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [votes, setVotes] = useState<Vote[]>([
        { playerId: '1', userId: 'user456', score: 88 },
        { playerId: '1', userId: 'user789', score: 92 },
    ]);
    const [myScore, setMyScore] = useState(50);

    const currentPlayer = mockPlayers[currentPlayerIndex];

    const getPlayerVotes = (playerId: string): Vote[] => {
        return votes.filter((v) => v.playerId === playerId);
    };

    const getScoreAverage = (playerId: string): number => {
        const playerVotes = getPlayerVotes(playerId);
        if (playerVotes.length === 0) return 0;
        const total = playerVotes.reduce((sum, v) => sum + v.score, 0);
        return Math.round(total / playerVotes.length);
    };

    const handleVoteChange = (value: number) => {
        setMyScore(value);
    };

    const handleSaveVote = () => {
        setVotes((prev) => {
            const filtered = prev.filter(
                (v) => !(v.playerId === currentPlayer.id && v.userId === mockUserId)
            );
            return [
                ...filtered,
                { playerId: currentPlayer.id, userId: mockUserId, score: myScore },
            ];
        });
    };

    const hasEveryoneVoted = () => {
        return getPlayerVotes(currentPlayer.id).length >= 3;
    };

    const goToNextPlayer = () => {
        if (currentPlayerIndex < mockPlayers.length - 1) {
            const nextIndex = currentPlayerIndex + 1;
            setCurrentPlayerIndex(nextIndex);

            const existingVote = votes.find(
                (v) =>
                    v.playerId === mockPlayers[nextIndex].id &&
                    v.userId === mockUserId
            );
            setMyScore(existingVote?.score || 50);
        } else {
            alert('Fim das votações!');
        }
    };

    const alreadyVoted = votes.some(
        (v) => v.playerId === currentPlayer.id && v.userId === mockUserId
    );

    const renderVotesForPlayer = (playerId: string) => {
        const playerVotes = getPlayerVotes(playerId);
        return playerVotes.map((vote) => (
            <p key={`${vote.userId}-${vote.playerId}`}>
                🗳️ <strong>{vote.userId}</strong> votou: <strong>{vote.score}</strong>
            </p>
        ));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.roomTitle}>Sala: Final LTA</h1>

            <PlayerCard
                player={currentPlayer}
                score={myScore}
                onScoreChange={handleVoteChange}
                onSave={handleSaveVote}
                voted={alreadyVoted}
                averageScore={getScoreAverage(currentPlayer.id)}
            />

            <p className={styles.voteStatus}>
                Votos recebidos: {getPlayerVotes(currentPlayer.id).length} / 3
            </p>

            <div className={styles.voteList}>
                {renderVotesForPlayer(currentPlayer.id)}
            </div>

            {mockIsLeader && (
                <Button onClick={goToNextPlayer} disabled={!hasEveryoneVoted()}>
                    Próximo jogador
                </Button>
            )}
        </div>
    );
}
