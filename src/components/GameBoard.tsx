import React from 'react';
import type { WordEntry } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';

interface GameBoardProps {
  onGameOver: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onGameOver }) => {
  const mockWords: WordEntry[] = [
    { word: 'casa', score: 4 },
    { word: 'árbol', score: 5 },
  ];

  return (
    <div className="game-board">
      <h2>Partida en Curso</h2>
      <div className="game-stats">
        <div>
          <span>Tiempo: </span>
          <strong>15s</strong>
        </div>
        <div>
          <span>Puntaje: </span>
          <strong>9 pts</strong>
        </div>
      </div>

      <div className="input-section">
        <input type="text" placeholder="Ingresa una palabra..." disabled />
        <button className="btn" disabled>
          Enviar
        </button>
      </div>

      <ChainedWordsList words={mockWords} />

      <div style={{ marginTop: '20px' }}>
        <button onClick={onGameOver} className="btn-danger">
          Simular Fin de Partida
        </button>
      </div>
    </div>
  );
};
