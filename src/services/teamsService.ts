import { db } from '@/lib/firebase';
import { TeamType, TeamWithRegion } from '@/types/Team';
import { Match, Region } from '@/types/RoomTypes';
import { addDoc, collection, deleteDoc, doc, DocumentReference, getDoc, getDocs, query, where } from 'firebase/firestore';
import { createConverter } from '@/converters/firestoreConverter';

export const createTeam = async (data: {
  name: string;
  logoUrl: string;
  regionId: string;
}) => {
  const { name, logoUrl, regionId } = data;

  const regionRef = doc(db, 'regions', regionId).withConverter(
    createConverter<Region>()
  );

  const team: Omit<TeamType, 'id'> = {
    name,
    logoUrl,
    region: regionRef,
  };

  const docRef = await addDoc(collection(db, 'teams'), team);
  return { id: docRef.id };
};


export const getTeams = async (): Promise<TeamWithRegion[]> => {
  const snapshot = await getDocs(collection(db, 'teams'));
  const teams: TeamWithRegion[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data() as TeamType;

    let regionData;

    try {
      const regionSnap = await getDoc(data.region);
      if (regionSnap.exists()) {
        regionData = {
          ...regionSnap.data(),
          id: regionSnap.id,
        } as Region;
      }
    } catch (err) {
      console.warn('Erro ao buscar região:', err);
    }

    teams.push({
      ...data,
      id: docSnap.id,
      regionData: regionData as Region,
    });
  }

  return teams;
};

export const deleteTeam = async (id: string) => {
  const ref = doc(db, 'teams', id);
  await deleteDoc(ref);
};

export const getTeamsFromRounds = async (roundIds: string[]): Promise<TeamType[]> => {
  const roundRefs = roundIds.map((id) => doc(db, 'rounds', id));

  const matchesQuery = query(
    collection(db, 'matches'),
    where('round', 'in', roundRefs)
  );

  const matchSnap = await getDocs(matchesQuery);
  console.log('matchSnap', matchSnap)

  const allTeamRefs: DocumentReference[] = [];

  matchSnap.forEach((snap) => {
    const data = snap.data() as Match;
    if (data.teamA) allTeamRefs.push(data.teamA);
    if (data.teamB) allTeamRefs.push(data.teamB);
  });

  const uniqueTeamRefs = Array.from(
    new Map(allTeamRefs.map((ref) => [ref.id, ref])).values()
  );

  const teamSnaps = await Promise.all(uniqueTeamRefs.map((ref) => getDoc(ref)));

  const teamMap = new Map<string, TeamType>();

  teamSnaps.forEach((snap) => {
    if (snap.exists()) {
      const team = { id: snap.id, ...snap.data() } as TeamType;
      teamMap.set(team.id, team);
    }
  });

  return Array.from(teamMap.values());
};