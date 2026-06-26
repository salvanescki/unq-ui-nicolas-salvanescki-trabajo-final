import type { FC } from 'react';
import type { WordEntry } from '../types/game';
import { formatWordParts } from '../utils/wordFormatting';
import './WordChainItem.css';

interface WordChainItemProps {
  entry: WordEntry;
}

export const WordChainItem: FC<WordChainItemProps> = ({ entry }) => {
  const { first, middle, last } = formatWordParts(entry.word);

  return (
    <div className="chain-badge">
      <span className="first-letter">{first}</span>
      <span>{middle}</span>
      {last && <span className="last-letter">{last}</span>}
      <span className="badge-score">+{entry.score}</span>
    </div>
  );
};
