import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ProvidersTab } from './ProvidersTab';
import { AuthTab } from './AuthTab';
import { AppearanceTab } from './AppearanceTab';
import { BehaviorTab } from './BehaviorTab';

export function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors z-40"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Settings</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <Tabs defaultValue="providers" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="providers">Providers</TabsTrigger>
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                  <TabsTrigger value="appearance">UI</TabsTrigger>
                  <TabsTrigger value="behavior">Behavior</TabsTrigger>
                </TabsList>
                
                <TabsContent value="providers" className="mt-0">
                  <ProvidersTab />
                </TabsContent>
                
                <TabsContent value="auth" className="mt-0">
                  <AuthTab />
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0">
                  <AppearanceTab />
                </TabsContent>
                
                <TabsContent value="behavior" className="mt-0">
                  <BehaviorTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
