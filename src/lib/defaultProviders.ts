export interface AuthConfig {
  clientId?: string;
  authUrl?: string;
  tokenUrl?: string;
  scopes?: string;
  cookieName?: string;
  headerName?: string;
}

export interface SearchProvider {
  id: string;
  name: string;
  icon: string;
  baseUrl: string;
  searchPath: string;
  category: 'tracker' | 'code' | 'general' | 'media' | 'custom';
  authType: 'none' | 'oauth2' | 'cookie' | 'api_key' | 'basic';
  authConfig?: AuthConfig;
  openMode: 'new_tab' | 'iframe_panel' | 'background_fetch';
  enabled: boolean;
  color: string;
  rateLimit?: number;
}

export const defaultProviders: SearchProvider[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    baseUrl: 'https://github.com',
    searchPath: '/search?q={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#24292e'
  },
  {
    id: '1337x_apps',
    name: '1337x (Apps)',
    icon: '1337x',
    baseUrl: 'https://1337x.to',
    searchPath: '/category-search/{query}/Apps/1/',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#ed2024'
  },
  {
    id: 'rutracker_apps',
    name: 'RuTracker (Soft)',
    icon: 'rutracker',
    baseUrl: 'https://rutracker.org',
    searchPath: '/forum/tracker.php?nm={query}',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#007bff'
  },
  {
    id: 'filecr',
    name: 'FileCR',
    icon: 'filecr',
    baseUrl: 'https://filecr.com',
    searchPath: '/en/?q={query}',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#00a8ff'
  },
  {
    id: 'macbed',
    name: 'MacBed',
    icon: 'macbed',
    baseUrl: 'https://www.macbed.com',
    searchPath: '/?s={query}',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#333333'
  },
  {
    id: 'wplocker',
    name: 'WPLocker',
    icon: 'wordpress',
    baseUrl: 'https://wplocker.com',
    searchPath: '/?s={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#21759b'
  },
  {
    id: 'festingervault',
    name: 'FestingerVault',
    icon: 'wordpress',
    baseUrl: 'https://festingervault.com',
    searchPath: '/?s={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#ff6b6b'
  },
  {
    id: 'nullcave',
    name: 'NullCave',
    icon: 'wordpress',
    baseUrl: 'https://nullcave.club',
    searchPath: '/?s={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#8e44ad'
  },
  {
    id: 'google',
    name: 'Google',
    icon: 'google',
    baseUrl: 'https://google.com',
    searchPath: '/search?q={query}',
    category: 'general',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#4285F4'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: 'duckduckgo',
    baseUrl: 'https://duckduckgo.com',
    searchPath: '/?q={query}',
    category: 'general',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#de5833'
  },
  {
    id: 'stackoverflow',
    name: 'StackOverflow',
    icon: 'stackoverflow',
    baseUrl: 'https://stackoverflow.com',
    searchPath: '/search?q={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#f48024'
  },
  {
    id: 'npm',
    name: 'npm registry',
    icon: 'npm',
    baseUrl: 'https://npmjs.com',
    searchPath: '/search?q={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#cb3837'
  },
  {
    id: 'dockerhub',
    name: 'DockerHub',
    icon: 'docker',
    baseUrl: 'https://hub.docker.com',
    searchPath: '/search?q={query}',
    category: 'code',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#2496ed'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'reddit',
    baseUrl: 'https://reddit.com',
    searchPath: '/search/?q={query}',
    category: 'general',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#ff4500'
  }
];
