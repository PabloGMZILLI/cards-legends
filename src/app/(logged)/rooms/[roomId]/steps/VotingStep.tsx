'use client';

import { useState } from 'react';
import { Button, EditPlayerCard } from '@/components';

import styles from '../styles/VotingStep.module.css';
import { mockPlayers, mockVotes } from '@/mocks';

type PlatformUser = {
    id: string;
    name: string;
}

export type Vote = {
    user: PlatformUser;
    playerId: string;
    score: number;
};

const mockIsLeader = true;

const mockCurrentUser = {
    id: '123',
    name: 'Pablo',
}

export default function VotingStep() {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [votes, setVotes] = useState<Vote[]>(mockVotes);
    const [myScore, setMyScore] = useState(50);
    const currentUserId = mockCurrentUser.id;

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
                (v) => !(v.playerId === currentPlayer.id && v.user.id === currentUserId)
            );
            return [
                ...filtered,
                { playerId: currentPlayer.id, user: mockCurrentUser, score: myScore },
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
                    v.user.id === currentUserId
            );
            setMyScore(existingVote?.score || 50);
        } else {
            alert('Fim das votações!');
        }
    };

    const alreadyVoted = votes.some(
        (v) => v.playerId === currentPlayer.id && v.user.id === currentUserId
    );

    const renderVotesForPlayer = (playerId: string) => {
        const playerVotes = getPlayerVotes(playerId);
        return playerVotes.map((vote) => (
            <p key={`${vote.user.id}-${vote.playerId}`}>
                🗳️ <strong>{vote.user.name}</strong> votou.
            </p>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.votingSection}>
                <EditPlayerCard
                    player={currentPlayer}
                    score={myScore}
                    onScoreChange={handleVoteChange}
                    onSave={handleSaveVote}
                    voted={alreadyVoted}
                    averageScore={getScoreAverage(currentPlayer.id)}
                />
            </div>
            <p className={styles.voteStatus}>
                Votos recebidos: {getPlayerVotes(currentPlayer.id).length} / 3
            </p>

            <div className={styles.voteList}>
                {renderVotesForPlayer(currentPlayer.id)}
            </div>

            {mockIsLeader && (
                <Button onClick={goToNextPlayer} disabled={!hasEveryoneVoted()}>
                    Próximo
                </Button>
            )}
        </div>
    );
}
