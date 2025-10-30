'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LobbyStep from './steps/LobbyStep';
import Header from './components/Header';
import SelectTeamStep from './steps/SelectTeamStep';
import VotingStep from './steps/VotingStep';
import SelectPlayersStep from './steps/SelectPlayersStep';
import { Room, RoomStep } from '@/types/RoomTypes';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function RoomPage() {
  const [room, setRoom] = useState<Room | null>(null);
  const [currentStep, setCurrentStep] = useState<RoomStep>('lobby');
  const { user, loading } = useAuth();
  const params = useParams();

  useEffect(() => {
    const roomId = params.id as string;
    const unsub = onSnapshot(doc(db, 'rooms', roomId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Room;
        setRoom({
          ...data,
          id: docSnap.id, 
        });
        setCurrentStep(data.currentStep || 'lobby');
      }
    });

    return () => unsub();
  }, [params.id]);

  useEffect(() => {
    const joinRoom = async () => {
      if (!user || !room) return;

      const isInUsers = room.users.some(u => u.uid === user.uid);
      const isInSpecs = room.specs.some(s => s.uid === user.uid);

      if (isInUsers || isInSpecs) return;

      await updateRoom({ users: [...room.users, user] });
    };

    joinRoom();
  }, [room]);

  if (!user || loading || !room) {
    return <Spinner />;
  }

  const updateRoom = async (partial: Partial<Room>) => {
    if (!room) return;

    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: 'PATCH',
        body: JSON.stringify(partial),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar sala');
      }

      const updatedRoom = await res.json();
      setRoom(updatedRoom);
    } catch (err) {
      console.error('Falha ao atualizar sala:', err);
    }
  };

  const goToStep = async (step: RoomStep) => {
    setCurrentStep(step);
    await updateRoom({ currentStep: step });
  };

  return (
    <div>
      <Header
        roomName={room.name}
        step={currentStep}
        status={room.status}
      />

      {currentStep === 'lobby' && (
        <LobbyStep
          room={room}
          onUpdateRoom={updateRoom}
          nextStep={() => goToStep('selectTeam')}
        />
      )}
      {currentStep === 'selectTeam' && (
        <SelectTeamStep
          room={room}
          onSelectTeam={updateRoom}
          nextStep={() => goToStep('selectPlayer')}
        />
      )}
      {currentStep === 'selectPlayer' && (
        <SelectPlayersStep
          room={room}
          onUpdateRoom={updateRoom}
          nextStep={() => goToStep('voting')}
        />
      )}
      {currentStep === 'voting' && (
        <VotingStep
          room={room}
          onUpdateRoom={updateRoom}
          nextStep={() => goToStep('selectPlayer')}
        />
      )}
    </div>
  );
}
