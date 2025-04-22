import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { UserVote } from '@/types/RoomTypes';

export function useTempVotes(roomId: string, playerId: string) {
  const [votes, setVotes] = useState<UserVote[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, `rooms/${roomId}/votesTemp`),
      where('teamPlayer.uid', '==', playerId)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data() as UserVote);
      setVotes(data);
    });

    return () => unsub();
  }, [roomId, playerId]);

  return votes;
}
