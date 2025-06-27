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
                className="sticky left-0 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10"
                style={{ minWidth: 60, width: 60 }}
              >
                Place
              </th>
              <th
                className="sticky left-16 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10"
                style={{ minWidth: 120, width: 120 }}
              >
                Team
              </th>
              {holes.map(hole => (
                <th
                  key={hole}
                  className="p-2 border-r border-[#ffe14d] border-b border-b-[#ffe14d]"
                  style={{ width: 30, minWidth: 30, maxWidth: 30, borderBottom: '1px solid #ffe14d' }}
                >
                  {hole}
                </th>
              ))}
              <th className="p-2" style={{ minWidth: 60, width: 60 }}>
                Score
              </th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10"></th>
              <th className="sticky left-16 bg-[#175c2c] p-2 border-r border-[#ffe14d] z-10">Par</th>
              {holes.map(hole => (
                <th key={hole} className="p-2 border-r border-[#ffe14d]" style={{ width: 30, minWidth: 30, maxWidth: 30, borderTop: 'none' }}>
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
                  <td className="sticky left-0 bg-[#222] p-2 border-r border-[#ffe14d] z-10 text-[#ffe14d] font-bold" style={{ minWidth: 60, width: 60 }}>
                    {index + 1}
                  </td>
                  <td className="sticky left-16 bg-[#222] p-2 border-r border-[#ffe14d] z-10 font-semibold text-[#ffe14d]" style={{ minWidth: 120, width: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {team.team_name}
                  </td>
                  {holes.map(hole => (
                    <td
                      key={hole}
                      className={`p-2 border-r border-[#ffe14d] text-center ${getScoreColor(team.scores?.[hole], pars[hole])}`}
                      style={{ width: 30, minWidth: 30, maxWidth: 30 }}
                    >
                      {team.scores?.[hole] || '-'}
                    </td>
                  ))}
                  <td className="p-2 font-bold text-center text-[#ffe14d]" style={{ minWidth: 60, width: 60 }}>{team.total_score}</td>
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
            min-width: 20px;
            width: 20px;
            max-width: 20px;
          }
          th:first-child, td:first-child {
            min-width: 60px !important;
            width: 60px !important;
          }
          th:nth-child(2), td:nth-child(2) {
            min-width: 120px !important;
            width: 120px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          th:last-child, td:last-child {
            min-width: 60px !important;
            width: 60px !important;
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
            min-width: 20px !important;
            width: 20px !important;
            max-width: 20px !important;
          }
          th:first-child, td:first-child {
            min-width: 60px !important;
            width: 60px !important;
          }
          th:nth-child(2), td:nth-child(2) {
            min-width: 120px !important;
            width: 120px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          th:last-child, td:last-child {
            min-width: 60px !important;
            width: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard; 