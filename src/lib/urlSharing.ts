export function encodeSelectors(selectors: string[]): string {
  return selectors.map(s => encodeURIComponent(s.trim())).join('%0A');
}

export function decodeSelectors(): string[] {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const q = params.get('q');
  if (!q) return [];
  return decodeURIComponent(q).split('\n').map(s => s.trim()).filter(Boolean);
}

export function updateUrl(selectors: string[]): void {
  const encoded = encodeSelectors(selectors);
  const newHash = encoded ? `#?q=${encoded}` : '';
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}