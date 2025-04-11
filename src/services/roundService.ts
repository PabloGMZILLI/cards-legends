// src/services/roundService.ts
import { db } from '@/lib/firebase';
import { Round } from '@/types/RoomTypes';
import { doc, getDoc } from 'firebase/firestore';

export const getRoundsByIds = async (roundIds: string[]): Promise<Round[]> => {
  const rounds: Round[] = [];

  for (const id of roundIds) {
    const roundSnap = await getDoc(doc(db, 'rounds', id));
    if (roundSnap.exists()) {
      rounds.push({ uid: roundSnap.id, ...roundSnap.data() } as Round);
    }
  }

  return rounds;
};
