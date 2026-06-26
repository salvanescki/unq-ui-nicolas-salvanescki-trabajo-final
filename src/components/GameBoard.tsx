import React, { useState } from 'react';
import type { WordEntry, ValidationError } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';

interface GameBoardProps {
  words: WordEntry[];
  score: number;
  error: ValidationError;
  onSubmitWord: (word: string) => boolean;
  onGameOver: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  words,
  score,
  error,
  onSubmitWord,
  onGameOver,
}) => {
  const [inputWord, setInputWord] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputWord.trim();
    if (!trimmed) return;

    const success = onSubmitWord(trimmed);
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
        <div>
          <span>Tiempo restante: </span>
          <strong>15s (Pausado)</strong>
        </div>
        <div>
          <span>Puntaje: </span>
          <strong>{score} pts</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-section">
        <div className="form-group" style={{ flex: 1, textAlign: 'left' }}>
          {requiredLetter && (
            <p className="guidance-text" style={{ marginBottom: '8px', fontSize: '15px' }}>
              La palabra debe empezar con la letra: <strong>{requiredLetter}</strong>
            </p>
          )}
          <input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder="Ingresa una palabra..."
            autoFocus
          />
          {error && <p className="error-message">{getErrorMessage(error)}</p>}
        </div>
        <button type="submit" className="btn btn-primary" style={{ height: 'fit-content', marginTop: requiredLetter ? '27px' : '0px' }}>
          Enviar
        </button>
      </form>

      <ChainedWordsList words={words} />

      <div style={{ marginTop: '20px' }}>
        <button onClick={onGameOver} className="btn-danger">
          Finalizar Partida
        </button>
      </div>
    </div>
  );
};

