export interface FormattedWordParts {
  first: string;
  middle: string;
  last: string;
}

/**
 * Splits a word into its first character, middle substring, and last character
 * for highlighted rendering in the chained list.
 */
export function formatWordParts(word: string): FormattedWordParts {
  let first = '';
  let middle = '';
  let last = '';

  if (word.length === 1) {
    first = word[0];
  } else if (word.length > 1) {
    first = word[0];
    middle = word.substring(1, word.length - 1);
    last = word[word.length - 1];
  }

  return { first, middle, last };
}
