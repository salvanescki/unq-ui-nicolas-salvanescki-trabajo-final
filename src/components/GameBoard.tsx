import React, { useState } from 'react';
import type { WordEntry, ValidationError } from '../types/game';
import { TURN_DURATION_SECONDS } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';
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

export const GameBoard: React.FC<GameBoardProps> = ({
  words,
  score,
  error,
  isSubmitting,
  timeLeft,
  onSubmitWord,
  onGameOver,
}) => {
  const [inputWord, setInputWord] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
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

  const renderTimer = () => {
    if (words.length === 0) {
      return <strong className="counter">{TURN_DURATION_SECONDS}s (Inicia al enviar)</strong>;
    }
    if (isSubmitting) {
      return <strong className="counter timer-loading">{timeLeft}s (Validando...)</strong>;
    }
    const isLowTime = timeLeft <= 3;
    return (
      <strong className={`counter ${isLowTime ? 'timer-low' : ''}`}>
        {timeLeft}s
      </strong>
    );
  };

  // Determine the required starting letter for guidance
  const lastWord = words.length > 0 ? words[words.length - 1].word : '';
  const requiredLetter = lastWord ? lastWord[lastWord.length - 1].toUpperCase() : '';

  return (
    <div className="game-board">
      <h2>Partida en Curso</h2>
      <div className="game-stats">
        <div>
          <span>Tiempo restante: </span>
          {renderTimer()}
        </div>
        <div>
          <span>Puntaje: </span>
          <strong>{score} pts</strong>
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
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder="Ingresa una palabra..."
            disabled={isSubmitting}
            autoFocus
          />
          {error && <p className="error-message">{getErrorMessage(error)}</p>}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Validando...' : 'Enviar'}
        </button>
      </form>

      <ChainedWordsList words={words} />

      <div className="game-board-actions">
        <button onClick={onGameOver} className="btn-danger" disabled={isSubmitting}>
          Finalizar Partida
        </button>
      </div>
    </div>
  );
};

