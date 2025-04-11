import { getDoc } from 'firebase/firestore';
import { TeamType } from '@/types/Team';
import { getRoundsByIds } from './roundService';

export const getTeamsFromRounds = async (roundIds: string[]): Promise<TeamType[]> => {
  const rounds = await getRoundsByIds(roundIds);

  const allRefs = rounds.flatMap(round => round.teams);

  const uniqueRefs = Array.from(
    new Map(allRefs.map(ref => [ref.id, ref])).values()
  );

  const teamSnaps = await Promise.all(uniqueRefs.map(ref => getDoc(ref)));

  return teamSnaps
    .filter(snap => snap.exists())
    .map(snap => ({ ...snap.data(), id: snap.id,  }));
};
