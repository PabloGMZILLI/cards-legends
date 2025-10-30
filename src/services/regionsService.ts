import { db } from '@/lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const createRegion = async (name: string, icon: string) => {
  const ref = collection(db, 'regions');
  return await addDoc(ref, {
    name,
    icon, 
  });
};

export const getAllRegions = async () => {
  const snapshot = await getDocs(collection(db, 'regions'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteRegion = async (id: string) => {
  const ref = doc(db, 'regions', id);
  await deleteDoc(ref);
};
