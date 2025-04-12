import { User } from "firebase/auth";
import { TeamPlayer, TeamType } from "./Team";
import { DocumentReference } from "firebase/firestore";

export type RoomStep = 'lobby' | 'selectTeam' | 'selectPlayer' | 'voting' | 'summary';

export type RoomStatus = 'waiting' | 'inProgress' | 'finished';

export interface Room {
  uid: string;
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
  voted?: {
    players?: string[];
    teams?: string[];
  };
}

export type UserVote = {
  roomId: string;
  teamPlayer: TeamPlayer;
  user: Partial<User>;
  score: number;
  roundIds: string[];
  team: TeamType;
};

export type RoomKeys = keyof Room;

export interface LobbyStepProps {
  room: Room;
  onUpdateRoom: (room: Room) => void;
  nextStep: () => void;
}

export type SelectPlayersStepProps = {
  room: Room;
  nextStep: () => void;
  onUpdateRoom: (room: Room) => void;
};

export type VotingStepProps = {
  room: Room;
  nextStep: () => void;
  onUpdateRoom: (room: Room) => void;
};

export type Round = {
  id: string;
  name: string;
  roundNumber: number;
  startDate: Date;
  endDate: Date;
  matchs: DocumentReference<Match>[];
  championship: DocumentReference<Championship>;
}

export type RoundWithChampionship = Round & {
  id: string;
  championshipData?: Championship;
};

export type Championship = {
  id: string;
  name: string;
  split: string;
  year: number;
  region: DocumentReference<Region>;
  matches: DocumentReference<Match>[];
}

export type ChampionshipWithRegion = Championship & {
  regionData?: Region;
};

export type Match = {
  id: string;
  round: DocumentReference<Round>;
  teamA: DocumentReference<TeamType>;
  teamB: DocumentReference<TeamType>;
  date: Date;
  winner: 'teamA' | 'teamB' | null;
  championship: DocumentReference<Championship>;
};

export type MatchWithDetails = Match & {
  roundData?: Round;
  teamAData?: TeamType;
  teamBData?: TeamType;
  championshipData?: Championship;
}

export type Region = {
  id: string
  name: string;
  icon: string;
}

export type Nacionality = {
  id: string
  name: string;
  icon: string;
}