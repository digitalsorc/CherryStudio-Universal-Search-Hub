import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ProviderChips } from './components/ProviderChips';
import { ResultsGrid } from './components/ResultsGrid';
import { SettingsDrawer } from './components/SettingsDrawer';
import { useProvidersStore } from './store/providers';
import { usePreferencesStore } from './store/preferences';
import { buildSearchUrl } from './lib/urlBuilder';
import { SearchProvider } from './lib/defaultProviders';
import { LayoutGrid, AppWindow } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const { providers } = useProvidersStore();
  const { defaultOpenMode, maxSimultaneousOpens, theme, burstMode } = usePreferencesStore();
  
  const [activeQuery, setActiveQuery] = useState('');
  const [activeProviders, setActiveProviders] = useState<SearchProvider[]>([]);
  const [viewMode, setViewMode] = useState<'new_tab' | 'iframe_panel'>(defaultOpenMode);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSearch = (query: string, all: boolean) => {
    let targetProviders = providers;
    if (!all) {
      targetProviders = providers.filter(p => p.enabled);
    }
    
    targetProviders = targetProviders.slice(0, maxSimultaneousOpens);

    if (viewMode === 'new_tab') {
      if (burstMode === 'default') {
        targetProviders.forEach(provider => {
          const url = buildSearchUrl(provider, query);
          window.open(url, '_blank', 'noopener,noreferrer');
        });
      } else if (burstMode === 'cascade') {
        let x = 50;
        let y = 50;
        targetProviders.forEach(provider => {
          const url = buildSearchUrl(provider, query);
          window.open(url, '_blank', `width=800,height=600,left=${x},top=${y},noopener,noreferrer`);
          x += 40;
          y += 40;
        });
      } else if (burstMode === 'grid') {
        const count = targetProviders.length;
        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        const screenW = window.screen.availWidth || 1920;
        const screenH = window.screen.availHeight || 1080;
        const w = Math.floor(screenW / cols);
        const h = Math.floor(screenH / rows);
        
        targetProviders.forEach((provider, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const x = c * w;
          const y = r * h;
          const url = buildSearchUrl(provider, query);
          window.open(url, '_blank', `width=${w},height=${h},left=${x},top=${y},noopener,noreferrer`);
        });
      }
    } else {
      setActiveQuery(query);
      setActiveProviders(targetProviders);
    }
  };

  const handleCloseProvider = (id: string) => {
    setActiveProviders(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SettingsDrawer />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
            <LayoutGrid className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Search Central Hub</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Launch a single query across multiple search providers instantly.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-8 flex justify-center">
          <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('new_tab')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'new_tab' 
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <AppWindow className="w-4 h-4" />
              Tab Burst
            </button>
            <button
              onClick={() => setViewMode('iframe_panel')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'iframe_panel' 
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid View
            </button>
          </div>
        </div>

        <ProviderChips />

        {viewMode === 'iframe_panel' && activeQuery && (
          <ResultsGrid 
            query={activeQuery} 
            activeProviders={activeProviders} 
            onCloseProvider={handleCloseProvider} 
          />
        )}
      </main>
    </div>
  );
}
