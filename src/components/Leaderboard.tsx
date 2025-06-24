import React from 'react';
import type { LeaderboardData } from '../types';

interface LeaderboardProps {
  data: LeaderboardData | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4">Loading leaderboard...</div>;
  }

  const { leaderboard, pars } = data;
  const holes = Object.keys(pars).map(Number).sort((a, b) => a - b);

  const getScoreColor = (score: number, par: number) => {
    if (score < par) return 'text-red-500';
    if (score > par) return 'text-blue-500';
    return 'text-black';
  };

  return (
    <div className="overflow-x-auto">
      <div className="relative">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="sticky left-0 bg-gray-100 p-2 border-r z-10 w-16">Place</th>
              <th className="sticky left-16 bg-gray-100 p-2 border-r z-10 w-48">Team</th>
              {holes.map(hole => (
                <th key={hole} className="p-2 border-r">{hole}</th>
              ))}
              <th className="p-2">Score</th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-gray-100 p-2 border-r z-10 w-16"></th>
              <th className="sticky left-16 bg-gray-100 p-2 border-r z-10 w-48">Par</th>
              {holes.map(hole => (
                <th key={hole} className="p-2 border-r">{pars[hole]}</th>
              ))}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr key={team.team_id} className="border-t">
                <td className="sticky left-0 bg-white p-2 border-r z-10 w-16">{index + 1}</td>
                <td className="sticky left-16 bg-white p-2 border-r z-10 w-48 font-semibold">{team.team_name}</td>
                {holes.map(hole => (
                  <td key={hole} className={`p-2 border-r text-center ${getScoreColor(team.scores?.[hole], pars[hole])}`}>
                    {team.scores?.[hole] || '-'}
                  </td>
                ))}
                <td className="p-2 font-bold text-center">{team.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard; 