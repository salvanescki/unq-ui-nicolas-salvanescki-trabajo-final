export type GameStatus = 'idle' | 'playing' | 'gameover';

export const TURN_DURATION_SECONDS = 15;

export interface WordEntry {
  word: string;
  score: number;
}

export type ValidationError = 'not_exist' | 'already_used' | 'invalid_chain' | 'network_error' | 'invalid_chars' | null;

export interface LeaderboardEntry {
  name: string;
  score: number;
  wordsCount: number;
  date: string;
}
