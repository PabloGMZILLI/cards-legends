// src/services/roundService.ts
import { db } from '@/lib/firebase';
import { Round } from '@/types/RoomTypes';
import { doc, DocumentData, getDoc } from 'firebase/firestore';

export const getRoundsByIds = async (roundIds: string[]): Promise<Round[]> => {
  const rounds: Round[] = [];

  for (const id of roundIds) {
    const roundSnap: DocumentData = await getDoc(doc(db, 'rounds', id));
    if (roundSnap.exists()) {
      rounds.push({ ...roundSnap.data(), id: roundSnap.id } as Round);
    }
  }

  return rounds;
};
