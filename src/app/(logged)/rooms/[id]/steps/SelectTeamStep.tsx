'use client';

import { useEffect, useState } from 'react';
import { Room } from '@/types/RoomTypes';
import { Icon, Spinner } from '@/components';
import Image from 'next/image';

import styles from '../styles/SelectTeamStep.module.css';
import { useAuth } from '@/context/AuthContext';
import { TeamType } from '@/types/Team';
import { getTeamsFromRounds } from '@/services/teamsService';

type SelectTeamStepProps = {
    room: Room;
    onSelectTeam: (room: Room) => void;
    nextStep: () => void;
};

export default function SelectTeamStep({
  room,
  onSelectTeam,
  nextStep,
}: SelectTeamStepProps) {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user, loading: userLoading } = useAuth();

  useEffect(() => {
    console.log('Room: ', room)
    const fetchTeams = async () => {
      const teams = await getTeamsFromRounds(room.roundIds);
      console.log('room.roundIds', room.roundIds)

      setTeams(teams);
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (!user || loading || userLoading) {
    return <Spinner center={true} />;
  }

  const isLeader = room.host === user.uid;


  if (!isLeader) {
    return (
      <div className={styles.waiting}>
        <p>Aguardando o líder escolher o time...</p>
      </div>
    );
  }
  const handleSelectTeam = (team: TeamType) => {
    setSelectedTeamId(team.id)
    onSelectTeam({
      ...room,
      selectedTeam: team, 
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Selecione um time para iniciar a avaliação</h2>

      <div className={styles.grid}>
        {teams.map((team) => (
          <div
            key={team.id}
            className={`${styles.card} ${selectedTeamId === team.id ? styles.selected : ''}`}
            onClick={() => handleSelectTeam(team)} >
            {team.logoUrl &&
                            <Image
                              src={team.logoUrl}
                              width={64}
                              height={64}
                              alt={team.name}
                              className={styles.logo}
                            />
            }
            <h3 className={styles.name}>{team.name}</h3>
          </div>
        ))}
      </div>

      <button
        className={styles.nextButton}
        disabled={!selectedTeamId}
        onClick={nextStep}
      >
                Próximo <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}
