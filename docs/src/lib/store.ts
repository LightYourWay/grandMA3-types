import { writable, derived } from 'svelte/store';
import Fuse from 'fuse.js';
import type { DocsData, SearchEntry } from './types';

export const data = writable<DocsData | null>(null);
export const currentId = writable<string | null>(null);
export const navigateSource = writable<string>('');
export const searchQuery = writable<string>('');

let fuse: Fuse<SearchEntry> | null = null;
data.subscribe((d) => {
  if (!d) return;
  fuse = new Fuse(d.searchIndex, {
    keys: [
      { name: 'name', weight: 0.6 },
      { name: 'parentName', weight: 0.2 },
      { name: 'description', weight: 0.2 },
    ],
    threshold: 0.35,
    minMatchCharLength: 2,
    includeScore: true,
  });
});

export const searchResults = derived([searchQuery, data], ([$q, $d]) => {
  if (!$q.trim() || !fuse || !$d) return null;
  return fuse.search($q.trim(), { limit: 40 }).map((r) => r.item);
});

export const currentItem = derived([currentId, data], ([$id, $d]) => {
  if (!$id || !$d) return null;
  return $d.items[$id] ?? $d.functions[$id] ?? $d.enums[$id] ?? null;
});

export function navigate(id: string, source = ''): void {
  navigateSource.set(source);
  currentId.set(id);
  searchQuery.set('');
  history.pushState({}, '', '#' + id);
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    navigateSource.set('');
    const id = location.hash.slice(1);
    if (id) currentId.set(id);
  });
}
