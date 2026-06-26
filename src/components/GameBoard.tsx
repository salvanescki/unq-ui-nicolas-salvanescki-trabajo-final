import { useState, useEffect, useRef } from 'react';
import type { FC, SubmitEventHandler } from 'react';
import type { WordEntry, ValidationError } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';
import { TimerRing } from './TimerRing';
import './GameBoard.css';

interface GameBoardProps {
  words: WordEntry[];
  score: number;
  error: ValidationError;
  isSubmitting: boolean;
  timeLeft: number;
  onSubmitWord: (word: string) => Promise<boolean>;
  onGameOver: () => void;
}

export const GameBoard: FC<GameBoardProps> = ({
  words,
  score,
  error,
  isSubmitting,
  timeLeft,
  onSubmitWord,
  onGameOver,
}) => {
  const [inputWord, setInputWord] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const trimmed = inputWord.trim();
    if (!trimmed || isSubmitting) return;

    const success = await onSubmitWord(trimmed);
    if (success) {
      setInputWord('');
    }
  };

  const getErrorMessage = (err: ValidationError): string => {
    switch (err) {
      case 'invalid_chain':
        return 'La palabra no respeta la regla de encadenamiento.';
      case 'already_used':
        return 'La palabra ya fue utilizada.';
      case 'not_exist':
        return 'La palabra no existe en el diccionario.';
      case 'invalid_chars':
        return 'La palabra solo puede contener letras en español (sin espacios, números ni signos).';
      case 'network_error':
        return 'Error de red. Por favor, intenta de nuevo.';
      default:
        return '';
    }
  };

  // Determine the required starting letter for guidance
  const lastWord = words.length > 0 ? words[words.length - 1].word : '';
  const requiredLetter = lastWord ? lastWord[lastWord.length - 1].toUpperCase() : '';

  return (
    <div className="game-board">
      <h2>Partida en Curso</h2>
      <div className="game-stats">
        <div className="timer-wrapper">
          <TimerRing
            remaining={timeLeft}
            active={words.length > 0}
            paused={isSubmitting}
            resetKey={words.length}
          />
        </div>
        <div className="score-wrapper">
          <span className="score-label">Puntaje</span>
          <strong className="score-value">{score} pts</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-section">
        <div className="form-group game-board-input-group">
          {requiredLetter && (
            <p className="guidance-text">
              La palabra debe empezar con la letra: <strong>{requiredLetter}</strong>
            </p>
          )}
          <input
            type="text"
            ref={inputRef}
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder="Ingresa una palabra..."
            disabled={isSubmitting}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Validando...' : 'Enviar'}
        </button>
      </form>

      <div className="validation-feedback-container">
        {error && <p className="error-message">{getErrorMessage(error)}</p>}
      </div>

      <ChainedWordsList words={words} />

      <div className="game-board-actions">
        <button onClick={onGameOver} className="btn-danger" disabled={isSubmitting}>
          Finalizar Partida
        </button>
      </div>
    </div>
  );
};

