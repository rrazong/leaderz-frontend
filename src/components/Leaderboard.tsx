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
    if (score < par) return 'text-yellow-400'; // birdie or better
    if (score > par) return 'text-green-400'; // bogey or worse
    return 'text-white';
  };

  return (
    <div className="card p-0 bg-[#222]">
      <div
        className="relative w-full"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table
          className="min-w-full border border-[#ffe14d]"
          style={{
            minWidth: '600px',
            background: '#175c2c',
            color: '#ffe14d',
          }}
        >
          <thead className="bg-[#175c2c] text-[#ffe14d]">
            <tr style={{ borderBottom: '4px solid #ffe14d' }}>
              <th
                className="sticky left-0 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10 w-16"
                style={{ minWidth: 40 }}
              >
                Place
              </th>
              <th
                className="sticky left-16 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10 w-48"
                style={{ minWidth: 120 }}
              >
                Team
              </th>
              {holes.map(hole => (
                <th
                  key={hole}
                  className="p-2 border-r border-[#ffe14d] border-b border-b-[#ffe14d]"
                  style={{ width: 20, minWidth: 20, maxWidth: 20, borderBottom: '1px solid #ffe14d' }}
                >
                  {hole}
                </th>
              ))}
              <th className="p-2" style={{ minWidth: 40 }}>
                Score
              </th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10 w-16"></th>
              <th className="sticky left-16 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10 w-48">Par</th>
              {holes.map(hole => (
                <th key={hole} className="p-2 border-r border-[#ffe14d]" style={{ width: 20, minWidth: 20, maxWidth: 20, borderTop: 'none' }}>
                  {pars[hole]}
                </th>
              ))}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody className="bg-[#222] text-white">
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={holes.length + 3} className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl">🏌️‍♂️</div>
                    <div className="text-lg font-semibold">No Teams Yet!</div>
                    <div className="text-sm">Looks like everyone's still warming up on the driving range...</div>
                    <div className="text-xs text-gray-400">Tell your friends to join the tournament!</div>
                  </div>
                </td>
              </tr>
            ) : (
              leaderboard.map((team, index) => (
                <tr key={team.team_id} className="border-t border-[#ffe14d]">
                  <td className="sticky left-0 bg-[#222] p-2 border-r border-[#ffe14d] z-10 w-16 text-[#ffe14d] font-bold">
                    {index + 1}
                  </td>
                  <td className="sticky left-16 bg-[#222] p-2 border-r border-[#ffe14d] z-10 w-48 font-semibold text-[#ffe14d]">
                    {team.team_name}
                  </td>
                  {holes.map(hole => (
                    <td
                      key={hole}
                      className={`p-2 border-r border-[#ffe14d] text-center ${getScoreColor(team.scores?.[hole], pars[hole])}`}
                      style={{ width: 20, minWidth: 20, maxWidth: 20 }}
                    >
                      {team.scores?.[hole] || '-'}
                    </td>
                  ))}
                  <td className="p-2 font-bold text-center text-[#ffe14d]">{team.total_score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        @media (max-width: 900px) {
          table {
            min-width: 600px;
          }
          th, td {
            min-width: 30px;
            width: 30px;
            max-width: 30px;
          }
          .sticky.left-0, .sticky.left-16 {
            position: sticky;
            left: 0;
            z-index: 10;
          }
        }
        @media (orientation: landscape) and (max-width: 900px) {
          table {
            min-width: unset !important;
            width: 100% !important;
          }
          th, td {
            min-width: 30px !important;
            width: 30px !important;
            max-width: 30px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard; 