import React, { useRef, useEffect, useState } from 'react';
import { Search, Command } from 'lucide-react';
import { usePreferencesStore } from '../store/preferences';

interface SearchBarProps {
  onSearch: (query: string, all: boolean) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { recentSearches, addRecentSearch } = usePreferencesStore();
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent, all: boolean = false) => {
    e.preventDefault();
    if (!query.trim()) return;
    addRecentSearch(query.trim());
    onSearch(query.trim(), all);
    setShowRecent(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey || e.metaKey) {
        handleSubmit(e, false); // Search selected only
      } else {
        handleSubmit(e, true); // Search all
      }
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={(e) => handleSubmit(e, true)} className="relative flex items-center">
        <div className="absolute left-4 text-zinc-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
          placeholder="Search across all providers..."
          className="w-full h-14 pl-12 pr-32 text-lg bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
        />
        <div className="absolute right-3 flex items-center gap-2 text-xs text-zinc-400 font-medium">
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
            <Command className="w-3 h-3" /> Enter
          </kbd>
        </div>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-50 dark:bg-zinc-800/50">
            Recent Searches
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {recentSearches.map((search, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setQuery(search);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <Search className="w-4 h-4 text-zinc-400" />
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
