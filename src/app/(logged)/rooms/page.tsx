'use client';

import { useEffect, useState } from 'react';
import { Button, RoomCard } from '@/components';
import { RoomCardProps } from '@/components/RoomCard/types';
import { useRouter } from 'next/navigation';

import styles from './RoomsPage.module.css';

export default function RoomsPage() {
    const [rooms, setRooms] = useState<RoomCardProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Aqui futuramente será integrado com o Firestore
        const mockRooms: RoomCardProps[] = [
            { id: '1', name: 'Sala Alpha', host: '12312', players: 3, maxPlayers: 10 },
            { id: '2', name: 'Sala Beta', host: '123213', players: 7, maxPlayers: 10 },
        ];
        setRooms(mockRooms);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.containerTools}>
                <Button onClick={() => router.push('/rooms/create')}>Criar Nova Sala</Button>
            </div>
            <h1 className={styles.title}>Salas Disponíveis</h1>
            <div className={styles.roomsGrid}>
                {rooms.length > 0 ? (
                    rooms.map((room) => <RoomCard key={room.id} room={room} />)
                ) : (
                    <p className={styles.empty}>Nenhuma sala disponível no momento.</p>
                )}
            </div>
        </div>
    );
}
