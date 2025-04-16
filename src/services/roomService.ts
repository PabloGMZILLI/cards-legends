import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Room } from '@/types/RoomTypes';
import { CustomUser } from '@/types';

type CreateRoomInput = {
    name: string;
    region: string;
    roundIds: string[];
    maxPlayers: number;
};

export const createRoom = async (user: CustomUser, data: CreateRoomInput) => {
    const room:  Omit<Room, 'id'> = {
        name: data.name,
        region: data.region,
        roundIds: data.roundIds,
        users: [],
        specs: [],
        host: user.uid,
        status: 'waiting',
        currentStep: 'lobby',
        maxPlayers: data.maxPlayers,
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'rooms'), room);
    return docRef.id;
};

export async function getRoomByIdService(id: string): Promise<Room | null> {
    const ref = doc(db, 'rooms', id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as Room;
}

export async function updateRoom(id: string, partial: Partial<Room>): Promise<Room> {
    const ref = doc(db, 'rooms', id);

    await updateDoc(ref, {
        ...partial,
        updatedAt: new Date(),
    });

    const updated = await getDoc(ref);

    return {
        id: updated.id,
        ...updated.data(),
    } as Room;
}

export async function getAllRoomsService() {
    const snapshot = await getDocs(collection(db, 'rooms'));

    const rooms = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            return {
                id: docSnap.id,
                name: data.name,
                host: data.host,
                players: data.users?.length || 0,
                maxPlayers: data.maxPlayers || 10,
                playersIds: data.users?.map((u: any) => u.uid),
            };
        })
    );

    return rooms;
}