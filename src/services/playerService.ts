import { collection, getDocs, query, where, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamPlayer, TeamType } from '@/types/Team';
import { Nacionality, Region } from '@/types/RoomTypes';

export const getPlayersByTeam = async (teamId: string): Promise<TeamPlayer[]> => {
  const playersRef = collection(db, 'teamPlayers');
  const q = query(playersRef, where('team', '==', doc(db, 'teams', teamId)));

  const querySnapshot = await getDocs(q);
  const players: TeamPlayer[] = [];

  for (const docSnap of querySnapshot.docs) {
    const playerData = docSnap.data();
    const teamSnap: DocumentSnapshot<TeamType> = await getDoc(playerData.team);
    const regionSnap: DocumentSnapshot<Region> = await getDoc(playerData.region);
    const nacionalitySnap: DocumentSnapshot<Nacionality> = await getDoc(playerData.nacionality);


    players.push({
      uid: docSnap.id,
      ...playerData,
      team: teamSnap.exists() ? { ...teamSnap.data(), id: teamSnap.id  } : playerData.team,
      region: regionSnap.exists() ? { ...regionSnap.data(), id: regionSnap.id  } : playerData.region,
      nacionality: nacionalitySnap.exists() ? { ...nacionalitySnap.data(), id: nacionalitySnap.id  } : playerData.nacionality,
    } as TeamPlayer);
  }

  return players;
};
