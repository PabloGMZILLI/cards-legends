import { db } from '@/lib/firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';
import { Match, MatchWithDetails, RoundWithChampionship } from '@/types/RoomTypes';
import { Round } from '@/types/RoomTypes';
import { TeamType } from '@/types/Team';
import { createConverter } from '@/converters/firestoreConverter';

type CreateMatchPayload = {
    championshipId: string;
    roundId: string;
    teamAId: string;
    teamBId: string;
    winner: 'teamA' | 'teamB' | null;
    date: string; // no formato YYYY-MM-DD
};

export const getMatches = async (): Promise<MatchWithDetails[]> => {
    const snapshot = await getDocs(collection(db, 'matches'));
    const matches: MatchWithDetails[] = [];

    for (const matchDoc of snapshot.docs) {
        const data = matchDoc.data() as Match;

        const [roundSnap, teamASnap, teamBSnap] = await Promise.all([
            getDoc(data.round),
            getDoc(data.teamA),
            getDoc(data.teamB),
        ]);

        const championshipSnap = roundSnap.exists() && roundSnap.data().championship
            ? await getDoc(roundSnap.data().championship)
            : null;

        matches.push({
            ...data,
            id: matchDoc.id,
            roundData: roundSnap.exists()
            ? {
                  ...roundSnap.data(),
                  id: roundSnap.id,
                  championshipData: championshipSnap?.exists()
                  ? { ...championshipSnap.data(), id: championshipSnap.id }
                  : undefined,
              } as RoundWithChampionship
            : undefined,
            teamAData: teamASnap.exists()
            ? { ...teamASnap.data(), id: teamASnap.id } as TeamType
            : undefined,
            teamBData: teamBSnap.exists()
            ? { ...teamBSnap.data(), id: teamBSnap.id } as TeamType
            : undefined,
        });
    }

    return matches;
};

export const deleteMatch = async (id: string) => {
    const ref = doc(db, 'matches', id);
    await deleteDoc(ref);
};

export const createMatch = async (data: CreateMatchPayload): Promise<void> => {
    const { roundId, teamAId, teamBId } = data;

    const roundRef = doc(db, 'rounds', roundId).withConverter(
        createConverter<Round>()
    );

    const teamARef = doc(db, 'teams', teamAId).withConverter(
        createConverter<TeamType>()
    );

    const teamBRef = doc(db, 'teams', teamBId).withConverter(
        createConverter<TeamType>()
    );

    const match: Omit<Match, 'id' | 'winner'> = {
        round: roundRef,
        teamA: teamARef,
        teamB: teamBRef,
    };

    await addDoc(collection(db, 'matches'), match);
};
