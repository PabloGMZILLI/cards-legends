import { TeamPlayer } from "@/types/Team";

export interface PlayerCardProps {
    player: TeamPlayer;
    score: number;
    averageScore: number;
    voted: boolean;
    onScoreChange: (newScore: number) => void;
    onSave: (newScore: number) => void;
}
