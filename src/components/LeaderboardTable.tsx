import React from 'react';
import type { LeaderboardEntry } from '../types/game';
import './Leaderboard.css';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  highlightSessionId?: string | null;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  highlightSessionId,
}) => {
  return (
    <div className="leaderboard">
      <h3>Mejores Puntajes</h3>
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
            {entries.map((entry, index) => {
              const isHighlighted =
                highlightSessionId !== undefined &&
                highlightSessionId !== null &&
                entry.sessionId === highlightSessionId;

              return (
                <tr key={index} className={isHighlighted ? 'highlight-row' : ''}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.wordsCount}</td>
                  <td>{entry.score} pts</td>
                  <td>{entry.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
