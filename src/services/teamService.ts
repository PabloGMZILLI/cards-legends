import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamType } from '@/types/Team';
import { Match, Round } from '@/types/RoomTypes';

export const getTeams = async (): Promise<TeamType[]> => {
  try {
    const teamsRef = collection(db, 'teams');
    const snapshot = await getDocs(teamsRef);

    const teams: TeamType[] = snapshot.docs.map(doc => {
        const teamData = doc.data();

        return ({
        id: doc.id,
        name: teamData.name,
        logoUrl: teamData.logoUrl,
        region: teamData.region,
    })});

    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};


export const getTeamsFromRounds = async (rounds: Round[]): Promise<TeamType[]> => {
  const matchRefs = rounds.flatMap((r) => r.matchs);
  const teamRefsMap = new Map<string, any>(); // evitar duplicatas

  for (const matchRef of matchRefs) {
    const matchSnap = await getDoc(matchRef);
    if (matchSnap.exists()) {
      const match = matchSnap.data() as Match;

      [match.teamA, match.teamB].forEach((teamRef) => {
        if (!teamRefsMap.has(teamRef.path)) {
          teamRefsMap.set(teamRef.path, teamRef);
        }
      });
    }
  }

  const teams: TeamType[] = [];

  for (const ref of teamRefsMap.values()) {
    const teamSnap = await getDoc(ref);
    if (teamSnap.exists()) {
      teams.push({ ...(teamSnap.data() as Record<string, any>), id: teamSnap.id } as TeamType);
    }
  }

  return teams;
};