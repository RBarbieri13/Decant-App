// ============================================================
// Background Queue - Phase 2 Enrichment Processing
// ============================================================

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
// Background Queue Class
// ============================================================

/**
 * Background queue for Phase 2 enrichment processing
 * Processes items sequentially to avoid overwhelming the API
 */
class BackgroundQueue {
  private queue: QueueItem[] = [];
  private processing = false;
  private maxRetries = 3;
  private retryDelayMs = 5000;
  private processingDelayMs = 1000; // Delay between processing items
  private listeners: QueueEventCallback[] = [];

  /**
   * Add an item to the queue for Phase 2 processing
   */
  addToQueue(
    nodeId: string,
    extractedContent: ExtractedContent,
    existingTitle: string
  ): string {
    const id = `q-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

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

    this.queue.push(item);
    this.emit('item-added', item);

    // Start processing if not already running
    if (!this.processing) {
      this.processQueue();
    }

    return id;
  }

  /**
   * Get current queue status
   */
  getStatus(): QueueStatus {
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
    return [...this.queue];
  }

  /**
   * Get pending items
   */
  getPendingItems(): QueueItem[] {
    return this.queue.filter((item) => item.status === 'pending');
  }

  /**
   * Get item by ID
   */
  getItem(id: string): QueueItem | undefined {
    return this.queue.find((item) => item.id === id);
  }

  /**
   * Get item by node ID
   */
  getItemByNodeId(nodeId: string): QueueItem | undefined {
    return this.queue.find((item) => item.nodeId === nodeId);
  }

  /**
   * Clear completed and failed items from queue
   */
  clearCompleted(): void {
    this.queue = this.queue.filter(
      (item) => item.status === 'pending' || item.status === 'processing'
    );
    this.emit('queue-cleared');
  }

  /**
   * Clear all items from queue
   */
  clearAll(): void {
    this.queue = [];
    this.processing = false;
    this.emit('queue-cleared');
  }

  /**
   * Retry a failed item
   */
  retryItem(id: string): boolean {
    const item = this.queue.find((i) => i.id === id);
    if (item && item.status === 'failed') {
      item.status = 'pending';
      item.errorMessage = null;
      item.retryCount = 0;

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
    this.emit('item-started', item);

    try {
      // Run Phase 2 enrichment
      const result = await importUrlPhase2(
        item.nodeId,
        item.extractedContent,
        item.existingTitle
      );

      // Success - mark as complete
      item.status = 'complete';
      item.processedAt = new Date();
      this.emit('item-completed', item);

      // Note: The actual database update should be done by the caller
      // via the event callback, as we don't have direct DB access here
      console.log(`Phase 2 complete for node ${item.nodeId}:`, result);
    } catch (error) {
      console.error(`Phase 2 failed for node ${item.nodeId}:`, error);

      item.retryCount++;
      item.errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (item.retryCount < this.maxRetries) {
        // Retry after delay
        item.status = 'pending';
        await this.delay(this.retryDelayMs * item.retryCount);
      } else {
        // Max retries reached - mark as failed
        item.status = 'failed';
        item.processedAt = new Date();
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
