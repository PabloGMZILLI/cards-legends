'use client';

import { useState } from 'react';
import { Button, EditPlayerCard } from '@/components';

import styles from '../styles/VotingStep.module.css';
import { mockVotes, mockUser } from '@/mocks';
import { RoomVote, VotingStepProps } from '@/types/RoomTypes';
import { TeamPlayer, TeamType } from '@/types/Team';


const mockIsLeader = true;

export default function VotingStep({
    room,
    currentUserId,
    nextStep,
    onUpdateRoom
}: VotingStepProps) {
    const [votes, setVotes] = useState<RoomVote[]>(mockVotes);
    const [myScore, setMyScore] = useState(50);

    const currentPlayerId = room.selectedPlayer?.id || '';

    const getPlayerVotes = (playerId: string): RoomVote[] => {
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
                (v) => !(v.playerId === currentPlayerId && v.user.uid === currentUserId)
            );
            return [
                ...filtered,
                {
                    playerId: currentPlayerId,
                    user: mockUser,
                    score: myScore,
                    roundId: room.id,
                    roomId: room.id,
                    roundIds: room.roundIds,
                    team: room.selectedPlayer?.team as TeamType,
                },
            ];
        });
        onUpdateRoom(room)
    };

    const hasEveryoneVoted = () => {
        return getPlayerVotes(currentPlayerId || '').length >= 3;
    };

    const alreadyVoted = votes.some(
        (v) => v.playerId === currentPlayerId && v.user.uid === currentUserId
    );

    const renderVotesForPlayer = (playerId: string) => {
        const playerVotes = getPlayerVotes(playerId);
        return playerVotes.map((vote) => (
            <p key={`${vote.user.uid}-${vote.playerId}`}>
                🗳️ <strong>{vote.user.displayName}</strong> votou.
            </p>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.votingSection}>
                <EditPlayerCard
                    player={room.selectedPlayer as TeamPlayer}
                    score={myScore}
                    onScoreChange={handleVoteChange}
                    onSave={handleSaveVote}
                    voted={alreadyVoted}
                    averageScore={getScoreAverage(currentPlayerId)}
                />
            </div>
            <p className={styles.voteStatus}>
                Votos recebidos: {getPlayerVotes(currentPlayerId).length} / 3
            </p>

            <div className={styles.voteList}>
                {renderVotesForPlayer(currentPlayerId)}
            </div>

            {mockIsLeader && (
                <Button onClick={nextStep} disabled={!hasEveryoneVoted()}>
                    Próximo
                </Button>
            )}
        </div>
    );
}
