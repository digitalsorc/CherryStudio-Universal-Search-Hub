import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SearchProvider } from '../lib/defaultProviders';
import { useProvidersStore } from '../store/providers';

interface ProviderFormModalProps {
  provider?: SearchProvider;
  onClose: () => void;
}

export function ProviderFormModal({ provider, onClose }: ProviderFormModalProps) {
  const { addProvider, updateProvider } = useProvidersStore();
  const [formData, setFormData] = useState<Partial<SearchProvider>>(
    provider || {
      id: crypto.randomUUID(),
      name: '',
      icon: 'search',
      baseUrl: 'https://',
      searchPath: '/search?q={query}',
      category: 'general',
      authType: 'none',
      openMode: 'new_tab',
      enabled: true,
      color: '#000000'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (provider) {
      updateProvider(provider.id, formData);
    } else {
      addProvider(formData as SearchProvider);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{provider ? 'Edit Provider' : 'Add Provider'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input 
              id="baseUrl" 
              value={formData.baseUrl} 
              onChange={e => setFormData({ ...formData, baseUrl: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="searchPath">Search Path (use {'{query}'})</Label>
            <Input 
              id="searchPath" 
              value={formData.searchPath} 
              onChange={e => setFormData({ ...formData, searchPath: e.target.value })} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="general">General</option>
                <option value="tracker">Tracker</option>
                <option value="code">Code</option>
                <option value="media">Media</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authType">Auth Type</Label>
              <select 
                id="authType"
                value={formData.authType}
                onChange={e => setFormData({ ...formData, authType: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="none">None</option>
                <option value="oauth2">OAuth 2.0</option>
                <option value="cookie">Cookie</option>
                <option value="api_key">API Key</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Accent Color</Label>
            <div className="flex gap-2">
              <Input 
                id="color" 
                type="color" 
                value={formData.color} 
                onChange={e => setFormData({ ...formData, color: e.target.value })} 
                className="w-12 p-1 h-10"
              />
              <Input 
                value={formData.color} 
                onChange={e => setFormData({ ...formData, color: e.target.value })} 
                className="flex-1"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
