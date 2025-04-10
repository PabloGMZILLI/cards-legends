export interface PlayerInfo {
    name: string;
    role: string;
    age: number;
    image: string;
}

export interface PlayerCardProps {
    player: Player;
    score: number;
    averageScore: number;
    voted: boolean;
    onScoreChange: (newScore: number) => void;
    onSave: (newScore: number) => void;
}

export type Player = {
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