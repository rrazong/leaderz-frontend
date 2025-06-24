import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../lib/supabase';
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

    // Set up Supabase Realtime subscriptions with unique channel names
    const teamScoresChannel = supabase.channel(`team_scores_${tournamentNumber}`);
    const chatMessagesChannel = supabase.channel(`chat_messages_${tournamentNumber}`);

    // Subscribe to team_scores changes for leaderboard updates
    teamScoresChannel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_scores'
        },
        async () => {
          console.log('teamScoresSubscription', tournamentNumber);
          // Refetch leaderboard data when scores change
          try {
            const response = await axios.get(`${API_BASE_URL}/leaderboard/${tournamentNumber}`);
            setLeaderboardData({
              leaderboard: response.data.leaderboard,
              pars: response.data.pars,
            });
          } catch (err) {
            console.error('Error refetching leaderboard:', err);
          }
        }
      )
      .subscribe();

    // Subscribe to chat_messages changes
    chatMessagesChannel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        async (payload) => {
          console.log('chatMessagesSubscription', payload);
          // Add new chat message to the list
          try {
            const { data: newMessage } = await supabase
              .from('chat_messages')
              .select(`
                *,
                teams!inner(name)
              `)
              .eq('id', payload.new.id)
              .single();

            if (newMessage) {
              const messageWithTeamName = {
                ...newMessage,
                team_name: newMessage.teams.name
              };
              setChatMessages((prevMessages) => [messageWithTeamName, ...prevMessages]);
            }
          } catch (err) {
            console.error('Error fetching new chat message:', err);
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      teamScoresChannel.unsubscribe();
      chatMessagesChannel.unsubscribe();
    };
  }, [tournamentNumber]);

  return { tournament, leaderboardData, chatMessages, error };
}; 