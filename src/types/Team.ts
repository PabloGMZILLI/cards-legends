import { DocumentReference } from "firebase/firestore";
import { Nacionality, Region } from "./RoomTypes";

export type TeamType = {
    id: string;
    name: string;
    logoUrl: string;
    region: string;
};

export type TeamPlayerRole = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';

export type TeamPlayer = {
    uid: string
    name: string;
    role: TeamPlayerRole;
    image: string;
    team: DocumentReference<TeamType> | TeamType;
    region: DocumentReference<Region> | Region;
    nacionality: DocumentReference<Nacionality> | Nacionality;
};