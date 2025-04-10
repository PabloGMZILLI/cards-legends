export type RoomStep = 'lobby' | 'selectTeam' | 'selectPlayer' | 'voting' | 'summary';

export type RoomStatus = 'waiting' | 'inProgress' | 'finished';

export interface Room {
  id: string;
  name: string;
  region: string;
  roundIds: string[];
  players: RoomUser[];
  specs: RoomUser[];
  leaderId: string;
  status: RoomStatus;
  currentStep: RoomStep;
  nextStep?: RoomStep;
}

export type RoomUser = {
  id: string;
  name: string;
};

export type RoomKeys = keyof Room;

export interface LobbyStepProps {
  room: Room;
  currentUserId: string;
  onUpdateRoom: (room: Room) => void;
  handleStartRoom: (step: RoomStep) => void;
}

export type TeamType = {
  id: string;
  name: string;
  logoUrl: string;
  region: string;
  players: TeamPlayer[];
};

export type TeamPlayer = {
  id: string;
  name: string;
  imageUrl: string;
  position: string;
  age: number;
};
