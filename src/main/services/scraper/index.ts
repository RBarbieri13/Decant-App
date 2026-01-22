// ============================================================
// Scraper Service - Main Export
// ============================================================

export {
  extractContent,
  extractQuickMetadata,
  extractDomain,
  normalizeUrl,
  isValidUrl,
  detectContentTypeFromUrl,
} from './metascraper';

export {
  fetchAndCacheFavicon,
  getCachedFaviconPath,
  clearFaviconCache,
  getFaviconCacheDir,
} from './favicon';
