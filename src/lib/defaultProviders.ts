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
    id: 'ext_to',
    name: 'ext.to',
    icon: 'ext',
    baseUrl: 'https://ext.to',
    searchPath: '/search/?q={query}',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#007bff'
  },
  {
    id: '1337x',
    name: '1337x',
    icon: '1337x',
    baseUrl: 'https://1337x.to',
    searchPath: '/search/{query}/1/',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#ed2024'
  },
  {
    id: 'nyaa',
    name: 'Nyaa.si',
    icon: 'nyaa',
    baseUrl: 'https://nyaa.si',
    searchPath: '/?f=0&c=0_0&q={query}',
    category: 'tracker',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#007bff'
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
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    baseUrl: 'https://youtube.com',
    searchPath: '/results?search_query={query}',
    category: 'media',
    authType: 'none',
    openMode: 'new_tab',
    enabled: true,
    color: '#ff0000'
  }
];
