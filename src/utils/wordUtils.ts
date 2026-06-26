import type { WordEntry, ValidationError } from '../types/game';

export function normalizeChar(char: string): string {
  const c = char.toLowerCase();
  if (['á', 'à', 'ä', 'â'].includes(c)) return 'a';
  if (['é', 'è', 'ë', 'ê'].includes(c)) return 'e';
  if (['í', 'ì', 'ï', 'î'].includes(c)) return 'i';
  if (['ó', 'ò', 'ö', 'ô'].includes(c)) return 'o';
  if (['ú', 'ù', 'ü', 'û'].includes(c)) return 'u';
  return c;
}

export function normalizeWord(word: string): string {
  return word
    .split('')
    .map(normalizeChar)
    .join('');
}

export function isValidWordCharacters(word: string): boolean {
  if (!word) return false;
  // Allowed: lowercase/uppercase a-z, Spanish accents (áéíóúü), and ñ/Ñ.
  // No whitespace, digits, or punctuation.
  const spanishLettersRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;
  return spanishLettersRegex.test(word);
}

export function isValidChain(prevWord: string, nextWord: string): boolean {
  if (!prevWord || !nextWord) return false;
  const lastChar = prevWord[prevWord.length - 1];
  const firstChar = nextWord[0];
  return normalizeChar(lastChar) === normalizeChar(firstChar);
}

export function calculateScore(word: string): number {
  return word.length;
}

/**
 * Validates a candidate word against all local rules (casing, duplicate usage, and chaining constraints).
 * Returns ValidationError if a check fails, or null if all local rules are satisfied.
 */
export function getLocalValidationError(word: string, words: WordEntry[]): ValidationError {
  const cleaned = word.trim().toLowerCase();

  // 1. Validate allowed characters
  if (!isValidWordCharacters(cleaned)) {
    return 'invalid_chars';
  }

  // 2. Validate duplicate detection
  const alreadyUsed = words.some((entry) => normalizeWord(entry.word) === normalizeWord(cleaned));
  if (alreadyUsed) {
    return 'already_used';
  }

  // 3. Validate chain rule
  if (words.length > 0) {
    const prevWord = words[words.length - 1].word;
    if (!isValidChain(prevWord, cleaned)) {
      return 'invalid_chain';
    }
  }

  return null;
}
