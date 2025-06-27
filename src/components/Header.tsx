import React from 'react';
import type { Tournament } from '../types';

interface HeaderProps {
  tournament: Tournament | null;
}

const Header: React.FC<HeaderProps> = ({ tournament }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">
            {tournament?.name || 'Tournament'}
          </h1>
          <p className="text-sm text-gray-300">Powered by Leaderz</p>
        </div>
        <button className="text-white ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 