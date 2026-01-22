// ============================================================
// Metadata Enrichment Service
// ============================================================

import https from 'https';
import http from 'http';
import { URL } from 'url';

interface EnrichedMetadata {
  title: string | null;
  description: string | null;
  author: string | null;
  thumbnail_url: string | null;
  content_type: string | null;
}

/**
 * Parse HTML meta tags to extract metadata
 */
function parseMetaTags(html: string): Record<string, string> {
  const metadata: Record<string, string> = {};

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract OpenGraph tags
  const ogMatches = html.matchAll(/<meta\s+property="og:([^"]+)"\s+content="([^"]*)"/gi);
  for (const match of ogMatches) {
    metadata[`og_${match[1].toLowerCase()}`] = match[2];
  }

  // Extract Twitter Card tags
  const twitterMatches = html.matchAll(/<meta\s+name="twitter:([^"]+)"\s+content="([^"]*)"/gi);
  for (const match of twitterMatches) {
    metadata[`twitter_${match[1].toLowerCase()}`] = match[2];
  }

  // Extract standard meta tags
  const standardMatches = html.matchAll(/<meta\s+name="([^"]+)"\s+content="([^"]*)"/gi);
  for (const match of standardMatches) {
    metadata[match[1].toLowerCase()] = match[2];
  }

  return metadata;
}

/**
 * Extract content type from headers
 */
function getContentType(headers: Record<string, string | string[] | undefined>): string | null {
  const contentType = headers['content-type'];
  if (!contentType) return null;

  const typeString = Array.isArray(contentType) ? contentType[0] : contentType;
  return typeString.split(';')[0].trim().toLowerCase();
}

/**
 * Fetch metadata from a URL with timeout
 */
export async function fetchMetadata(url: string, timeout: number = 10000): Promise<EnrichedMetadata> {
  const metadata: EnrichedMetadata = {
    title: null,
    description: null,
    author: null,
    thumbnail_url: null,
    content_type: null,
  };

  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(url);
      const protocol = parsedUrl.protocol === 'https:' ? https : http;

      const request = protocol.get(
        url,
        {
          timeout,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          maxRedirects: 5,
        },
        (response) => {
          let html = '';
          let size = 0;
          const maxSize = 500000; // 500KB limit

          // Get content type from headers
          metadata.content_type = getContentType(response.headers as Record<string, string | string[] | undefined>);

          // Only process HTML
          if (metadata.content_type && !metadata.content_type.includes('text/html')) {
            response.destroy();
            resolve(metadata);
            return;
          }

          response.on('data', (chunk: Buffer) => {
            size += chunk.length;
            if (size > maxSize) {
              response.destroy();
              return;
            }
            html += chunk.toString('utf-8', 0, Math.min(chunk.length, maxSize - size));
          });

          response.on('end', () => {
            try {
              const tags = parseMetaTags(html);

              // Extract title (priority: og:title > twitter:title > <title>)
              metadata.title =
                (tags.og_title || tags.twitter_title || tags.title || null)?.substring(0, 500);

              // Extract description (priority: og:description > twitter:description > description)
              metadata.description =
                (tags.og_description || tags.twitter_description || tags.description || null)?.substring(0, 1000);

              // Extract author (priority: og:author > twitter:creator > author)
              metadata.author =
                (tags.og_author || tags.twitter_creator || tags.author || null)?.substring(0, 200);

              // Extract image (priority: og:image > twitter:image)
              metadata.thumbnail_url = tags.og_image || tags.twitter_image || null;

              resolve(metadata);
            } catch (error) {
              console.warn('Error parsing metadata:', error);
              resolve(metadata);
            }
          });
        }
      );

      request.on('error', (error) => {
        console.warn(`Error fetching ${url}:`, error.message);
        metadata.content_type = `error: ${error.message.substring(0, 100)}`;
        resolve(metadata);
      });

      request.on('timeout', () => {
        request.destroy();
        metadata.content_type = 'error: timeout';
        resolve(metadata);
      });
    } catch (error) {
      console.warn('Error in fetchMetadata:', error);
      resolve(metadata);
    }
  });
}

/**
 * Enrich multiple URLs concurrently with rate limiting
 */
export async function enrichUrls(
  urlList: Array<{ url: string; [key: string]: any }>,
  concurrency: number = 5,
  timeout: number = 10000
): Promise<Array<{ url: string; [key: string]: any; metadata: EnrichedMetadata }>> {
  const results: Array<{ url: string; [key: string]: any; metadata: EnrichedMetadata }> = [];
  let index = 0;
  const promises: Promise<void>[] = [];

  const worker = async () => {
    while (index < urlList.length) {
      const currentIndex = index++;
      const item = urlList[currentIndex];

      try {
        const metadata = await fetchMetadata(item.url, timeout);
        results[currentIndex] = { ...item, metadata };
      } catch (error) {
        console.warn(`Error enriching ${item.url}:`, error);
        results[currentIndex] = {
          ...item,
          metadata: {
            title: null,
            description: null,
            author: null,
            thumbnail_url: null,
            content_type: `error: ${String(error).substring(0, 100)}`,
          },
        };
      }
    }
  };

  // Start concurrent workers
  for (let i = 0; i < concurrency; i++) {
    promises.push(worker());
  }

  await Promise.all(promises);
  return results;
}
