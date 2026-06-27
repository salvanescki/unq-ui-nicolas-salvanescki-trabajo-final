import { useState } from 'react';
import type { FC, SubmitEventHandler } from 'react';
import './StartScreen.css';

interface StartScreenProps {
  onStart: (name: string) => void;
  onShowLeaderboard: () => void;
}

export const StartScreen: FC<StartScreenProps> = ({ onStart, onShowLeaderboard }) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const handleNameSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    if (!trimmedName) {
      setNameError('El nombre no puede estar vacío.');
    } else if (trimmedName.length < 3) {
      setNameError('El nombre debe tener al menos 3 caracteres.');
    } else {
      setNameError('');
      onStart(trimmedName);
    }
  };

  return (
    <div className="game-intro">
      <div className="rules-section">
        <h2>Reglas del Juego</h2>
        <ul>
          <li><strong>Encadenar:</strong> Cada palabra debe empezar con la última letra de la anterior (mayúsculas y tildes no importan; ej: cas<strong>a</strong> {"->"} <strong>á</strong>rbol).</li>
          <li><strong>Sin repetir:</strong> No puedes usar palabras ya ingresadas en la partida.</li>
          <li><strong>Puntaje:</strong> Sumas 1 punto por cada letra.</li>
          <li><strong>Tiempo:</strong> Tienes 15 segundos por turno (el tiempo inicia al enviar la primera palabra).</li>
        </ul>
      </div>

      <form onSubmit={handleNameSubmit} className="start-form">
        <div className="form-group">
          <label htmlFor="playerName">Nombre del Jugador:</label>
          <input
            type="text"
            id="playerName"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (nameError) setNameError('');
            }}
            placeholder="Escribe tu nombre..."
            maxLength={20}
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Jugar Partida
          </button>
          <button type="button" onClick={onShowLeaderboard} className="btn">
            Ver Leaderboard
          </button>
        </div>
      </form>
    </div>
  );
};
