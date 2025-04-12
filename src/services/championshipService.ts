import { createConverter } from '@/converters/firestoreConverter';
import { db } from '@/lib/firebase';
import { Championship, ChampionshipWithRegion, Region } from '@/types/RoomTypes';
import { getDocs, collection, getDoc, addDoc, doc, DocumentReference } from 'firebase/firestore';

export const getChampionships = async (): Promise<ChampionshipWithRegion[]> => {
  const snapshot = await getDocs(collection(db, 'championships'));
  const championships: ChampionshipWithRegion[] = [];

  for (const docSnap of snapshot.docs) {
    const data = { ...docSnap.data(), id: docSnap.id } as Championship;
    let regionData: Region | undefined;

    try {
      const regionSnap = await getDoc(data.region);
      if (regionSnap.exists()) {
        regionData = {
            ...regionSnap.data(),
            id: regionSnap.id,
        } as Region;
      }
    } catch (err) {
      console.warn('Erro ao carregar região do campeonato', err);
    }

    championships.push({
      ...data,
      regionData,
    });
  }

  return championships;
};


export const createChampionship = async (data: {
    name: string;
    split: string;
    year: number;
    regionId: string;
  }) => {
    const { name, split, year, regionId } = data;
  
    const regionRef: DocumentReference<Region> = doc(db, 'regions', regionId).withConverter(createConverter<Region>());

    const championship: Omit<Championship, 'id'> = {
        name,
        split,
        year,
        region: regionRef,
        matches: [],
    };
  
    await addDoc(collection(db, 'championships'), championship);
  };