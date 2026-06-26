import React from 'react';
import type { WordEntry } from '../types/game';
import { WordChainItem } from './WordChainItem';
import './ChainedWordsList.css';

interface ChainedWordsListProps {
  words: WordEntry[];
}

export const ChainedWordsList: React.FC<ChainedWordsListProps> = ({ words }) => {
  return (
    <div className="chained-words-list">
      <h3>Cadena de Palabras ({words.length})</h3>
      {words.length === 0 ? (
        <p className="no-words">Ingresa la primera palabra para comenzar la cadena.</p>
      ) : (
        <div className="chain-container">
          {words.map((entry, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="chain-arrow">➔</span>}
              <WordChainItem entry={entry} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
