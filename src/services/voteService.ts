import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { UserVote } from '@/types/RoomTypes';
import { TeamPlayer, TeamType } from '@/types/Team';
import { CustomUser } from '@/types';

export const markPlayerAsVoted = async (roomId: string, playerId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) return;

  const data = roomSnap.data();
  const players = data.voted?.players || [];

  if (!players.includes(playerId)) {
    await updateDoc(roomRef, {
      'voted.players': [...players, playerId],
    });
  }
};

export const saveTempVote = async (
  roomId: string,
  vote: {
    teamPlayer: TeamPlayer;
    user: CustomUser;
    score: number;
    roundIds: string[];
    team: TeamType;
    roomId: string;
  }
) => {
  const voteRef = doc(db, `rooms/${roomId}/votesTemp`, vote.user.uid);
  await setDoc(voteRef, vote);
};

export const getTempVotesByPlayer = async (
  roomId: string,
  playerId: string
): Promise<UserVote[]> => {
  const snap = await getDocs(collection(db, `rooms/${roomId}/votesTemp`));
  return snap.docs
    .map((doc) => doc.data() as UserVote)
    .filter((v) => v.teamPlayer.uid === playerId);
};

export const saveFinalVotes = async (roomId: string, playerId: string) => {
  const tempVotesSnap = await getDocs(collection(db, `rooms/${roomId}/votesTemp`));

  const saveOps = tempVotesSnap.docs.map((docSnap) => {
    const vote = docSnap.data();
    const finalRef = doc(db, 'votes', `${roomId}_${vote.user.uid}_${playerId}`);
    return setDoc(finalRef, vote);
  });

  const deleteOps = tempVotesSnap.docs.map((docSnap) => deleteDoc(docSnap.ref));

  await Promise.all([...saveOps, ...deleteOps]);
};
