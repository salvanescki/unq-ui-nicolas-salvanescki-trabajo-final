export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface WordEntry {
  word: string;
  score: number;
}

export type ValidationError = 'not_exist' | 'already_used' | 'invalid_chain' | 'network_error' | null;

export interface LeaderboardEntry {
  name: string;
  score: number;
  wordsCount: number;
  date: string;
}
