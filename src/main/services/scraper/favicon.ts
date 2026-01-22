// ============================================================
// Favicon Service - Download and Cache Favicons Locally
// ============================================================

import { app } from 'electron';
import got from 'got';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { extractDomain } from './metascraper';

// Cache directory for favicons (lazy initialized after app is ready)
let _faviconCacheDir: string | null = null;

function getFaviconCacheDir_internal(): string {
  if (!_faviconCacheDir) {
    _faviconCacheDir = path.join(app.getPath('userData'), 'favicons');
  }
  return _faviconCacheDir;
}

// Ensure cache directory exists
function ensureCacheDir(): void {
  if (!fs.existsSync(getFaviconCacheDir_internal())) {
    fs.mkdirSync(getFaviconCacheDir_internal(), { recursive: true });
  }
}

/**
 * Generate a hash-based filename for a favicon URL
 */
function getFaviconFilename(url: string): string {
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
  const ext = getExtensionFromUrl(url) || 'png';
  return `${hash}.${ext}`;
}

/**
 * Get file extension from URL
 */
function getExtensionFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const match = pathname.match(/\.([a-z0-9]+)$/i);
    if (match) {
      const ext = match[1].toLowerCase();
      if (['png', 'jpg', 'jpeg', 'ico', 'svg', 'webp', 'gif'].includes(ext)) {
        return ext;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get favicon using Google's favicon service (fallback)
 */
function getGoogleFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

/**
 * Get favicon using Clearbit Logo API (for company logos)
 */
function getClearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${encodeURIComponent(domain)}`;
}

/**
 * Download a favicon from URL and save to cache
 */
async function downloadFavicon(faviconUrl: string): Promise<string | null> {
  ensureCacheDir();

  const filename = getFaviconFilename(faviconUrl);
  const filepath = path.join(getFaviconCacheDir_internal(), filename);

  // Check if already cached
  if (fs.existsSync(filepath)) {
    return filepath;
  }

  try {
    const response = await got(faviconUrl, {
      responseType: 'buffer',
      timeout: {
        request: 10000,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    // Verify it's an image
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('image') && !faviconUrl.includes('favicon')) {
      return null;
    }

    // Save to cache
    fs.writeFileSync(filepath, response.body);
    return filepath;
  } catch {
    return null;
  }
}

/**
 * Fetch and cache favicon for a URL
 * Tries multiple sources in order of preference
 */
export async function fetchAndCacheFavicon(
  url: string,
  providedFaviconUrl?: string | null
): Promise<string | null> {
  const domain = extractDomain(url);

  // Priority order for favicon sources:
  // 1. Provided favicon URL from page scraping
  // 2. Apple touch icon
  // 3. Clearbit Logo API (higher quality)
  // 4. Google Favicon Service (reliable fallback)

  const faviconSources: string[] = [];

  if (providedFaviconUrl) {
    faviconSources.push(providedFaviconUrl);
  }

  // Try common favicon locations
  try {
    const urlObj = new URL(url);
    faviconSources.push(`${urlObj.origin}/apple-touch-icon.png`);
    faviconSources.push(`${urlObj.origin}/favicon.ico`);
  } catch {
    // Invalid URL, skip
  }

  // Add Clearbit and Google as fallbacks
  faviconSources.push(getClearbitLogoUrl(domain));
  faviconSources.push(getGoogleFaviconUrl(domain));

  // Try each source
  for (const faviconUrl of faviconSources) {
    const cachedPath = await downloadFavicon(faviconUrl);
    if (cachedPath) {
      return cachedPath;
    }
  }

  return null;
}

/**
 * Get cached favicon path for a domain (if exists)
 */
export function getCachedFaviconPath(domain: string): string | null {
  ensureCacheDir();

  // Check for any cached favicon for this domain
  const files = fs.readdirSync(getFaviconCacheDir_internal());
  for (const file of files) {
    if (file.includes(domain.replace(/\./g, ''))) {
      return path.join(getFaviconCacheDir_internal(), file);
    }
  }
  return null;
}

/**
 * Clear all cached favicons
 */
export function clearFaviconCache(): void {
  if (fs.existsSync(getFaviconCacheDir_internal())) {
    fs.rmSync(getFaviconCacheDir_internal(), { recursive: true });
  }
}

/**
 * Get favicon cache directory path
 */
export function getFaviconCacheDir(): string {
  ensureCacheDir();
  return getFaviconCacheDir_internal();
}
