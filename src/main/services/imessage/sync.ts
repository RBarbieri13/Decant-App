// ============================================================
// iMessage to Decant Sync Orchestration
// ============================================================

import { getDatabase } from '../../database/connection';
import { getNewIMessageMessages } from './connection';
import { extractMessagesFromData, flattenExtractedMessages } from './extractor';
import { enrichUrls, EnrichedMetadata } from './enricher';
import { categorizeBatch } from './categorizer';
import { v4 as uuidv4 } from 'uuid';

interface SyncResult {
  status: 'ok' | 'error';
  message: string;
  items_synced?: number;
  error?: string;
}

/**
 * Get current sync state (last processed iMessage rowid)
 */
export function getSyncState(): { last_rowid: number; last_sync_at: string | null } {
  try {
    const db = getDatabase();
    const result = db
      .prepare('SELECT last_imessage_rowid, last_sync_at FROM sync_state WHERE id = 1')
      .get() as { last_imessage_rowid: number; last_sync_at: string | null } | undefined;

    return {
      last_rowid: result?.last_imessage_rowid || 0,
      last_sync_at: result?.last_sync_at || null,
    };
  } catch (error) {
    console.error('Error getting sync state:', error);
    return { last_rowid: 0, last_sync_at: null };
  }
}

/**
 * Update sync state after successful sync
 */
function updateSyncState(lastRowId: number): void {
  try {
    const db = getDatabase();
    db.prepare(
      `UPDATE sync_state
       SET last_imessage_rowid = ?, last_sync_at = CURRENT_TIMESTAMP
       WHERE id = 1`
    ).run(lastRowId);
    console.log(`Sync state updated to rowid: ${lastRowId}`);
  } catch (error) {
    console.error('Error updating sync state:', error);
  }
}

/**
 * Create a node in Decant database from enriched URL
 */
function createNodeFromUrl(item: {
  imessage_rowid: number;
  url: string;
  domain: string;
  source_date: string;
  metadata: EnrichedMetadata;
  categorization: any;
}): string {
  const db = getDatabase();
  const nodeId = uuidv4();
  const cat = item.categorization;

  try {
    // Map category to hierarchy code (simplified - will be improved)
    // For now, use a flat structure
    const functionCode = `SRC/${item.categorization.category.replace(/\s+/g, '_').substring(0, 20)}`;
    const organizationCode = `${item.domain.replace(/\./g, '_').substring(0, 20)}`;

    db.prepare(
      `INSERT INTO nodes (
        id, title, node_type, source_url,
        ai_summary, ai_key_points,
        function_code, organization_code,
        imessage_rowid,
        content_type_code,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    ).run(
      nodeId,
      cat.title || item.metadata.title || item.url,
      'item',
      item.url,
      cat.summary || item.metadata.description,
      cat.keywords,
      functionCode,
      organizationCode,
      item.imessage_rowid,
      cat.category
    );

    console.log(`Created node ${nodeId} from URL: ${item.url}`);
    return nodeId;
  } catch (error) {
    console.error(`Error creating node for ${item.url}:`, error);
    throw error;
  }
}

/**
 * Main sync function: orchestrate the complete pipeline
 */
export async function syncIMessageToDecant(apiKey: string): Promise<SyncResult> {
  try {
    console.log('Starting iMessage to Decant sync...');

    // 1. Get last sync point
    const syncState = getSyncState();
    console.log(`Last sync at rowid: ${syncState.last_rowid}`);

    // 2. Extract new messages from iMessage
    console.log('Extracting messages from iMessage...');
    const messages = getNewIMessageMessages(syncState.last_rowid);

    if (messages.length === 0) {
      return {
        status: 'ok',
        message: 'No new messages to sync',
      };
    }

    console.log(`Found ${messages.length} new messages`);

    // 3. Extract URLs from messages
    const extracted = extractMessagesFromData(messages);
    const urlItems = flattenExtractedMessages(extracted);

    if (urlItems.length === 0) {
      return {
        status: 'ok',
        message: `Found ${messages.length} messages but no URLs to process`,
      };
    }

    console.log(`Extracted ${urlItems.length} URLs`);

    // 4. Enrich metadata for each URL
    console.log('Enriching metadata...');
    const enriched = await enrichUrls(urlItems, 5, 10000);
    console.log(`Enriched ${enriched.length} URLs with metadata`);

    // 5. Categorize with Claude
    console.log('Categorizing with Claude AI...');
    const categorized = await categorizeBatch(enriched, apiKey, 10);
    console.log(`Categorized ${categorized.length} URLs`);

    // 6. Insert into Decant database
    console.log('Inserting into Decant database...');
    let successCount = 0;
    let maxRowId = syncState.last_rowid;

    for (const item of categorized) {
      try {
        createNodeFromUrl(item);
        successCount++;
        if (item.imessage_rowid > maxRowId) {
          maxRowId = item.imessage_rowid;
        }
      } catch (error) {
        console.warn(`Failed to insert item ${item.url}:`, error);
        // Continue with next item
      }
    }

    // 7. Update sync state
    updateSyncState(maxRowId);

    return {
      status: 'ok',
      message: `Synced ${successCount} items from iMessage`,
      items_synced: successCount,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Sync error:', error);
    return {
      status: 'error',
      message: 'Sync failed',
      error: errorMessage,
    };
  }
}
