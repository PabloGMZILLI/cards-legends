'use client';

import { useEffect, useState } from 'react';
import LobbyStep from './steps/LobbyStep';
import Header from './components/Header';
import { Room, RoomStatus, RoomStep } from '@/types/RoomTypes';
import SelectTeamStep from './steps/SelectTeamStep';
import VotingStep from './steps/VotingStep';
import { mockRoom } from '@/mocks';
import SelectPlayersStep from './steps/SelectPlayersStep';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components';

export default function RoomPage() {
    const [room, setRoom] = useState<Room>(mockRoom);
    const [currentStep, setCurrentStep] = useState<RoomStep>('lobby');
    const { user, loading } = useAuth();

    useEffect(() => {
        if (user) {
            setRoom((prev) => {
                const alreadyIn = prev.users.find((u) => u.uid === user.uid);
                if (alreadyIn) {
                    return prev;
                }
                return ({ ...prev, users: [...prev.users, user], leaderId: user.uid })
            });
        }
    }, [user]);

    if (!user || loading) {
        return <Spinner />;
    }

    const updateRoom = (partial: Room) => {
        const status: RoomStatus = currentStep !== 'lobby' ? 'inProgress' : 'waiting'; // @TODO: Add the last status

        setRoom((prev) => ({ ...prev, ...partial, status }));
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
                    nextStep={() => setCurrentStep('selectTeam')}
                />
            )}
            {currentStep === 'selectTeam' && (
                <SelectTeamStep
                    room={room}
                    onSelectTeam={updateRoom}
                    nextStep={() => setCurrentStep('selectPlayer')}
                />
            )}
            {currentStep === 'selectPlayer' && (
                <SelectPlayersStep
                    room={room}
                    nextStep={() => setCurrentStep('voting')}
                    onUpdateRoom={updateRoom}
                />
            )}
            {currentStep === 'voting' && (
                <VotingStep
                    room={room}
                    nextStep={() => setCurrentStep('selectPlayer')}
                    onUpdateRoom={updateRoom}
                />
            )}

        </div>
    );
}
