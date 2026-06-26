import { useState } from 'react';
import type { GameStatus, LeaderboardEntry } from './types/game';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';
import { StartScreen } from './components/StartScreen';

function App() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');

  // Mock leaderboard data for initial render
  const [leaderboardEntries] = useState<LeaderboardEntry[]>([
    { name: 'Jugador 1', score: 13, wordsCount: 3, date: new Date().toLocaleDateString() },
  ]);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setStatus('playing');
    setShowLeaderboard(false);
  };

  const handleBackToMenu = () => {
    setStatus('idle');
    setPlayerName('');
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
          <StartScreen
            onStart={handleStartGame}
            onShowLeaderboard={() => setShowLeaderboard(true)}
          />
        ) : status === 'playing' ? (
          <GameBoard onGameOver={() => setStatus('gameover')} />
        ) : (
          <div className="game-over">
            <h2>Fin de la Partida (Simulado)</h2>
            <p>Jugador: {playerName}</p>
            <p>Puntaje final: 9 pts</p>
            <p>Palabras válidas: 2</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => handleStartGame(playerName)} className="btn">
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

