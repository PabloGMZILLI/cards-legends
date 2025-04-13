import { collection, getDocs, doc, getDoc, addDoc, where, query, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamPlayer, TeamPlayerWithDetails, TeamType } from '@/types/Team';
import { createConverter } from '@/converters/firestoreConverter';
import { Nacionality } from '@/types/RoomTypes';


export const getPlayers = async (): Promise<TeamPlayer[]> => {
  const snapshot = await getDocs(collection(db, 'teamPlayers'));
  const players: TeamPlayer[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();

    const player: TeamPlayer = {
      uid: docSnap.id,
      name: data.name,
      role: data.role,
      image: data.image,
      team: data.team,
      nacionality: data.nacionality,
    };

    players.push(player);
  }

  return players;
};

export const createPlayer = async (data: {
  name: string;
  image: string;
  role: TeamPlayer['role'];
  teamId: string;
  nacionalityId: string;
}) => {
  const teamRef = doc(db, 'teams', data.teamId).withConverter(createConverter<TeamType>());
  const nacionalityRef = doc(db, 'nacionalities', data.nacionalityId).withConverter(createConverter<Nacionality>());

  const player: Omit<TeamPlayer, 'uid'> = {
    name: data.name,
    image: data.image,
    role: data.role,
    team: teamRef,
    nacionality: nacionalityRef,
  };
  console.log('player', player);

  
  const docRef = await addDoc(collection(db, 'teamPlayers'), player);
  return { id: docRef.id };
};

export const getPlayerDetails = async (id: string): Promise<TeamPlayer | null> => {
  const ref = doc(db, 'teamPlayers', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return {
    uid: snap.id,
    ...(snap.data() as Omit<TeamPlayer, 'uid'>),
  };
};

export const deletePlayer = async (id: string) => {
  const ref = doc(db, 'teamPlayers', id);
  await deleteDoc(ref);
};


export const getPlayersByTeam = async (teamId: string): Promise<TeamPlayer[]> => {
  const playersRef = collection(db, 'teamPlayers');
  const teamDocRef = doc(db, 'teams', teamId);

  const q = query(playersRef, where('team', '==', teamDocRef));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) => ({
    ...(docSnap.data() as TeamPlayer),
    uid: docSnap.id,
  }));
};

export const getPlayersWithDetails = async (): Promise<TeamPlayerWithDetails[]> => {
  const snapshot = await getDocs(collection(db, 'teamPlayers'));
  const players: TeamPlayerWithDetails[] = [];

  for (const docSnap of snapshot.docs) {
    const playerData = docSnap.data() as TeamPlayer;

    let teamData: TeamType | undefined;
    let nacionalityData: Nacionality | undefined;

    try {
      const teamSnap = await getDoc(playerData.team);

      if (teamSnap.exists()) {
        teamData = { ...teamSnap.data(), id: teamSnap.id } as TeamType;
      }

      const nacionalitySnap = await getDoc(playerData.nacionality);
      if (nacionalitySnap.exists()) {
        nacionalityData = { ...nacionalitySnap.data(), id: nacionalitySnap.id } as Nacionality;
      }
    } catch (err) {
      console.warn('Erro ao carregar dados relacionados ao jogador', err);
    }

    players.push({
      ...playerData,
      uid: docSnap.id,
      teamData,
      nacionalityData,
    });
  }

  return players;
};

export const updatePlayer = async (
  id: string,
  data: {
    name: string;
    image: string;
    role: TeamPlayer['role'];
    teamId: string;
    nacionalityId: string;
  }
): Promise<void> => {
  const teamRef = doc(db, 'teams', data.teamId).withConverter(createConverter<TeamType>());
  const nacionalityRef = doc(db, 'nacionalities', data.nacionalityId).withConverter(
    createConverter<Nacionality>()
  );

  const playerRef = doc(db, 'teamPlayers', id);

  await updateDoc(playerRef, {
    name: data.name,
    image: data.image,
    role: data.role,
    team: teamRef,
    nacionality: nacionalityRef,
  });
};