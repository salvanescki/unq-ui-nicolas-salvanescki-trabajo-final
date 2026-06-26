import React from 'react';
import type { LeaderboardEntry } from '../types/game';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onClose }) => {
  return (
    <div className="leaderboard">
      <h2>Mejores Puntajes</h2>
      {entries.length === 0 ? (
        <p>No hay puntajes registrados aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Nombre</th>
              <th>Palabras</th>
              <th>Puntaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.wordsCount}</td>
                <td>{entry.score} pts</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose} className="btn">
        Cerrar
      </button>
    </div>
  );
};
