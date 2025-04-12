import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';

export const getAllNacionalities = async () => {
  const snapshot = await getDocs(collection(db, 'nacionalities'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createNacionality = async (name: string, icon: string) => {
  const ref = collection(db, 'nacionalities');
  const docRef = await addDoc(ref, { name, icon });
  return { id: docRef.id, name, icon };
};

export const deleteNacionality = async (id: string) => {
  const ref = doc(db, 'nacionalities', id);
  await deleteDoc(ref);
};
