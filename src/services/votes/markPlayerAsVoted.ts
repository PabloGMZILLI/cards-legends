import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const markPlayerAsVoted = async (roomId: string, playerId: string) => {
  const roomRef = doc(db, 'rooms', roomId);

  await updateDoc(roomRef, {
    votes: { players: arrayUnion(playerId), }
  });
};