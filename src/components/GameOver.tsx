import type { FC } from 'react';
import type { WordEntry } from '../types/game';
import { ChainedWordsList } from './ChainedWordsList';
import { useGameOverLeaderboard } from '../hooks/useGameOverLeaderboard';
import { LeaderboardTable } from './LeaderboardTable';

interface GameOverProps {
  playerName: string;
  score: number;
  words: WordEntry[];
  sessionId: string | null;
  onRestart: () => void;
  onResetToMenu: () => void;
}

export const GameOver: FC<GameOverProps> = ({
  playerName,
  score,
  words,
  sessionId,
  onRestart,
  onResetToMenu,
}) => {
  const leaderboard = useGameOverLeaderboard(playerName, score, words.length, sessionId);

  return (
    <div className="game-over">
      <h2>Partida Finalizada</h2>
      <p>Jugador: <strong>{playerName}</strong></p>
      <p>Puntaje final: <strong>{score} pts</strong></p>
      <p>Palabras válidas encadenadas: <strong>{words.length}</strong></p>

      <ChainedWordsList words={words} />

      <LeaderboardTable entries={leaderboard} highlightSessionId={sessionId} />

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
