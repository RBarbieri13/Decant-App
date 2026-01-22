// ============================================================
// Metascraper Service - Static Content Extraction
// ============================================================

import got from 'got';
import metascraper from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperDate from 'metascraper-date';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperLogoFavicon from 'metascraper-logo-favicon';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import * as cheerio from 'cheerio';
import type { ExtractedContent } from '@shared/types';

// Initialize metascraper with plugins
const scraper = metascraper([
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogoFavicon(),
  metascraperTitle(),
  metascraperUrl(),
]);

// User agent to avoid bot detection
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Normalize URL for comparison (remove tracking params, etc.)
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove common tracking parameters
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'source'];
    trackingParams.forEach(param => urlObj.searchParams.delete(param));
    // Remove trailing slash
    let normalized = urlObj.toString();
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch {
    return url;
  }
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Extract main content text from HTML using Cheerio
 */
function extractMainContent(html: string): string {
  const $ = cheerio.load(html);

  // Remove non-content elements
  $('script, style, nav, header, footer, aside, iframe, noscript, .ad, .advertisement, .sidebar').remove();

  // Try to find main content area
  let content = '';

  // Priority selectors for main content
  const contentSelectors = [
    'article',
    '[role="main"]',
    'main',
    '.post-content',
    '.article-content',
    '.entry-content',
    '.content',
    '#content',
    '.post',
    '.article',
  ];

  for (const selector of contentSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      content = element.first().text();
      break;
    }
  }

  // Fallback to body text
  if (!content) {
    content = $('body').text();
  }

  // Clean up whitespace
  content = content
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();

  // Limit to first 5000 characters for AI processing
  return content.slice(0, 5000);
}

/**
 * Detect content type from URL patterns
 */
export function detectContentTypeFromUrl(url: string): string | null {
  const urlLower = url.toLowerCase();
  const domain = extractDomain(url);

  // Video platforms
  if (domain.includes('youtube.com') || domain.includes('youtu.be') || domain.includes('vimeo.com')) {
    return 'V';
  }

  // Repository platforms
  if (domain.includes('github.com') || domain.includes('gitlab.com') || domain.includes('bitbucket.org')) {
    return 'G';
  }

  // Research/academic
  if (domain.includes('arxiv.org') || domain.includes('pubmed.gov') || domain.includes('scholar.google')) {
    return 'R';
  }

  // Social posts
  if (domain.includes('twitter.com') || domain.includes('x.com') || domain.includes('linkedin.com')) {
    return 'S';
  }

  // Podcasts
  if (urlLower.includes('podcast') || domain.includes('podcasts.apple.com') || domain.includes('open.spotify.com/episode')) {
    return 'P';
  }

  // Newsletter platforms
  if (domain.includes('substack.com')) {
    return 'N';
  }

  return null; // Let AI determine
}

/**
 * Fetch and extract content from a URL
 */
export async function extractContent(url: string): Promise<ExtractedContent> {
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  try {
    // Fetch the page
    const response = await got(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: {
        request: 15000, // 15 second timeout
      },
      followRedirect: true,
      maxRedirects: 5,
    });

    const html = response.body;
    const finalUrl = response.url || url;

    // Extract metadata using metascraper
    const metadata = await scraper({ html, url: finalUrl });

    // Extract main content text
    const content = extractMainContent(html);

    // Extract site name from Open Graph or domain
    const $ = cheerio.load(html);
    const siteName = $('meta[property="og:site_name"]').attr('content') ||
                     $('meta[name="application-name"]').attr('content') ||
                     null;

    return {
      url: finalUrl,
      title: metadata.title || '',
      description: metadata.description || null,
      content: content || null,
      author: metadata.author || null,
      date: metadata.date || null,
      image: metadata.image || null,
      favicon: metadata.logo || null,
      siteName: siteName,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to extract content from ${url}: ${errorMessage}`);
  }
}

/**
 * Quick metadata extraction (Phase 1 - minimal fields)
 */
export async function extractQuickMetadata(url: string): Promise<{
  url: string;
  domain: string;
  title: string;
  favicon: string | null;
}> {
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  const domain = extractDomain(url);

  try {
    const response = await got(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
      timeout: {
        request: 10000,
      },
      followRedirect: true,
    });

    const $ = cheerio.load(response.body);
    const title = $('title').text() ||
                  $('meta[property="og:title"]').attr('content') ||
                  domain;

    // Try to get favicon
    let favicon = $('link[rel="icon"]').attr('href') ||
                  $('link[rel="shortcut icon"]').attr('href') ||
                  $('link[rel="apple-touch-icon"]').attr('href') ||
                  null;

    // Make favicon URL absolute
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = new URL(favicon, urlObj.origin).toString();
    }

    return {
      url: response.url || url,
      domain,
      title: title.trim(),
      favicon,
    };
  } catch {
    // Return minimal data on error
    return {
      url,
      domain,
      title: domain,
      favicon: null,
    };
  }
}
