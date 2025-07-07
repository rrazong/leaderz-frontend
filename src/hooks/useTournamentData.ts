import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Tournament, LeaderboardData, ChatMessage } from '../types';

// API base URL - will be set via environment variables in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const useTournamentData = (tournamentKey: string | undefined) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tournamentKey) return;

    const fetchTournamentData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaderboard/${tournamentKey}`);
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
        const response = await axios.get(`${API_BASE_URL}/chat/${tournamentKey}`);
        setChatMessages(response.data.data);
      } catch (err) {
        setError('Failed to fetch chat messages.');
        console.error(err);
      }
    };

    fetchTournamentData();
    fetchChatMessages();

    // Set up Server-Sent Events for real-time updates
    const eventSource = new EventSource(`${API_BASE_URL}/sse/${tournamentKey}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE message received:', data);
        
        if (data.type === 'leaderboard_update') {
          // Refetch leaderboard data when scores change
          console.log('Updating leaderboard...');
          fetchTournamentData();
        } else if (data.type === 'chat_update') {
          // Add new chat message to the list
          console.log('Updating chat with new message:', data.newMessage);
          if (data.newMessage) {
            setChatMessages((prevMessages) => [data.newMessage, ...prevMessages]);
          } else {
            // If no specific message provided, refetch all chat messages
            fetchChatMessages();
          }
        } else if (data.type === 'team_score_update') {
          // Refetch leaderboard data when team scores change
          console.log('Updating leaderboard due to team score change...');
          fetchTournamentData();
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
  }, [tournamentKey]);

  return { tournament, leaderboardData, chatMessages, error };
}; 