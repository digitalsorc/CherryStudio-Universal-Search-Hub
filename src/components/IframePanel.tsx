import React, { useState } from 'react';
import { RefreshCw, ExternalLink, X } from 'lucide-react';
import { SearchProvider } from '../lib/defaultProviders';
import { buildSearchUrl } from '../lib/urlBuilder';

interface IframePanelProps {
  provider: SearchProvider;
  query: string;
  onClose: () => void;
}

export const IframePanel: React.FC<IframePanelProps> = ({ provider, query, onClose }) => {
  const [key, setKey] = useState(0);
  const [isError, setIsError] = useState(false);
  const url = buildSearchUrl(provider, query);

  const handleReload = () => setKey(k => k + 1);
  const handleOpenExternal = () => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-medium text-sm text-zinc-700 dark:text-zinc-300">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: provider.color }} />
          {provider.name}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleReload} className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors" title="Reload">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={handleOpenExternal} className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors" title="Open in new tab">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="relative flex-1 bg-zinc-100 dark:bg-zinc-950">
        {isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <ExternalLink className="w-12 h-12 text-zinc-400 mb-4" />
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">Connection Refused</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              {provider.name} does not allow being embedded in an iframe (X-Frame-Options).
            </p>
            <button
              onClick={handleOpenExternal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Open in New Tab
            </button>
          </div>
        ) : (
          <iframe
            key={key}
            src={url}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onError={() => setIsError(true)}
          />
        )}
      </div>
    </div>
  );
}
