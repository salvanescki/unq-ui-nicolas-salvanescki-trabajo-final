import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';
import { StartScreen } from './components/StartScreen';
import { GameOver } from './components/GameOver';
import type { LeaderboardEntry } from './types/game';
import './styles/App.css';

function App() {
  const {
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
            timeLeft={timeLeft}
            onSubmitWord={submitWord}
            onGameOver={endGame}
          />
        ) : (
          <GameOver
            playerName={playerName}
            score={score}
            words={words}
            onRestart={() => startGame(playerName)}
            onResetToMenu={resetGame}
          />
        )}
      </section>
    </main>
  );
}

export default App;

