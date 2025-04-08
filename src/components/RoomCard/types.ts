export type RoomCardProps = {
    id: string | number;
    name: string;
    host: string;
    players: number;
    maxPlayers: number;
    playersIds?: string[];
};