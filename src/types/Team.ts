export type TeamType = {
    id: string;
    name: string;
    logoUrl: string;
    region: string;
    players: TeamPlayer[];
};

export type TeamPlayerRole = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';

export type TeamPlayer = {
    id: string
    name: string;
    role: TeamPlayerRole;
    image: string;
    team: TeamType
    regionIcon: string;
    nacionalityIcon: string;
    stats: [string, string];
};