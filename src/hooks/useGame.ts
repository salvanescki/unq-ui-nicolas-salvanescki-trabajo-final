import { useState } from 'react';
import type { GameStatus, WordEntry, ValidationError } from '../types/game';
import { isValidChain, calculateScore } from '../utils/wordUtils';

export function useGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [playerName, setPlayerName] = useState<string>('');
  const [words, setWords] = useState<WordEntry[]>([]);
  const [error, setError] = useState<ValidationError>(null);

  const startGame = (name: string) => {
    setPlayerName(name);
    setWords([]);
    setError(null);
    setStatus('playing');
  };

  const endGame = () => {
    setStatus('gameover');
  };

  const resetGame = () => {
    setStatus('idle');
    setPlayerName('');
    setWords([]);
    setError(null);
  };

  const submitWord = (word: string): boolean => {
    const cleaned = word.trim().toLowerCase();

    if (!cleaned) {
      return false;
    }

    if (words.length > 0) {
      const prevWord = words[words.length - 1].word;

      // 1. Check chain rule
      if (!isValidChain(prevWord, cleaned)) {
        setError('invalid_chain');
        return false;
      }

      // 2. Check if already used
      const alreadyUsed = words.some((entry) => entry.word.toLowerCase() === cleaned);
      if (alreadyUsed) {
        setError('already_used');
        return false;
      }
    }

    // No API check for now, assume valid and add it
    const wordScore = calculateScore(cleaned);
    const newEntry: WordEntry = { word: cleaned, score: wordScore };
    setWords((prev) => [...prev, newEntry]);
    setError(null);
    return true;
  };

  const score = words.reduce((acc, curr) => acc + curr.score, 0);

  return {
    status,
    playerName,
    words,
    error,
    score,
    startGame,
    endGame,
    resetGame,
    submitWord,
    setError,
  };
}
