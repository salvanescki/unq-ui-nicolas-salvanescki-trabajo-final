import { useState, useEffect, useRef } from 'react';
import { type GameStatus, type WordEntry, type ValidationError, TURN_DURATION_SECONDS } from '../types/game';
import { calculateScore, getLocalValidationError } from '../utils/wordUtils';
import { validateWordApi } from '../services/wordApi';
import { createSessionId } from '../utils/sessionId';

export function useGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [playerName, setPlayerName] = useState<string>('');
  const [words, setWords] = useState<WordEntry[]>([]);
  const [error, setError] = useState<ValidationError>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TURN_DURATION_SECONDS);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Synchronous locks to avoid race conditions and stale closures
  const isSubmittingRef = useRef<boolean>(false);
  const statusRef = useRef<GameStatus>(status);

  // Keep statusRef synchronized with state
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

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
    setSessionId(createSessionId());
    isSubmittingRef.current = false;
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
    setSessionId(null);
    isSubmittingRef.current = false;
  };

  const submitWord = async (word: string): Promise<boolean> => {
    // 1. Ref lock check (immediate synchronous guard)
    if (isSubmittingRef.current) {
      return false;
    }

    // 2. Game status check
    if (statusRef.current !== 'playing') {
      return false;
    }

    const cleaned = word.trim().toLowerCase();
    if (!cleaned) {
      return false;
    }

    // 3. Local validation rules
    const localError = getLocalValidationError(cleaned, words);
    if (localError) {
      setError(localError);
      return false;
    }

    // Acquire lock and update submitting state
    isSubmittingRef.current = true;
    setError(null);
    setIsSubmitting(true);

    try {
      // 4. Remote API validation
      const exists = await validateWordApi(cleaned);

      // Verify that game didn't terminate/change status during API resolution
      if (statusRef.current !== 'playing') {
        return false;
      }

      if (!exists) {
        setError('not_exist');
        return false;
      }

      // 5. State updates (only runs if the game is still active)
      const wordScore = calculateScore(cleaned);
      const newEntry: WordEntry = { word: cleaned, score: wordScore };
      setWords((prev) => [...prev, newEntry]);
      setTimeLeft(TURN_DURATION_SECONDS);
      setError(null);
      return true;
    } catch {
      // Only set error if game is still active
      if (statusRef.current === 'playing') {
        setError('network_error');
      }
      return false;
    } finally {
      isSubmittingRef.current = false;
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
    sessionId,
  };
}
