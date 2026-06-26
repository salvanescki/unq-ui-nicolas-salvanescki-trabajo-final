export function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
