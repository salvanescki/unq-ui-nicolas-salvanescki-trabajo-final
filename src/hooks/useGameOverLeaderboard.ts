import { useState, useEffect, useRef } from 'react';
import type { LeaderboardEntry } from '../types/game';
import { leaderboardService } from '../services/leaderboardService';

export function useGameOverLeaderboard(
  playerName: string,
  score: number,
  wordsCount: number,
  sessionId: string | null
) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current || sessionId === null) return;
    hasSaved.current = true;

    const updated = leaderboardService.saveScore(playerName, score, wordsCount, sessionId);
    setLeaderboard(updated);
  }, [playerName, score, wordsCount, sessionId]);

  return leaderboard;
}
