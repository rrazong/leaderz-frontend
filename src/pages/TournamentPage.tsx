import React from 'react';
import { useParams } from 'react-router-dom';
import { useTournamentData } from '../hooks/useTournamentData';
import Header from '../components/Header';
import Leaderboard from '../components/Leaderboard';
import Chat from '../components/Chat';

const TournamentPage: React.FC = () => {
  const { id: tournamentNumber } = useParams<{ id: string }>();
  const { tournament, leaderboardData, chatMessages, error } = useTournamentData(tournamentNumber);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header tournament={tournament} />
      <main className="container mx-auto">
        <Leaderboard data={leaderboardData} />
        <Chat messages={chatMessages} />
      </main>
    </div>
  );
};

export default TournamentPage; 