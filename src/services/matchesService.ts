import { db } from '@/lib/firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';
import { Match, MatchWithDetails } from '@/types/RoomTypes';
import { Championship, Round } from '@/types/RoomTypes';
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

        const [roundSnap, teamASnap, teamBSnap, championshipSnap] = await Promise.all([
            getDoc(data.round),
            getDoc(data.teamA),
            getDoc(data.teamB),
            getDoc(data.championship),
        ]);

        matches.push({
            ...data,
            id: matchDoc.id,
            roundData: roundSnap.exists() ? { ...roundSnap.data(), id: roundSnap.id } as Round : undefined,
            teamAData: teamASnap.exists() ? { ...teamASnap.data(), id: teamASnap.id } as TeamType : undefined,
            teamBData: teamBSnap.exists() ? { ...teamBSnap.data(), id: teamBSnap.id } as TeamType : undefined,
            championshipData: championshipSnap.exists()
                ? { ...championshipSnap.data(), id: championshipSnap.id } as Championship
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
    const { championshipId, roundId, teamAId, teamBId } = data;

    const championshipRef = doc(db, 'championships', championshipId).withConverter(
        createConverter<Championship>()
    );

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
        championship: championshipRef,
        round: roundRef,
        teamA: teamARef,
        teamB: teamBRef,
    };

    await addDoc(collection(db, 'matches'), match);
};
