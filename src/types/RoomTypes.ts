import { User } from "firebase/auth";
import { TeamPlayer, TeamType } from "./Team";

export type RoomStep = 'lobby' | 'selectTeam' | 'selectPlayer' | 'voting' | 'summary';

export type RoomStatus = 'waiting' | 'inProgress' | 'finished';

export interface Room {
  id: string;
  name: string;
  region: string;
  roundIds: string[];
  users: Partial<User>[];
  specs: Partial<User>[];
  leaderId: string;
  status: RoomStatus;
  currentStep: RoomStep;
  nextStep?: RoomStep;
  selectedTeam?: TeamType;
  selectedPlayer?: TeamPlayer;
}

export type RoomVote = {
  roomId: string;
  playerId: string;
  user: Partial<User>;
  score: number;
  roundIds: string[];
  team: TeamType;
};

export type RoomKeys = keyof Room;

export interface LobbyStepProps {
  room: Room;
  currentUserId: string;
  onUpdateRoom: (room: Room) => void;
  nextStep: () => void;
}

export type SelectPlayersStepProps = {
  room: Room;
  currentUserId: string;
  nextStep: () => void;
  onUpdateRoom: (room: Room) => void;
};

export type VotingStepProps = {
  room: Room;
  currentUserId: string;
  nextStep: () => void;
  onUpdateRoom: (room: Room) => void;
};