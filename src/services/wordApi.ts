const BASE_URL = 'https://word-api-hmlg.vercel.app';

/**
 * Queries the remote Spanish dictionary validation API.
 * Returns true if the word exists, false otherwise.
 */
export async function validateWordApi(word: string): Promise<boolean> {
  const url = `${BASE_URL}/api/validate?word=${encodeURIComponent(word)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API validation failed with status ${response.status}`);
  }

  const data = await response.json();
  return !!data.exists;
}
