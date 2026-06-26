import { useState } from 'react';
import type { GameStatus, LeaderboardEntry } from './types/game';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';

function App() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Mock leaderboard data for initial render
  const [leaderboardEntries] = useState<LeaderboardEntry[]>([
    { name: 'Jugador 1', score: 13, wordsCount: 3, date: new Date().toLocaleDateString() },
  ]);

  const handleStartGame = () => {
    setStatus('playing');
    setShowLeaderboard(false);
  };

  const handleBackToMenu = () => {
    setStatus('idle');
  };

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
          <div className="game-intro">
            <p>Estructura inicial creada correctamente.</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={handleStartGame} className="btn">
                Jugar Partida
              </button>
              <button onClick={() => setShowLeaderboard(true)} className="btn">
                Ver Leaderboard
              </button>
            </div>
          </div>
        ) : status === 'playing' ? (
          <GameBoard onGameOver={() => setStatus('gameover')} />
        ) : (
          <div className="game-over">
            <h2>Fin de la Partida (Simulado)</h2>
            <p>Puntaje final: 9 pts</p>
            <p>Palabras válidas: 2</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={handleStartGame} className="btn">
                Jugar de Nuevo
              </button>
              <button onClick={handleBackToMenu} className="btn">
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

