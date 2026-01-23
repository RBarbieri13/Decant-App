// ============================================================
// URL Scraper Service
// Extracts metadata from URLs using cheerio
// ============================================================

import * as cheerio from 'cheerio';

// Type for cheerio instance
type CheerioInstance = ReturnType<typeof cheerio.load>;

export interface ScrapedContent {
  url: string;
  title: string;
  description: string | null;
  author: string | null;
  siteName: string | null;
  favicon: string | null;
  image: string | null;
  content: string | null;
  domain: string;
}

/**
 * Scrape metadata from a URL
 */
export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  // Validate URL
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.replace(/^www\./, '');

  // Fetch the page
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract metadata
  const title = extractTitle($);
  const description = extractDescription($);
  const author = extractAuthor($);
  const siteName = extractSiteName($, domain);
  const favicon = extractFavicon($, parsedUrl);
  const image = extractImage($, parsedUrl);
  const content = extractMainContent($);

  return {
    url,
    title,
    description,
    author,
    siteName,
    favicon,
    image,
    content,
    domain,
  };
}

/**
 * Extract page title
 */
function extractTitle($: CheerioInstance): string {
  // Try OpenGraph title first
  const ogTitle = $('meta[property="og:title"]').attr('content');
  if (ogTitle) return ogTitle.trim();

  // Try Twitter title
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  if (twitterTitle) return twitterTitle.trim();

  // Fall back to <title> tag
  const titleTag = $('title').text();
  if (titleTag) return titleTag.trim();

  // Last resort: first h1
  const h1 = $('h1').first().text();
  if (h1) return h1.trim();

  return 'Untitled';
}

/**
 * Extract page description
 */
function extractDescription($: CheerioInstance): string | null {
  // Try OpenGraph description
  const ogDesc = $('meta[property="og:description"]').attr('content');
  if (ogDesc) return ogDesc.trim();

  // Try Twitter description
  const twitterDesc = $('meta[name="twitter:description"]').attr('content');
  if (twitterDesc) return twitterDesc.trim();

  // Try standard meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (metaDesc) return metaDesc.trim();

  return null;
}

/**
 * Extract author
 */
function extractAuthor($: CheerioInstance): string | null {
  // Try meta author
  const metaAuthor = $('meta[name="author"]').attr('content');
  if (metaAuthor) return metaAuthor.trim();

  // Try article:author
  const articleAuthor = $('meta[property="article:author"]').attr('content');
  if (articleAuthor) return articleAuthor.trim();

  // Try schema.org author
  const schemaAuthor = $('[itemprop="author"]').first().text();
  if (schemaAuthor) return schemaAuthor.trim();

  return null;
}

/**
 * Extract site name
 */
function extractSiteName($: CheerioInstance, domain: string): string | null {
  // Try OpenGraph site_name
  const ogSiteName = $('meta[property="og:site_name"]').attr('content');
  if (ogSiteName) return ogSiteName.trim();

  // Try application-name
  const appName = $('meta[name="application-name"]').attr('content');
  if (appName) return appName.trim();

  // Fall back to domain
  return domain;
}

/**
 * Extract favicon URL
 */
function extractFavicon($: CheerioInstance, baseUrl: URL): string | null {
  // Try various favicon link tags
  const iconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
  ];

  for (const selector of iconSelectors) {
    const href = $(selector).attr('href');
    if (href) {
      return resolveUrl(href, baseUrl);
    }
  }

  // Default to /favicon.ico
  return `${baseUrl.protocol}//${baseUrl.host}/favicon.ico`;
}

/**
 * Extract main image
 */
function extractImage($: CheerioInstance, baseUrl: URL): string | null {
  // Try OpenGraph image
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) return resolveUrl(ogImage, baseUrl);

  // Try Twitter image
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) return resolveUrl(twitterImage, baseUrl);

  // Try first large image in content
  const firstImage = $('article img, main img, .content img').first().attr('src');
  if (firstImage) return resolveUrl(firstImage, baseUrl);

  return null;
}

/**
 * Extract main content text (for AI analysis)
 */
function extractMainContent($: CheerioInstance): string | null {
  // Remove script, style, nav, footer, header elements
  $('script, style, nav, footer, header, aside, .sidebar, .comments, .advertisement').remove();

  // Try to find main content area
  const contentSelectors = ['article', 'main', '[role="main"]', '.content', '.post', '.entry'];
  
  for (const selector of contentSelectors) {
    const content = $(selector).first().text();
    if (content && content.trim().length > 100) {
      return cleanText(content).slice(0, 5000); // Limit to 5000 chars for AI
    }
  }

  // Fall back to body text
  const bodyText = $('body').text();
  return cleanText(bodyText).slice(0, 5000);
}

/**
 * Resolve relative URL to absolute
 */
function resolveUrl(href: string, baseUrl: URL): string {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  if (href.startsWith('//')) {
    return `${baseUrl.protocol}${href}`;
  }
  if (href.startsWith('/')) {
    return `${baseUrl.protocol}//${baseUrl.host}${href}`;
  }
  return `${baseUrl.protocol}//${baseUrl.host}/${href}`;
}

/**
 * Clean extracted text
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
}
