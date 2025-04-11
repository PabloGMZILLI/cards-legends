import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamType } from '@/types/Team';

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
