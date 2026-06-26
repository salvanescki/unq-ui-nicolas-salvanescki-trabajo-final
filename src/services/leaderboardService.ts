import type { LeaderboardEntry } from '../types/game';

interface StorageLeaderboardEntry extends LeaderboardEntry {
  timestamp: number;
}

const LOCAL_STORAGE_KEY = 'chained_words_leaderboard';

export const leaderboardService = {
  getLeaderboard(): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored) as StorageLeaderboardEntry[];
      
      // Sort: highest score first, if equal, most recent first (higher timestamp)
      const sorted = [...parsed].sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.timestamp - a.timestamp;
      });

      // Map back to LeaderboardEntry shape
      return sorted.map(({ name, score, wordsCount, date, sessionId }) => ({
        name,
        score,
        wordsCount,
        date,
        sessionId,
      }));
    } catch {
      return [];
    }
  },

  saveScore(name: string, score: number, wordsCount: number, sessionId: string): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? (JSON.parse(stored) as StorageLeaderboardEntry[]) : [];

      const newEntry: StorageLeaderboardEntry = {
        name,
        score,
        wordsCount,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        sessionId,
      };

      const updated = [...parsed, newEntry];

      // Sort: highest score first, if equal, most recent first (higher timestamp)
      updated.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.timestamp - a.timestamp;
      });

      // Keep only top 10
      const top10 = updated.slice(0, 10);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(top10));

      return top10.map(({ name, score, wordsCount, date, sessionId }) => ({
        name,
        score,
        wordsCount,
        date,
        sessionId,
      }));
    } catch {
      return [];
    }
  },

  clearLeaderboard(): void {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Ignore errors silently
    }
  },
};
