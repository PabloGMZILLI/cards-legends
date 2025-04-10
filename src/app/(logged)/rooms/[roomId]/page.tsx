'use client';

import { useState } from 'react';
import LobbyStep from './steps/LobbyStep';
import Header from './components/Header';
import { Room, RoomStep } from '@/types/RoomTypes';
import SelectTeamStep from './steps/SelectTeamStep';

const mockRoom: Room = {
    id: 'room123',
    currentStep: 'lobby',
    nextStep: 'selectTeam',
    status: 'waiting',
    name: 'Sala dos Pro Players',
    region: 'BR',
    roundIds: ['round1', 'round2'],
    players: [
        { id: 'user1', name: 'João' },
        { id: 'user2', name: 'Maria' },
        { id: 'user3', name: 'Carlos' },
    ],
    specs: [
        { id: 'user4', name: 'Antonio' },
    ],
    leaderId: 'user1',
};

export default function RoomPage() {
    const [room, setRoom] = useState<Room>(mockRoom);
    const [currentStep, setCurrentStep] = useState<RoomStep>('lobby');
    const currentUserId = 'user1'; // simula o usuário logado

    const updateRoom = (partial: Room) => {
        setRoom((prev) => ({ ...prev, ...partial }));
    };

    console.log('currentStep: ', currentStep)
    return (
        <div>
            <Header
                roomName={room.name}
                step={currentStep}
                status="Aguardando jogadores"
            />


            {currentStep === 'lobby' && (
                <LobbyStep
                    room={room}
                    currentUserId={currentUserId}
                    onUpdateRoom={updateRoom}
                    handleStartRoom={(step: RoomStep) => setCurrentStep(step || currentStep)}
                />
            )}

            {currentStep === 'selectTeam' && (
                <SelectTeamStep
                    room={room}
                    currentUserId={currentUserId}
                    onHandleNext={() => { }}
                />
            )}

            {/* outros steps no futuro... */}
        </div>
    );
}
