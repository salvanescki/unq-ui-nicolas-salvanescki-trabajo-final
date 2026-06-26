import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';
import { StartScreen } from './components/StartScreen';
import { GameOver } from './components/GameOver';
import { leaderboardService } from './services/leaderboardService';
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
    sessionId,
  } = useGame();

  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  return (
    <main className="app-container">
      <header>
        <h1>Palabras Encadenadas</h1>
        <p>El juego de palabras encadenadas en español.</p>
      </header>

      <section className="game-content">
        {showLeaderboard ? (
          <Leaderboard
            entries={leaderboardService.getLeaderboard()}
            onClose={() => setShowLeaderboard(false)}
          />
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
            sessionId={sessionId}
            onRestart={() => startGame(playerName)}
            onResetToMenu={resetGame}
          />
        )}
      </section>
    </main>
  );
}

export default App;

