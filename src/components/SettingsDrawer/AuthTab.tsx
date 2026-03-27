import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { useProvidersStore } from '../../store/providers';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock, Key, Cookie, LogOut } from 'lucide-react';
import { encryptData } from '../../lib/crypto';

export function AuthTab() {
  const { hasMasterPin, setHasMasterPin, tokens, setToken, removeToken } = useAuthStore();
  const { providers } = useProvidersStore();
  
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const authProviders = providers.filter(p => p.authType !== 'none');

  const handleSetPin = () => {
    if (pin.length < 4) {
      setError('PIN must be at least 4 characters');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }
    setHasMasterPin(true);
    setIsUnlocked(true);
    setError('');
  };

  const handleUnlock = async () => {
    if (pin.length < 4) {
      setError('Invalid PIN');
      return;
    }
    setIsUnlocked(true);
    setError('');
  };

  const handleSaveToken = async (providerId: string, data: string) => {
    try {
      const encrypted = await encryptData(pin, data);
      setToken(providerId, encrypted);
    } catch (e) {
      setError('Encryption failed');
    }
  };

  if (!hasMasterPin) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm">
          <Lock className="w-5 h-5 mb-2" />
          Set a Master PIN to securely encrypt your cookies and API keys in local storage.
        </div>
        <div className="space-y-2">
          <Label>Master PIN</Label>
          <Input type="password" value={pin} onChange={e => setPin(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Confirm PIN</Label>
          <Input type="password" value={confirmPin} onChange={e => setConfirmPin(e.target.value)} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleSetPin} className="w-full">Set Master PIN</Button>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-sm text-center">
          <Lock className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
          Enter your Master PIN to manage credentials.
        </div>
        <div className="space-y-2">
          <Label>Master PIN</Label>
          <Input type="password" value={pin} onChange={e => setPin(e.target.value)} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleUnlock} className="w-full">Unlock</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Authenticated Providers</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsUnlocked(false)}>
          <Lock className="w-4 h-4 mr-2" /> Lock
        </Button>
      </div>

      {authProviders.length === 0 ? (
        <p className="text-sm text-zinc-500 text-center py-4">No providers require authentication.</p>
      ) : (
        <div className="space-y-4">
          {authProviders.map(provider => {
            const isAuthed = !!tokens[provider.id];
            return (
              <div key={provider.id} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    {provider.authType === 'cookie' ? <Cookie className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                    {provider.name}
                  </div>
                  {isAuthed ? (
                    <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">Connected</span>
                  ) : (
                    <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">Not Connected</span>
                  )}
                </div>
                
                {isAuthed ? (
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => removeToken(provider.id)}>
                    <LogOut className="w-4 h-4 mr-2" /> Disconnect
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Input 
                      type="password" 
                      placeholder={`Enter ${provider.authType === 'cookie' ? 'Cookie String' : 'API Key'}...`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveToken(provider.id, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <p className="text-xs text-zinc-500">Press Enter to save securely.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
