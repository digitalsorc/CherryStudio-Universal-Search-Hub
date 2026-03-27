import React, { useState } from 'react';
import { useProvidersStore } from '../../store/providers';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Plus, Trash2, GripVertical, Download, Upload } from 'lucide-react';
import { ProviderFormModal } from '../ProviderFormModal';
import { SearchProvider } from '../../lib/defaultProviders';

export function ProvidersTab() {
  const { providers, toggleProvider, deleteProvider, importProviders } = useProvidersStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<SearchProvider | undefined>();

  const filtered = providers.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase()));

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(providers, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "searchhub-providers.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          importProviders(imported);
        }
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <Input 
          placeholder="Search providers..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button size="icon" onClick={() => { setEditingProvider(undefined); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-zinc-400 cursor-grab" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{provider.name}</span>
                <span className="text-xs text-zinc-500">{provider.baseUrl}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch 
                checked={provider.enabled}
                onCheckedChange={() => toggleProvider(provider.id)}
              />
              <button 
                onClick={() => { setEditingProvider(provider); setIsModalOpen(true); }}
                className="text-xs text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button onClick={() => deleteProvider(provider.id)} className="text-zinc-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <Button variant="outline" className="flex-1" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
        <div className="relative flex-1">
          <Input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer" />
          <Button variant="outline" className="w-full pointer-events-none">
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ProviderFormModal 
          provider={editingProvider} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
