'use client';

import { useEffect, useState } from 'react';
import { Button, RoomCard, Spinner } from '@/components';
import { RoomCardProps } from '@/components/RoomCard/types';
import { useRouter } from 'next/navigation';

import styles from './RoomsPage.module.css';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        if (!res.ok) throw new Error('Erro ao buscar salas');
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error('Erro ao carregar salas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerTools}>
        <Button onClick={() => router.push('/rooms/create')}>Criar Nova Sala</Button>
      </div>

      <h1 className={styles.title}>Salas Disponíveis</h1>

      {loading ? (
        <Spinner center />
      ) : (
        <div className={styles.roomsGrid}>
          {rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <p className={styles.empty}>Nenhuma sala disponível no momento.</p>
          )}
        </div>
      )}
    </div>
  );
}
