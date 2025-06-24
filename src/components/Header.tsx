import React from 'react';
import type { Tournament } from '../types';

interface HeaderProps {
  tournament: Tournament | null;
}

const Header: React.FC<HeaderProps> = ({ tournament }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Leaderz</h1>
      <h2 className="text-lg">{tournament?.name}</h2>
      <button className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
};

export default Header; 