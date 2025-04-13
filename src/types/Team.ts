import { DocumentReference } from "firebase/firestore";
import { Nacionality, Region } from "./RoomTypes";

export type TeamType = {
    id: string;
    name: string;
    logoUrl: string;
    region: DocumentReference<Region>;
};

export type TeamWithRegion = TeamType & {
    regionData: Region;
};

export type TeamPlayerRole = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support' | 'HeadCoach';

export type TeamPlayer = {
    uid: string
    name: string;
    role: TeamPlayerRole;
    image: string;
    team: DocumentReference<TeamType> | TeamType;
    nacionality: DocumentReference<Nacionality> | Nacionality;
};