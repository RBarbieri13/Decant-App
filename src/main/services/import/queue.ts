// ============================================================
// Background Queue - Phase 2 Enrichment Processing
// ============================================================

import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../../database/connection';
import { updateNode } from '../../database/nodes';
import { importUrlPhase2 } from './pipeline';
import type { ExtractedContent, ProcessingStatus, QueueStatus } from '@shared/types';

// ============================================================
// Types
// ============================================================

interface QueueItem {
  id: string;
  nodeId: string;
  extractedContent: ExtractedContent;
  existingTitle: string;
  phase: 'phase2';
  status: ProcessingStatus;
  errorMessage: string | null;
  retryCount: number;
  createdAt: Date;
  processedAt: Date | null;
}

type QueueEventType = 'item-added' | 'item-started' | 'item-completed' | 'item-failed' | 'queue-cleared';
type QueueEventCallback = (event: QueueEventType, item?: QueueItem) => void;

// ============================================================
// Database Queue Operations
// ============================================================

function addToDatabase(item: QueueItem): void {
  const db = getDatabase();
  db.prepare(`
    INSERT INTO processing_queue (id, node_id, phase, status, error_message, created_at, processed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.id,
    item.nodeId,
    item.phase,
    item.status,
    item.errorMessage,
    item.createdAt.toISOString(),
    item.processedAt?.toISOString() ?? null
  );

  db.prepare(`
    INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
  `).run(
    `queue_content_${item.id}`,
    JSON.stringify({ extractedContent: item.extractedContent, existingTitle: item.existingTitle, retryCount: item.retryCount })
  );
}

function updateInDatabase(item: QueueItem): void {
  const db = getDatabase();
  db.prepare(`
    UPDATE processing_queue
    SET status = ?, error_message = ?, processed_at = ?
    WHERE id = ?
  `).run(
    item.status,
    item.errorMessage,
    item.processedAt?.toISOString() ?? null,
    item.id
  );

  const contentRow = db.prepare(`SELECT value FROM settings WHERE key = ?`).get(`queue_content_${item.id}`) as { value: string } | undefined;
  if (contentRow) {
    const content = JSON.parse(contentRow.value);
    content.retryCount = item.retryCount;
    db.prepare(`UPDATE settings SET value = ? WHERE key = ?`).run(JSON.stringify(content), `queue_content_${item.id}`);
  }
}

function loadFromDatabase(): QueueItem[] {
  const db = getDatabase();
  const rows = db.prepare(`
    SELECT * FROM processing_queue ORDER BY created_at ASC
  `).all() as Array<{
    id: string;
    node_id: string;
    phase: string;
    status: string;
    error_message: string | null;
    created_at: string;
    processed_at: string | null;
  }>;

  return rows.map((row) => {
    const contentRow = db.prepare(`SELECT value FROM settings WHERE key = ?`).get(`queue_content_${row.id}`) as { value: string } | undefined;
    const content = contentRow ? JSON.parse(contentRow.value) : { extractedContent: {}, existingTitle: '', retryCount: 0 };

    return {
      id: row.id,
      nodeId: row.node_id,
      extractedContent: content.extractedContent,
      existingTitle: content.existingTitle,
      phase: row.phase as 'phase2',
      status: row.status as ProcessingStatus,
      errorMessage: row.error_message,
      retryCount: content.retryCount || 0,
      createdAt: new Date(row.created_at),
      processedAt: row.processed_at ? new Date(row.processed_at) : null,
    };
  });
}

function deleteFromDatabase(id: string): void {
  const db = getDatabase();
  db.prepare(`DELETE FROM processing_queue WHERE id = ?`).run(id);
  db.prepare(`DELETE FROM settings WHERE key = ?`).run(`queue_content_${id}`);
}

function clearCompletedFromDatabase(): void {
  const db = getDatabase();
  const rows = db.prepare(`
    SELECT id FROM processing_queue WHERE status IN ('complete', 'failed')
  `).all() as Array<{ id: string }>;

  for (const row of rows) {
    deleteFromDatabase(row.id);
  }
}

function clearAllFromDatabase(): void {
  const db = getDatabase();
  const rows = db.prepare(`SELECT id FROM processing_queue`).all() as Array<{ id: string }>;

  for (const row of rows) {
    deleteFromDatabase(row.id);
  }
}

// ============================================================
// Background Queue Class
// ============================================================

/**
 * Background queue for Phase 2 enrichment processing
 * Processes items sequentially to avoid overwhelming the API
 * Persists queue state to database for crash recovery
 */
class BackgroundQueue {
  private queue: QueueItem[] = [];
  private processing = false;
  private maxRetries = 3;
  private retryDelayMs = 5000;
  private processingDelayMs = 1000;
  private listeners: QueueEventCallback[] = [];
  private initialized = false;

  /**
   * Initialize queue from database (call on app startup)
   */
  initialize(): void {
    if (this.initialized) return;
    
    this.queue = loadFromDatabase();
    this.initialized = true;
    
    const hasPending = this.queue.some(item => item.status === 'pending');
    if (hasPending && !this.processing) {
      this.processQueue();
    }
    
    console.log(`Queue initialized with ${this.queue.length} items`);
  }

  /**
   * Add an item to the queue for Phase 2 processing
   */
  addToQueue(
    nodeId: string,
    extractedContent: ExtractedContent,
    existingTitle: string
  ): string {
    this.initialize();
    
    const id = uuidv4();

    const item: QueueItem = {
      id,
      nodeId,
      extractedContent,
      existingTitle,
      phase: 'phase2',
      status: 'pending',
      errorMessage: null,
      retryCount: 0,
      createdAt: new Date(),
      processedAt: null,
    };

    addToDatabase(item);
    this.queue.push(item);
    this.emit('item-added', item);

    if (!this.processing) {
      this.processQueue();
    }

    return id;
  }

  /**
   * Get current queue status
   */
  getStatus(): QueueStatus {
    this.initialize();
    
    const counts = {
      pending: 0,
      processing: 0,
      complete: 0,
      failed: 0,
    };

    for (const item of this.queue) {
      counts[item.status]++;
    }

    return counts;
  }

  /**
   * Get all queue items
   */
  getItems(): QueueItem[] {
    this.initialize();
    return [...this.queue];
  }

  /**
   * Get pending items
   */
  getPendingItems(): QueueItem[] {
    this.initialize();
    return this.queue.filter((item) => item.status === 'pending');
  }

  /**
   * Get item by ID
   */
  getItem(id: string): QueueItem | undefined {
    this.initialize();
    return this.queue.find((item) => item.id === id);
  }

  /**
   * Get item by node ID
   */
  getItemByNodeId(nodeId: string): QueueItem | undefined {
    this.initialize();
    return this.queue.find((item) => item.nodeId === nodeId);
  }

  /**
   * Clear completed and failed items from queue
   */
  clearCompleted(): void {
    this.initialize();
    
    clearCompletedFromDatabase();
    this.queue = this.queue.filter(
      (item) => item.status === 'pending' || item.status === 'processing'
    );
    this.emit('queue-cleared');
  }

  /**
   * Clear all items from queue
   */
  clearAll(): void {
    this.initialize();
    
    clearAllFromDatabase();
    this.queue = [];
    this.processing = false;
    this.emit('queue-cleared');
  }

  /**
   * Retry a failed item
   */
  retryItem(id: string): boolean {
    this.initialize();
    
    const item = this.queue.find((i) => i.id === id);
    if (item && item.status === 'failed') {
      item.status = 'pending';
      item.errorMessage = null;
      item.retryCount = 0;
      
      updateInDatabase(item);

      if (!this.processing) {
        this.processQueue();
      }
      return true;
    }
    return false;
  }

  /**
   * Subscribe to queue events
   */
  subscribe(callback: QueueEventCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  /**
   * Process the queue
   */
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Find next pending item
      const item = this.queue.find((i) => i.status === 'pending');
      if (!item) {
        break;
      }

      // Process the item
      await this.processItem(item);

      // Add delay between items to avoid rate limiting
      await this.delay(this.processingDelayMs);
    }

    this.processing = false;
  }

  /**
   * Process a single item
   */
  private async processItem(item: QueueItem): Promise<void> {
    item.status = 'processing';
    updateInDatabase(item);
    this.emit('item-started', item);

    try {
      // Run Phase 2 enrichment
      const result = await importUrlPhase2(
        item.nodeId,
        item.extractedContent,
        item.existingTitle
      );

      // Save the Phase 2 results to the database
      updateNode(item.nodeId, {
        title: result.deepAnalysis.title || item.existingTitle,
        aiSummary: result.deepAnalysis.shortDescription,
        aiKeyPoints: result.deepAnalysis.keyConcepts,
      });

      // Success - mark as complete
      item.status = 'complete';
      item.processedAt = new Date();
      updateInDatabase(item);
      this.emit('item-completed', item);

      console.log(`Phase 2 complete for node ${item.nodeId}`);
    } catch (error) {
      console.error(`Phase 2 failed for node ${item.nodeId}:`, error);

      item.retryCount++;
      item.errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (item.retryCount < this.maxRetries) {
        // Retry after delay
        item.status = 'pending';
        updateInDatabase(item);
        await this.delay(this.retryDelayMs * item.retryCount);
      } else {
        // Max retries reached - mark as failed
        item.status = 'failed';
        item.processedAt = new Date();
        updateInDatabase(item);
        this.emit('item-failed', item);
      }
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: QueueEventType, item?: QueueItem): void {
    for (const listener of this.listeners) {
      try {
        listener(event, item);
      } catch (error) {
        console.error('Queue listener error:', error);
      }
    }
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ============================================================
// Singleton Instance
// ============================================================

let queueInstance: BackgroundQueue | null = null;

/**
 * Get the background queue instance
 */
export function getBackgroundQueue(): BackgroundQueue {
  if (!queueInstance) {
    queueInstance = new BackgroundQueue();
  }
  return queueInstance;
}

/**
 * Add item to background queue
 */
export function queueForPhase2(
  nodeId: string,
  extractedContent: ExtractedContent,
  existingTitle: string
): string {
  return getBackgroundQueue().addToQueue(nodeId, extractedContent, existingTitle);
}

/**
 * Get queue status
 */
export function getQueueStatus(): QueueStatus {
  return getBackgroundQueue().getStatus();
}

/**
 * Subscribe to queue events
 */
export function subscribeToQueue(callback: QueueEventCallback): () => void {
  return getBackgroundQueue().subscribe(callback);
}

/**
 * Clear completed items
 */
export function clearCompletedItems(): void {
  getBackgroundQueue().clearCompleted();
}

/**
 * Clear all items
 */
export function clearAllItems(): void {
  getBackgroundQueue().clearAll();
}

/**
 * Retry a failed item
 */
export function retryQueueItem(id: string): boolean {
  return getBackgroundQueue().retryItem(id);
}

/**
 * Initialize the queue (call on app startup)
 */
export function initializeQueue(): void {
  getBackgroundQueue().initialize();
}
