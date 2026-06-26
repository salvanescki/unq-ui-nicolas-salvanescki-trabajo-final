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
          <li>Ingresa palabras válidas en español para formar una cadena.</li>
          <li>La primera palabra puede ser cualquiera. El tiempo empieza al ingresarla.</li>
          <li>Cada nueva palabra debe comenzar con la última letra de la palabra anterior.</li>
          <li>Las tildes y la distinción de mayúsculas/minúsculas no afectan el encadenamiento (ej: cas<strong>a</strong> {"->"} <strong>á</strong>rbol).</li>
          <li>No puedes repetir palabras que ya hayas usado en la partida.</li>
          <li>Cada letra de una palabra válida otorga 1 punto (ej: casa = 4 pts).</li>
          <li>Tienes 15 segundos por turno. Cada palabra válida reinicia el tiempo.</li>
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
