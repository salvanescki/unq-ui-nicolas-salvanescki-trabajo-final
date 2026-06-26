import { useState, useEffect } from 'react';
import { type GameStatus, type WordEntry, type ValidationError, TURN_DURATION_SECONDS } from '../types/game';
import { calculateScore, getLocalValidationError } from '../utils/wordUtils';
import { validateWordApi } from '../services/wordApi';

export function useGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [playerName, setPlayerName] = useState<string>('');
  const [words, setWords] = useState<WordEntry[]>([]);
  const [error, setError] = useState<ValidationError>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TURN_DURATION_SECONDS);

  // Timer effect: counts down when playing, words have been started, and not currently validating
  useEffect(() => {
    if (status !== 'playing' || words.length === 0 || isSubmitting) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [status, words.length, isSubmitting]);

  // Transition to game over when timer expires
  useEffect(() => {
    if (status === 'playing' && timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        setStatus('gameover');
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [status, timeLeft]);

  const startGame = (name: string) => {
    setPlayerName(name);
    setWords([]);
    setError(null);
    setStatus('playing');
    setIsSubmitting(false);
    setTimeLeft(TURN_DURATION_SECONDS);
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
    setTimeLeft(TURN_DURATION_SECONDS);
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
      setTimeLeft(TURN_DURATION_SECONDS); // Reset timer to constant limit after a valid word
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
    timeLeft,
    startGame,
    endGame,
    resetGame,
    submitWord,
    setError,
  };
}
