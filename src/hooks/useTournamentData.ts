import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Tournament, LeaderboardData, ChatMessage } from '../types';

// API base URL - will be set via environment variables in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const useTournamentData = (tournamentNumber: string | undefined) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tournamentNumber) return;

    const fetchTournamentData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaderboard/${tournamentNumber}`);
        setTournament(response.data.tournament);
        setLeaderboardData({
          leaderboard: response.data.leaderboard,
          pars: response.data.pars,
        });
      } catch (err) {
        setError('Failed to fetch tournament data.');
        console.error(err);
      }
    };

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/${tournamentNumber}`);
        setChatMessages(response.data.data);
      } catch (err) {
        setError('Failed to fetch chat messages.');
        console.error(err);
      }
    };

    fetchTournamentData();
    fetchChatMessages();

    // Set up Server-Sent Events for real-time updates
    const eventSource = new EventSource(`${API_BASE_URL}/sse/${tournamentNumber}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'leaderboard_update') {
          // Refetch leaderboard data when scores change
          fetchTournamentData();
        } else if (data.type === 'chat_message') {
          // Add new chat message to the list
          setChatMessages((prevMessages) => [data.message, ...prevMessages]);
        }
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (eventSource.readyState === EventSource.CLOSED) {
          console.log('Attempting to reconnect SSE...');
        }
      }, 5000);
    };

    // Cleanup function
    return () => {
      eventSource.close();
    };
  }, [tournamentNumber]);

  return { tournament, leaderboardData, chatMessages, error };
}; 