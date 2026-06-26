import { useState } from 'react';
import type { GameStatus, WordEntry, ValidationError } from '../types/game';
import { calculateScore, getLocalValidationError } from '../utils/wordUtils';
import { validateWordApi } from '../services/wordApi';

export function useGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [playerName, setPlayerName] = useState<string>('');
  const [words, setWords] = useState<WordEntry[]>([]);
  const [error, setError] = useState<ValidationError>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const startGame = (name: string) => {
    setPlayerName(name);
    setWords([]);
    setError(null);
    setStatus('playing');
    setIsSubmitting(false);
  };

  const endGame = () => {
    setStatus('gameover');
  };

  const resetGame = () => {
    setStatus('idle');
    setPlayerName('');
    setWords([]);
    setError(null);
    setIsSubmitting(false);
  };

  const submitWord = async (word: string): Promise<boolean> => {
    const cleaned = word.trim().toLowerCase();

    if (!cleaned || isSubmitting) {
      return false;
    }

    // 1. Perform all local validation rules first
    const localError = getLocalValidationError(cleaned, words);
    if (localError) {
      setError(localError);
      return false;
    }

    // 2. Clear any existing errors & call remote dictionary API validation
    setError(null);
    setIsSubmitting(true);

    try {
      const exists = await validateWordApi(cleaned);
      if (!exists) {
        setError('not_exist');
        return false;
      }

      // Word is fully valid! Add it to the chain
      const wordScore = calculateScore(cleaned);
      const newEntry: WordEntry = { word: cleaned, score: wordScore };
      setWords((prev) => [...prev, newEntry]);
      setError(null);
      return true;
    } catch {
      setError('network_error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const score = words.reduce((acc, curr) => acc + curr.score, 0);

  return {
    status,
    playerName,
    words,
    error,
    score,
    isSubmitting,
    startGame,
    endGame,
    resetGame,
    submitWord,
    setError,
  };
}
