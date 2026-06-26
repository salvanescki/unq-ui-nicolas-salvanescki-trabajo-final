import React from 'react';
import type { WordEntry } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';

interface GameOverProps {
  playerName: string;
  score: number;
  words: WordEntry[];
  onRestart: () => void;
  onResetToMenu: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  playerName,
  score,
  words,
  onRestart,
  onResetToMenu,
}) => {
  return (
    <div className="game-over">
      <h2>Partida Finalizada</h2>
      <p>Jugador: <strong>{playerName}</strong></p>
      <p>Puntaje final: <strong>{score} pts</strong></p>
      <p>Palabras válidas encadenadas: <strong>{words.length}</strong></p>
      
      <ChainedWordsList words={words} />

      <div className="game-over-actions">
        <button onClick={onRestart} className="btn btn-primary">
          Jugar de Nuevo
        </button>
        <button onClick={onResetToMenu} className="btn">
          Volver al Menú
        </button>
      </div>
    </div>
  );
};
