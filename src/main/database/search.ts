// ============================================================
// Search Database Operations
// ============================================================

import { getDatabase } from './connection';
import type {
  Node,
  SearchFilters,
  SearchResult,
} from '@shared/types';

// ============================================================
// Search Cache (simple LRU-like cache)
// ============================================================

interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

const CACHE_TTL_MS = 30000; // 30 seconds
const CACHE_MAX_SIZE = 50;

const searchCache = new Map<string, CacheEntry>();

function getCacheKey(query: string, filters?: SearchFilters): string {
  return JSON.stringify({ query: query.toLowerCase().trim(), filters });
}

function getCachedResult(key: string): SearchResult[] | null {
  const entry = searchCache.get(key);
  if (!entry) return null;

  // Check if expired
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    searchCache.delete(key);
    return null;
  }

  return entry.results;
}

function setCachedResult(key: string, results: SearchResult[]): void {
  // Evict oldest entries if cache is full
  if (searchCache.size >= CACHE_MAX_SIZE) {
    const oldestKey = searchCache.keys().next().value;
    if (oldestKey) searchCache.delete(oldestKey);
  }

  searchCache.set(key, {
    results,
    timestamp: Date.now(),
  });
}

/**
 * Clear the search cache (call after data modifications)
 */
export function clearSearchCache(): void {
  searchCache.clear();
}

/**
 * Map database row to Node interface
 */
function mapRowToNode(row: Record<string, unknown>): Node {
  return {
    id: row.id as string,
    title: row.title as string,
    nodeType: row.node_type as Node['nodeType'],
    functionCode: row.function_code as string | null,
    organizationCode: row.organization_code as string | null,
    functionParentId: row.function_parent_id as string | null,
    organizationParentId: row.organization_parent_id as string | null,
    functionPosition: row.function_position as number,
    organizationPosition: row.organization_position as number,
    sourceUrl: row.source_url as string | null,
    faviconPath: row.favicon_path as string | null,
    thumbnailPath: row.thumbnail_path as string | null,
    aiSummary: row.ai_summary as string | null,
    aiKeyPoints: row.ai_key_points ? JSON.parse(row.ai_key_points as string) : null,
    aiConfidence: row.ai_confidence as number | null,
    contentTypeCode: row.content_type_code as Node['contentTypeCode'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    isDeleted: Boolean(row.is_deleted),
  };
}

/**
 * Search nodes with optional filters
 */
export function searchNodes(
  query: string,
  filters?: SearchFilters
): SearchResult[] {
  // Check cache first
  const cacheKey = getCacheKey(query, filters);
  const cachedResults = getCachedResult(cacheKey);
  if (cachedResults) {
    return cachedResults;
  }

  const db = getDatabase();
  const results: SearchResult[] = [];

  // Build WHERE conditions
  const conditions: string[] = ['n.is_deleted = 0'];
  const params: unknown[] = [];

  // Search in title
  if (query) {
    conditions.push('(n.title LIKE ? OR n.ai_summary LIKE ? OR n.source_url LIKE ?)');
    params.push(`%${query}%`, `%${query}%`, `%${query}%`);
  }

  // Filter by content type
  if (filters?.contentType && filters.contentType.length > 0) {
    const placeholders = filters.contentType.map(() => '?').join(', ');
    conditions.push(`n.content_type_code IN (${placeholders})`);
    params.push(...filters.contentType);
  }

  // Filter by segment (via function_parent hierarchy)
  if (filters?.segmentCode && filters.segmentCode.length > 0) {
    // Get segment IDs
    const segmentPlaceholders = filters.segmentCode.map(() => '?').join(', ');
    conditions.push(`
      EXISTS (
        SELECT 1 FROM segments s
        JOIN nodes sn ON s.id = sn.id
        WHERE s.segment_code IN (${segmentPlaceholders})
        AND (
          n.function_parent_id = s.id
          OR n.id IN (
            SELECT descendant.id FROM nodes descendant
            WHERE descendant.function_code LIKE s.segment_code || '.%'
          )
        )
      )
    `);
    params.push(...filters.segmentCode);
  }

  // Filter by date range
  if (filters?.dateRange) {
    if (filters.dateRange.start) {
      conditions.push('n.created_at >= ?');
      params.push(filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      conditions.push('n.created_at <= ?');
      params.push(filters.dateRange.end);
    }
  }

  // Filter by tags
  if (filters?.tags && filters.tags.length > 0) {
    const tagPlaceholders = filters.tags.map(() => '?').join(', ');
    conditions.push(`
      EXISTS (
        SELECT 1 FROM metadata_tags mt
        WHERE mt.node_id = n.id AND mt.tag_code IN (${tagPlaceholders})
      )
    `);
    params.push(...filters.tags);
  }

  // Execute query
  const sql = `
    SELECT n.* FROM nodes n
    WHERE ${conditions.join(' AND ')}
    ORDER BY n.created_at DESC
    LIMIT 100
  `;

  const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];

  // Process results and determine matched field
  for (const row of rows) {
    const node = mapRowToNode(row);
    let matchedField = 'title';
    let matchedText = node.title;

    if (query) {
      const lowerQuery = query.toLowerCase();

      if (node.title.toLowerCase().includes(lowerQuery)) {
        matchedField = 'title';
        matchedText = highlightMatch(node.title, query);
      } else if (node.aiSummary?.toLowerCase().includes(lowerQuery)) {
        matchedField = 'summary';
        matchedText = highlightMatch(node.aiSummary, query);
      } else if (node.sourceUrl?.toLowerCase().includes(lowerQuery)) {
        matchedField = 'url';
        matchedText = highlightMatch(node.sourceUrl, query);
      }
    }

    // Calculate relevance score
    let score = 0;
    if (matchedField === 'title') score = 1.0;
    else if (matchedField === 'summary') score = 0.7;
    else if (matchedField === 'url') score = 0.5;

    // Boost recent items
    const daysSinceCreated = (Date.now() - new Date(node.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreated < 7) score *= 1.2;
    else if (daysSinceCreated < 30) score *= 1.1;

    results.push({
      node,
      matchedField,
      matchedText,
      score,
    });
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  // Cache the results
  setCachedResult(cacheKey, results);

  return results;
}

/**
 * Highlight matched text in a string
 */
function highlightMatch(text: string, query: string): string {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '**$1**');
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(partialQuery: string): string[] {
  const db = getDatabase();

  if (partialQuery.length < 2) {
    return [];
  }

  const rows = db.prepare(`
    SELECT DISTINCT title FROM nodes
    WHERE is_deleted = 0 AND title LIKE ?
    ORDER BY created_at DESC
    LIMIT 10
  `).all(`${partialQuery}%`) as Array<{ title: string }>;

  return rows.map((row) => row.title);
}

/**
 * Get recent items
 */
export function getRecentItems(limit: number = 20): Node[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM nodes
    WHERE is_deleted = 0 AND node_type = 'item'
    ORDER BY created_at DESC
    LIMIT ?
  `).all(limit) as Record<string, unknown>[];

  return rows.map(mapRowToNode);
}
