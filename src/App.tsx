import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';
import { StartScreen } from './components/StartScreen';
import type { LeaderboardEntry } from './types/game';

function App() {
  const {
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
  } = useGame();

  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Mock leaderboard data for initial render
  const [leaderboardEntries] = useState<LeaderboardEntry[]>([
    { name: 'Jugador 1', score: 13, wordsCount: 3, date: new Date().toLocaleDateString() },
  ]);

  return (
    <main className="app-container">
      <header>
        <h1>Palabras Encadenadas</h1>
        <p>El juego de palabras encadenadas en español.</p>
      </header>

      <section className="game-content">
        {showLeaderboard ? (
          <Leaderboard entries={leaderboardEntries} onClose={() => setShowLeaderboard(false)} />
        ) : status === 'idle' ? (
          <StartScreen
            onStart={startGame}
            onShowLeaderboard={() => setShowLeaderboard(true)}
          />
        ) : status === 'playing' ? (
          <GameBoard
            words={words}
            score={score}
            error={error}
            isSubmitting={isSubmitting}
            onSubmitWord={submitWord}
            onGameOver={endGame}
          />
        ) : (
          <div className="game-over">
            <h2>Partida Finalizada</h2>
            <p style={{ margin: '8px 0' }}>Jugador: <strong>{playerName}</strong></p>
            <p style={{ margin: '8px 0' }}>Puntaje final: <strong>{score} pts</strong></p>
            <p style={{ margin: '8px 0' }}>Palabras válidas encadenadas: <strong>{words.length}</strong></p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => startGame(playerName)} className="btn btn-primary">
                Jugar de Nuevo
              </button>
              <button onClick={resetGame} className="btn">
                Volver al Menú
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;

