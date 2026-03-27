import React from 'react';
import { usePreferencesStore } from '../../store/preferences';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function BehaviorTab() {
  const { maxSimultaneousOpens, setMaxSimultaneousOpens, clearRecentSearches } = usePreferencesStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Search Behavior</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="maxOpens" className="flex flex-col space-y-1">
            <span>Max Simultaneous Opens</span>
            <span className="font-normal text-xs text-zinc-500">Prevent browser lockup</span>
          </Label>
          <Input 
            id="maxOpens"
            type="number"
            min={1}
            max={50}
            value={maxSimultaneousOpens}
            onChange={(e) => setMaxSimultaneousOpens(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Data Management</h3>
        
        <div className="flex items-center justify-between">
          <Label className="flex flex-col space-y-1">
            <span>Recent Searches</span>
            <span className="font-normal text-xs text-zinc-500">Clear your search history</span>
          </Label>
          <Button variant="outline" size="sm" onClick={clearRecentSearches}>
            Clear History
          </Button>
        </div>
      </div>
    </div>
  );
}
