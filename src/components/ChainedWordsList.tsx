import React from 'react';
import type { WordEntry } from '../types/game';

interface ChainedWordsListProps {
  words: WordEntry[];
}

export const ChainedWordsList: React.FC<ChainedWordsListProps> = ({ words }) => {
  return (
    <div className="chained-words-list">
      <h3>Palabras Encadenadas ({words.length})</h3>
      {words.length === 0 ? (
        <p>No hay palabras ingresadas aún.</p>
      ) : (
        <ul>
          {words.map((entry, index) => (
            <li key={index}>
              {entry.word} (+{entry.score} pts)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
