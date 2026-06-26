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
