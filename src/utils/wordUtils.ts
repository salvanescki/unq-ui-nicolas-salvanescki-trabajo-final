export function normalizeChar(char: string): string {
  const c = char.toLowerCase();
  if (['á', 'à', 'ä', 'â'].includes(c)) return 'a';
  if (['é', 'è', 'ë', 'ê'].includes(c)) return 'e';
  if (['í', 'ì', 'ï', 'î'].includes(c)) return 'i';
  if (['ó', 'ò', 'ö', 'ô'].includes(c)) return 'o';
  if (['ú', 'ù', 'ü', 'û'].includes(c)) return 'u';
  return c;
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
