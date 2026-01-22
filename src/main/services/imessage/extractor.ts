// ============================================================
// iMessage URL Extraction
// ============================================================

import { appleTimestampToISO } from './connection';

interface ExtractedMessage {
  imessage_rowid: number;
  urls: Array<{
    url: string;
    domain: string;
    source_date: string;
  }>;
}

/**
 * Extract URLs from message text and binary blob
 */
function extractUrls(text: string | null, blob: Buffer | null): string[] {
  const urls: Set<string> = new Set();

  // URL regex pattern
  const urlPattern = /https?:\/\/[^\s<>"{|}\\^`\[\]\x00-\x1f]+/g;

  // Extract from text field
  if (text) {
    const textUrls = text.match(urlPattern) || [];
    textUrls.forEach(url => urls.add(url));
  }

  // Extract from binary blob (attributedBody)
  if (blob && blob.length > 0) {
    try {
      const blobText = blob.toString('utf-8', 0, Math.min(blob.length, 100000)); // Limit to first 100KB
      const blobUrls = blobText.match(urlPattern) || [];
      blobUrls.forEach(url => urls.add(url));
    } catch (error) {
      console.warn('Failed to decode attributedBody blob:', error);
    }
  }

  // Clean and normalize URLs
  const cleaned: string[] = [];
  urls.forEach(url => {
    // Remove iMessage tracking suffixes
    let cleanedUrl = url
      .replace(/WHttpURL\/$/, '')
      .replace(/WHttpURL$/, '')
      .replace(/[\.,;:!?)\]]+$/, '');

    // Skip if not valid URL
    if (cleanedUrl.startsWith('http')) {
      // Deduplicate by checking existing
      if (!cleaned.includes(cleanedUrl)) {
        cleaned.push(cleanedUrl);
      }
    }
  });

  return cleaned;
}

/**
 * Extract domain from URL
 */
function getDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname || 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Extract URLs and metadata from iMessage messages
 */
export function extractMessagesFromData(
  messages: Array<{
    rowid: number;
    text: string | null;
    attributedBody: Buffer | null;
    date: number;
  }>
): ExtractedMessage[] {
  const results: ExtractedMessage[] = [];

  for (const msg of messages) {
    const urls = extractUrls(msg.text, msg.attributedBody);

    if (urls.length > 0) {
      const sourceDate = appleTimestampToISO(msg.date);

      results.push({
        imessage_rowid: msg.rowid,
        urls: urls.map(url => ({
          url,
          domain: getDomain(url),
          source_date: sourceDate,
        })),
      });
    }
  }

  return results;
}

/**
 * Flatten extracted messages into individual URL items
 */
export function flattenExtractedMessages(
  extracted: ExtractedMessage[]
): Array<{
  imessage_rowid: number;
  url: string;
  domain: string;
  source_date: string;
}> {
  const flattened: Array<{
    imessage_rowid: number;
    url: string;
    domain: string;
    source_date: string;
  }> = [];

  for (const msg of extracted) {
    for (const urlData of msg.urls) {
      flattened.push({
        imessage_rowid: msg.imessage_rowid,
        url: urlData.url,
        domain: urlData.domain,
        source_date: urlData.source_date,
      });
    }
  }

  return flattened;
}
