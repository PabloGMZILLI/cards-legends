import { CustomUser } from ".";
import { TeamPlayer, TeamType } from "./Team";
import { DocumentReference, FieldValue } from "firebase/firestore";

export type RoomStep = 'lobby' | 'selectTeam' | 'selectPlayer' | 'voting' | 'summary';

export type RoomStatus = 'waiting' | 'inProgress' | 'finished';

export type ResolvedPlayer = Omit<TeamPlayer, 'team' | 'nacionality' | 'region'> & {
  team: TeamType;
  nacionality: Nacionality;
  region: Region;
};

export interface Room {
  id: string;
  name: string;
  region: string;
  roundIds: string[];
  users: CustomUser[];
  specs: CustomUser[];
  host: string;
  status: RoomStatus;
  currentStep: RoomStep;
  nextStep?: RoomStep;
  selectedTeam?: TeamType;
  selectedPlayer?: TeamPlayer;
  maxPlayers: number;
  createdAt: FieldValue;
  voted?: {
    players?: string[];
    teams?: string[];
  };
}

export type UserVote = {
  roomId: string;
  teamPlayer: TeamPlayer;
  user: CustomUser;
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
  winner: 'teamA' | 'teamB' | null;
};

export type MatchWithDetails = Match & {
  roundData?: RoundWithChampionship;
  teamAData?: TeamType;
  teamBData?: TeamType;
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