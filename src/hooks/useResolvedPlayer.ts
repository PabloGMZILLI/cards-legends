import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamPlayer, TeamType } from '@/types/Team';
import { Nacionality, Region, ResolvedPlayer } from '@/types/RoomTypes';

function extractIdFromRef(ref: any): string | null {
  try {
    const pathSegments = ref?._key?.path?.segments;
    return Array.isArray(pathSegments) ? pathSegments[pathSegments.length - 1] : null;
  } catch {
    return null;
  }
}

export const useResolvedPlayer = (player: TeamPlayer | null) => {
  const [resolved, setResolved] = useState<ResolvedPlayer | null>(null);

  useEffect(() => {
    const resolvePlayer = async () => {
      if (!player) return;

      try {
        const teamId = extractIdFromRef(player.team);
        const natId = extractIdFromRef(player.nacionality);
        const regionId = extractIdFromRef(player.region);

        if (!teamId || !natId || !regionId) {
          return;
        }

        const [teamSnap, natSnap, regionSnap] = await Promise.all([
          getDoc(doc(db, 'teams', teamId)),
          getDoc(doc(db, 'nacionalities', natId)),
          getDoc(doc(db, 'regions', regionId)),
        ]);

        if (!teamSnap.exists() || !natSnap.exists() || !regionSnap.exists()) return;

        setResolved({
          ...player,
          team: { ...teamSnap.data(), id: teamSnap.id } as TeamType,
          nacionality: { ...natSnap.data(), id: natSnap.id } as Nacionality,
          region: { ...regionSnap.data(), id: regionSnap.id } as Region,
        });
      } catch (err) {
        console.error('Erro ao resolver jogador:', err);
      }
    };

    resolvePlayer();
  }, [player]);

  return resolved;
};
