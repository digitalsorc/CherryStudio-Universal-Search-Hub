import React, { useEffect } from 'react';
import { usePreferencesStore } from '../../store/preferences';
import { Label } from '../ui/label';

export function AppearanceTab() {
  const { theme, setTheme, defaultOpenMode, setDefaultOpenMode, iframeColumns, setIframeColumns } = usePreferencesStore();

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Theme</h3>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors capitalize ${
                theme === t
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Layout</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="openMode" className="flex flex-col space-y-1">
            <span>Default Open Mode</span>
            <span className="font-normal text-xs text-zinc-500">How search results open</span>
          </Label>
          <select
            id="openMode"
            value={defaultOpenMode}
            onChange={(e) => setDefaultOpenMode(e.target.value as any)}
            className="flex h-9 rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <option value="new_tab">New Tabs</option>
            <option value="iframe_panel">Iframe Grid</option>
          </select>
        </div>

        {defaultOpenMode === 'iframe_panel' && (
          <div className="flex items-center justify-between">
            <Label htmlFor="columns" className="flex flex-col space-y-1">
              <span>Grid Columns</span>
              <span className="font-normal text-xs text-zinc-500">Number of iframes per row</span>
            </Label>
            <select
              id="columns"
              value={iframeColumns}
              onChange={(e) => setIframeColumns(Number(e.target.value))}
              className="flex h-9 rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
