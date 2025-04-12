'use client';

import { useState } from 'react';
import { Button, EditPlayerCard, Spinner } from '@/components';

import styles from '../styles/VotingStep.module.css';
import { mockVotes, mockUser } from '@/mocks';
import { UserVote, VotingStepProps } from '@/types/RoomTypes';
import { TeamPlayer, TeamType } from '@/types/Team';
import { saveVote } from '@/services/votes/saveVote';
import { useAuth } from '@/context/AuthContext';
import { markPlayerAsVoted } from '@/services/votes/markPlayerAsVoted';


const mockIsLeader = true;

export default function VotingStep({
    room,
    nextStep,
    onUpdateRoom
}: VotingStepProps) {
    const [votes, setVotes] = useState<UserVote[]>(mockVotes);
    const [myScore, setMyScore] = useState(50);
    const { user, loading } = useAuth();

    if (!user || loading) {
        return <Spinner />;
    }

    const currentPlayer = room.selectedPlayer as TeamPlayer;

    const getPlayerVotes = (teamPlayer: TeamPlayer): UserVote[] => {
        return votes.filter((v) => v.teamPlayer.uid === teamPlayer.uid);
    };

    const getScoreAverage = (teamPlayer: TeamPlayer): number => {
        const playerVotes = getPlayerVotes(teamPlayer);
        if (playerVotes.length === 0) return 0;
        const total = playerVotes.reduce((sum, v) => sum + v.score, 0);
        return Math.round(total / playerVotes.length);
    };

    const handleVoteChange = (value: number) => {
        setMyScore(value);
    };

    const handleSaveVote = async () => {
        setVotes((prev) => {
            const filtered = prev.filter(
                (v) => !(v.teamPlayer === currentPlayer && v.user.uid === user.uid)
            );
            return [
                ...filtered,
                {
                    teamPlayer: currentPlayer,
                    user: mockUser,
                    score: myScore,
                    roundId: room.uid,
                    roomId: room.uid,
                    roundIds: room.roundIds,
                    team: room.selectedPlayer?.team as TeamType,
                },
            ];
        });
    };

    const hasEveryoneVoted = () => {
        return getPlayerVotes(currentPlayer || '').length >= 3;
    };

    const alreadyVoted = votes.some(
        (v) => v.teamPlayer === currentPlayer && v.user.uid === user.uid
    );

    const handleNext = async () => {
        await saveVote({
            teamPlayer: currentPlayer,
            user: user,
            score: myScore,
            roundIds: room.roundIds,
            team: room.selectedTeam as TeamType,
            roomId: room.uid,
        });
        await markPlayerAsVoted(room.uid, currentPlayer.uid);
        onUpdateRoom({
            ...room,
            voted: {
                ...room.voted,
                players: [...(room.voted?.players || []), currentPlayer.uid],
            }
        });
        nextStep();
    }

    return (
        <div className={styles.container}>
            <div className={styles.votingSection}>
                <EditPlayerCard
                    player={room.selectedPlayer as TeamPlayer}
                    score={myScore}
                    onScoreChange={handleVoteChange}
                    onSave={handleSaveVote}
                    voted={alreadyVoted}
                    averageScore={getScoreAverage(currentPlayer)}
                />
            </div>
            <p className={styles.voteStatus}>
                Votos recebidos: {getPlayerVotes(currentPlayer).length} / 3
            </p>

            {mockIsLeader && (
                <Button onClick={handleNext} disabled={!hasEveryoneVoted()}>
                    Próximo
                </Button>
            )}
        </div>
    );
}
