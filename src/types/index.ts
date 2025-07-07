export interface Tournament {
  id: string;
  name: string;
  tournament_key?: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface LeaderboardTeam {
  team_id: string;
  team_name: string;
  total_score: number;
  scores: { [hole_number: string]: number };
}

export interface LeaderboardData {
  leaderboard: LeaderboardTeam[];
  pars: { [hole_number: string]: number };
}

export interface ChatMessage {
  id: string;
  tournament_key?: string;
  team_id: string;
  message: string;
  created_at: string;
  team_name?: string;
} 