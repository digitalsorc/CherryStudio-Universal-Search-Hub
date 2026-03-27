export function buildSearchUrl(provider: any, query: string): string {
  const encodedQuery = encodeURIComponent(query);
  const path = provider.searchPath.replace('{query}', encodedQuery);
  return `${provider.baseUrl}${path}`;
}
