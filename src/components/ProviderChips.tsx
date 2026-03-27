import React from 'react';
import { useProvidersStore } from '../store/providers';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';
import { Globe, Code, Play, Search, Hash } from 'lucide-react';

export function ProviderChips() {
  const { providers, toggleProvider } = useProvidersStore();
  const { tokens } = useAuthStore();

  const getIcon = (category: string) => {
    switch (category) {
      case 'tracker': return <Hash className="w-3 h-3" />;
      case 'code': return <Code className="w-3 h-3" />;
      case 'media': return <Play className="w-3 h-3" />;
      case 'general': return <Globe className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-4xl mx-auto">
      {providers.map((provider) => {
        const isAuthRequired = provider.authType !== 'none';
        const isAuthed = !!tokens[provider.id];
        const isActive = provider.enabled;

        return (
          <button
            key={provider.id}
            onClick={() => toggleProvider(provider.id)}
            className={cn(
              "relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
              isActive 
                ? "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100" 
                : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 opacity-60 hover:opacity-100"
            )}
            style={{
              ...(isActive ? { borderBottomColor: provider.color, borderBottomWidth: '2px' } : {})
            }}
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
              {getIcon(provider.category)}
            </div>
            <span>{provider.name}</span>
            
            {isAuthRequired && (
              <div className="absolute -top-1 -right-1">
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900",
                  isAuthed ? "bg-green-500" : "bg-red-500"
                )} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
