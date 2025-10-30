'use client';

import { useState } from 'react';
import { EditPlayerCard, Spinner } from '@/components';
import styles from '../styles/VotingStep.module.css';
import { VotingStepProps } from '@/types/RoomTypes';
import { TeamPlayer, TeamType } from '@/types/Team';
import { useAuth } from '@/context/AuthContext';
import { useTempVotes } from '@/hooks/useTempVotes';
import { useResolvedPlayer } from '@/hooks/useResolvedPlayer';

import {
  saveTempVote,
  saveFinalVotes,
  markPlayerAsVoted,
} from '@/services/voteService';
import { NextButton } from '../components/NextButton';

export default function VotingStep({
  room,
  nextStep,
  onUpdateRoom,
}: VotingStepProps) {
  const [myScore, setMyScore] = useState<number | undefined>();
  const { user, loading } = useAuth();
  const currentPlayer = room.selectedPlayer as TeamPlayer;
  const resolvedPlayer = useResolvedPlayer(currentPlayer);
  const votes = useTempVotes(room.id, currentPlayer?.uid);

  console.log('resolvedPlayer: ', resolvedPlayer)
  if (!user || loading || !currentPlayer || !resolvedPlayer) {
    return <Spinner />;
  }

  const handleVoteChange = async (value: number) => {
    setMyScore(value);

    await saveTempVote(room.id, {
      score: value,
      user,
      roundIds: room.roundIds,
      roomId: room.id,
      team: room.selectedTeam as TeamType,
      teamPlayer: currentPlayer,
    });
  };

  const getScoreAverage = (): number => {
    if (votes.length === 0) return 0;
    const total = votes.reduce((sum, v) => sum + v.score, 0);
    return Math.round(total / votes.length);
  };

  const alreadyVoted = votes.some(v => v.user.uid === user.uid);
  const hasEveryoneVoted = votes.length >= room.users.length;
  const isLeader = room.host === user.uid;

  const handleNext = async () => {
    await saveFinalVotes(room.id, currentPlayer.uid);
    await markPlayerAsVoted(room.id, currentPlayer.uid);

    onUpdateRoom({
      ...room,
      voted: {
        ...room.voted,
        players: [...(room.voted?.players || []), currentPlayer.uid],
      },
    });

    nextStep();
  };

  return (
    <div className={styles.container}>
      <div className={styles.votingSection}>
        <EditPlayerCard
          player={resolvedPlayer}
          score={myScore}
          onScoreChange={handleVoteChange}
          voted={alreadyVoted}
          averageScore={getScoreAverage()}
        />
      </div>

      <p className={styles.voteStatus}>
        Votos recebidos: {votes.length} / {room.users.length}
      </p>

      {isLeader && (
        <NextButton
          onClick={handleNext} disabled={!hasEveryoneVoted}
        />
      )}
    </div>
  );
}
