import React from 'react';
import { SearchProvider } from '../lib/defaultProviders';
import { IframePanel } from './IframePanel';
import { usePreferencesStore } from '../store/preferences';

interface ResultsGridProps {
  query: string;
  activeProviders: SearchProvider[];
  onCloseProvider: (id: string) => void;
}

export function ResultsGrid({ query, activeProviders, onCloseProvider }: ResultsGridProps) {
  const { iframeColumns } = usePreferencesStore();

  if (!query || activeProviders.length === 0) {
    return null;
  }

  const gridCols = iframeColumns === 1 ? 'grid-cols-1' : iframeColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-6 mt-8 ${gridCols}`}>
      {activeProviders.map((provider) => (
        <IframePanel
          key={provider.id}
          provider={provider}
          query={query}
          onClose={() => onCloseProvider(provider.id)}
        />
      ))}
    </div>
  );
}
