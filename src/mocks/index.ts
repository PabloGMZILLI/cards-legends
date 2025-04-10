import { Vote } from "@/app/(logged)/rooms/[roomId]/steps/VotingStep";
import { TeamPlayer, TeamType } from "@/types/Team";

export const mockPlayers: TeamPlayer[] = [
    {
        id: '1',
        name: 'Titan',
        role: 'ADC',
        image: '/images/players/titan.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'Pain',
        stats: ['9/1/8', '10/3/13'],
    },
    {
        id: '2',
        name: 'Revolta',
        role: 'Jungle',
        image: '/images/players/revolta.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'paiN Gaming',
        stats: ['3/2/11', '7/0/9'],
    },
    {
        id: '3',
        name: 'Takeshi',
        role: 'Mid',
        image: '/images/players/takeshi.png',
        teamLogo: '/images/teams/pain.png',
        nacionalityIcon: '/images/flags/br.png',
        regionIcon: '/images/regions/lta-sul.png',
        teamName: 'INTZ',
        stats: ['5/5/5', '8/1/7'],
    },
];

export const mockTeams: TeamType[] = [
    {
        id: 'team1',
        name: 'Pain',
        logoUrl: '/images/teams/pain.png',
        region: 'lta-sul',
        players: mockPlayers,
    },
    {
        id: 'team2',
        name: 'Fire Wolves',
        logoUrl: '/images/teams/pain.png',
        region: 'lta-sul',
        players: mockPlayers,
    },
];

export const mockVotes: Vote[] = [
    { user: { id: '1', name: 'Minerva' }, playerId: mockPlayers[0].id, score: 80 },
    { user: { id: '2', name: 'Baiano' }, playerId: mockPlayers[0].id, score: 60 },
    { user: { id: '3', name: 'Mylon' }, playerId: mockPlayers[0].id, score: 70 },
    { user: { id: '4', name: 'Revolta' }, playerId: mockPlayers[1].id, score: 60 }
]