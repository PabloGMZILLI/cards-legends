/* eslint-disable @typescript-eslint/no-unused-vars */
import { Room, RoomVote } from "@/types/RoomTypes";
import { TeamPlayer, TeamType } from "@/types/Team";
import { IdTokenResult, User } from "firebase/auth";

export const mockUser: User = {
    uid: '123',
    displayName: 'Pablo',
    email: 'pablo@example.com',
    photoURL: null,
    emailVerified: true,
    phoneNumber: null,
    isAnonymous: false,
    providerData: [],
    metadata: {
        creationTime: "2023-01-01T00:00:00.000Z",
        lastSignInTime: "2023-01-02T00:00:00.000Z"
    },
    refreshToken: "",
    tenantId: null,
    delete: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    getIdToken: function (forceRefresh?: boolean): Promise<string> {
        throw new Error("Function not implemented.");
    },
    getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
        throw new Error("Function not implemented.");
    },
    reload: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    toJSON: function (): object {
        throw new Error("Function not implemented.");
    },
    providerId: ""
};

export const mockUser2 = { ...mockUser, uid: '456', displayName: 'Baiano' };
export const mockUser3 = { ...mockUser, uid: '342', displayName: 'Mylon' };
export const mockUser4 = { ...mockUser, uid: '654', displayName: 'Esa' };

export const mockTeams: TeamType[] = [
    {
        id: '7wkJpClJjyGPOEnecxDM',
        name: 'Pain',
        logoUrl: '/images/teams/pain.png',
        region: 'lta-sul',
    },
    {
        id: 'team2',
        name: 'Fire Wolves',
        logoUrl: '/images/teams/pain.png',
        region: 'lta-sul',
    },
];

export const mockRegion = {
    id: 'lta-sul',
    name: 'LTA Sul',
    icon: '/images/regions/lta-sul.png',
}

export const mockNacionality = {
    id: 'br',
    name: 'Brazil',
    icon: '/images/flags/br.png',
};

export const mockPlayers: TeamPlayer[] = [
    {
        uid: '1',
        name: 'Titan',
        role: 'ADC',
        image: '/images/players/titan.png',
        team: mockTeams[0],
        nacionality: mockNacionality,
        region: mockRegion,
    },
    {
        uid: '2',
        name: 'Revolta',
        role: 'Jungle',
        image: '/images/players/revolta.png',
        team: mockTeams[0],
        nacionality: mockNacionality,
        region: mockRegion,
    },
    {
        uid: '3',
        name: 'Takeshi',
        role: 'Mid',
        image: '/images/players/takeshi.png',
        team: mockTeams[0],
        nacionality: mockNacionality,
        region: mockRegion,
    },
    {
        uid: '4',
        name: 'Robo',
        role: 'Mid',
        image: '/images/players/robo.png',
        team: mockTeams[0],
        nacionality: mockNacionality,
        region: mockRegion,
    },
];

export const mockVotes: RoomVote[] = [
    {
        user: mockUser, teamPlayer: mockPlayers[0], score: 80,
        roundIds: ["1", "2"],
        team: mockTeams[0],
        roomId: "123"
    },
    {
        user: mockUser, teamPlayer: mockPlayers[0], score: 60,
        roundIds: ["1", "2"],
        team: mockTeams[0],
        roomId: "12"
    },
    {
        user: mockUser, teamPlayer: mockPlayers[0], score: 70,
        roundIds: ["1", "2"],
        team: mockTeams[0],
        roomId: "123"
    },
    {
        user: mockUser, teamPlayer: mockPlayers[0], score: 60,
        roundIds: ["1", "2"],
        team: mockTeams[0],
        roomId: "123"
    }
]

export const mockRoom: Room = {
    uid: 'room123',
    currentStep: 'lobby',
    nextStep: 'selectTeam',
    status: 'waiting',
    name: 'Sala dos Pro Players',
    region: 'BR',
    roundIds: ['1', '2'],
    users: [
        mockUser2,
        mockUser3,
    ],
    specs: [
        mockUser4,
    ],
    leaderId: '123',
    selectedTeam: mockTeams[0],
};

