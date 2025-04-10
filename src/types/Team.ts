export type TeamType = {
    id: string;
    name: string;
    logoUrl: string;
    region: string;
    players: TeamPlayer[];
};

export type TeamPlayer = {
    id: string
    name: string;
    role: string;
    image: string;
    teamLogo: string;
    teamName: string;
    regionIcon: string;
    nacionalityIcon: string;
    stats: [string, string];
};