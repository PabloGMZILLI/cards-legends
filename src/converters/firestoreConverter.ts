/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export function createConverter<T extends { id?: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: T): DocumentData {
      const { id, ...rest } = data;
      return rest; // remove 'id' antes de salvar no Firestore
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      const data = snapshot.data(options);
      return {
          ...data,
          id: snapshot.id,
      } as T;
    },
  };
}
