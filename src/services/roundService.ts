// src/services/roundService.ts
import { createConverter } from '@/converters/firestoreConverter';
import { db } from '@/lib/firebase';
import { Championship, Round, RoundWithChampionship } from '@/types/RoomTypes';
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, query, where } from 'firebase/firestore';

export const getRoundsByIds = async (roundIds: string[]): Promise<Round[]> => {
  const rounds: Round[] = [];

  for (const id of roundIds) {
    const roundSnap: DocumentData = await getDoc(doc(db, 'rounds', id));
    if (roundSnap.exists()) {
      rounds.push({
        ...roundSnap.data(),
        id: roundSnap.id, 
      } as Round);
    }
  }

  return rounds;
};

export const getRounds = async (): Promise<RoundWithChampionship[]> => {
  const snapshot = await getDocs(collection(db, 'rounds'));
  const rounds: RoundWithChampionship[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data() as Round;

    let championshipData;

    try {
      const champSnap = await getDoc(data.championship);
      if (champSnap.exists()) {
        championshipData = {
          ...champSnap.data(),
          id: champSnap.id, 
        } as Championship;
      }
    } catch (err) {
      console.warn('Erro ao buscar campeonato:', err);
    }

    rounds.push({
      ...data,
      id: docSnap.id,
      championshipData,
    });
  }

  return rounds;
};

export const createRound = async (data: {
  name: string;
  roundNumber: number;
  startDate: string;
  endDate: string;
  championshipId: string;
}) => {
  const { name, roundNumber, startDate, endDate, championshipId } = data;

  const championshipRef: DocumentReference<Championship> = doc(db, 'championships', championshipId).withConverter(createConverter<Championship>());

  const round: Omit<Round, 'id'> = {
    name,
    roundNumber,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    championship: championshipRef,
    matchs: [],
  };

  await addDoc(collection(db, 'rounds'), round);
};

export const deleteRound = async (roundId: string) => {
  const roundRef = doc(db, 'rounds', roundId);
  await deleteDoc(roundRef);
};

export const getRoundsByChampionship = async (championshipId: string): Promise<Round[]> => {
  const q = query(
    collection(db, 'rounds').withConverter(createConverter<Round>()),
    where('championship', '==', doc(db, 'championships', championshipId)),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id, 
  }));
};