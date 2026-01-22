// ============================================================
// IPC Handlers
// ============================================================

import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants';
import type {
  CreateNodeInput,
  UpdateNodeInput,
  HierarchyView,
  SearchFilters,
} from '@shared/types';
import {
  createNode,
  readNode,
  updateNode,
  deleteNode,
  moveNode,
  getNodePath,
  findNodeByNormalizedUrl,
} from '../database/nodes';
import {
  getTree,
  getSegments,
  getOrganizations,
} from '../database/taxonomy';
import {
  searchNodes,
} from '../database/search';
import {
  importUrlPhase1,
  phase1ResultToNode,
  queueForPhase2,
  getQueueStatus,
  normalizeUrlForDuplicateCheck,
} from '../services/import';

/**
 * Register all IPC handlers
 */
export function registerIPCHandlers(): void {
  // ============================================================
  // Node Handlers
  // ============================================================

  ipcMain.handle(IPC_CHANNELS.NODES_CREATE, async (_event, data: CreateNodeInput) => {
    return createNode(data);
  });

  ipcMain.handle(IPC_CHANNELS.NODES_READ, async (_event, id: string) => {
    return readNode(id);
  });

  ipcMain.handle(IPC_CHANNELS.NODES_UPDATE, async (_event, id: string, data: UpdateNodeInput) => {
    return updateNode(id, data);
  });

  ipcMain.handle(IPC_CHANNELS.NODES_DELETE, async (_event, id: string) => {
    deleteNode(id);
    return;
  });

  ipcMain.handle(
    IPC_CHANNELS.NODES_MOVE,
    async (_event, id: string, newParentId: string, view: HierarchyView) => {
      moveNode(id, newParentId, view);
      return;
    }
  );

  // ============================================================
  // Hierarchy Handlers
  // ============================================================

  ipcMain.handle(
    IPC_CHANNELS.HIERARCHY_GET_TREE,
    async (_event, view: HierarchyView, rootId?: string) => {
      return getTree(view, rootId);
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.HIERARCHY_GET_PATH,
    async (_event, nodeId: string, view: HierarchyView) => {
      return getNodePath(nodeId, view);
    }
  );

  ipcMain.handle(IPC_CHANNELS.HIERARCHY_GET_SEGMENTS, async () => {
    return getSegments();
  });

  ipcMain.handle(IPC_CHANNELS.HIERARCHY_GET_ORGANIZATIONS, async () => {
    return getOrganizations();
  });

  // ============================================================
  // Search Handlers
  // ============================================================

  ipcMain.handle(
    IPC_CHANNELS.SEARCH_QUERY,
    async (_event, query: string, filters?: SearchFilters) => {
      return searchNodes(query, filters);
    }
  );

  // ============================================================
  // Import Handlers
  // ============================================================

  ipcMain.handle(IPC_CHANNELS.IMPORT_URL, async (_event, url: string) => {
    try {
      // Check for duplicate URL before importing
      const normalizedUrl = normalizeUrlForDuplicateCheck(url);
      const existingNode = findNodeByNormalizedUrl(normalizedUrl);
      if (existingNode) {
        return {
          success: false,
          error: `This URL has already been imported as "${existingNode.title}"`,
          existingNodeId: existingNode.id,
        };
      }

      // Phase 1: Quick import with basic classification
      const phase1Result = await importUrlPhase1(url);

      // Create the node with Phase 1 data
      const nodeData = phase1ResultToNode(phase1Result);
      const node = createNode(nodeData as CreateNodeInput);

      // Queue for Phase 2 enrichment (background processing)
      queueForPhase2(
        node.id,
        phase1Result.extractedContent,
        node.title
      );

      return {
        success: true,
        nodeId: node.id,
        node,
      };
    } catch (error) {
      console.error('Import failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Import failed',
      };
    }
  });

  ipcMain.handle(IPC_CHANNELS.IMPORT_STATUS, async () => {
    return getQueueStatus();
  });

  // ============================================================
  // Settings Handlers
  // ============================================================

  ipcMain.handle(IPC_CHANNELS.SETTINGS_GET, async (_event, key: string) => {
    const { getDatabase } = await import('../database/connection');
    const db = getDatabase();
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
    return row?.value ?? null;
  });

  ipcMain.handle(IPC_CHANNELS.SETTINGS_SET, async (_event, key: string, value: string) => {
    const { getDatabase } = await import('../database/connection');
    const db = getDatabase();
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
    return;
  });

  // API Key is stored securely via keytar
  ipcMain.handle(IPC_CHANNELS.SETTINGS_GET_API_KEY, async () => {
    try {
      const keytar = await import('keytar');
      return await keytar.getPassword('decant', 'openai_api_key');
    } catch (error) {
      console.error('Failed to get API key:', error);
      return null;
    }
  });

  ipcMain.handle(IPC_CHANNELS.SETTINGS_SET_API_KEY, async (_event, key: string) => {
    try {
      const keytar = await import('keytar');
      await keytar.setPassword('decant', 'openai_api_key', key);
      return;
    } catch (error) {
      console.error('Failed to set API key:', error);
      throw error;
    }
  });

  // ============================================================
  // Data Export/Import Handlers
  // ============================================================

  ipcMain.handle(IPC_CHANNELS.DATA_EXPORT, async () => {
    try {
      const { getDatabase } = await import('../database/connection');
      const db = getDatabase();

      // Export all nodes
      const nodes = db.prepare('SELECT * FROM nodes WHERE is_deleted = 0').all();

      // Export metadata tags
      const metadataTags = db.prepare('SELECT * FROM metadata_tags').all();

      // Export extracted fields
      const extractedFields = db.prepare('SELECT * FROM extracted_fields').all();

      // Export segments
      const segments = db.prepare('SELECT * FROM segments').all();

      // Export organizations
      const organizations = db.prepare('SELECT * FROM organizations').all();

      // Export settings
      const settings = db.prepare('SELECT * FROM settings').all();

      const exportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        data: {
          nodes,
          metadataTags,
          extractedFields,
          segments,
          organizations,
          settings,
        },
      };

      return {
        success: true,
        data: JSON.stringify(exportData, null, 2),
      };
    } catch (error) {
      console.error('Export failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed',
      };
    }
  });

  ipcMain.handle(IPC_CHANNELS.DATA_IMPORT, async (_event, jsonData: string) => {
    try {
      const { getDatabase } = await import('../database/connection');
      const db = getDatabase();

      const importData = JSON.parse(jsonData);

      if (!importData.version || !importData.data) {
        throw new Error('Invalid export file format');
      }

      const { nodes, metadataTags, extractedFields, settings } = importData.data;

      // Begin transaction
      const importTransaction = db.transaction(() => {
        // Import nodes (skip if already exists)
        const insertNode = db.prepare(`
          INSERT OR IGNORE INTO nodes (
            id, title, node_type, function_code, organization_code,
            function_parent_id, organization_parent_id, function_position,
            organization_position, source_url, favicon_path, thumbnail_path,
            ai_summary, ai_key_points, ai_confidence, content_type_code,
            created_at, updated_at, is_deleted
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let nodesImported = 0;
        for (const node of nodes || []) {
          const result = insertNode.run(
            node.id, node.title, node.node_type, node.function_code,
            node.organization_code, node.function_parent_id,
            node.organization_parent_id, node.function_position,
            node.organization_position, node.source_url, node.favicon_path,
            node.thumbnail_path, node.ai_summary, node.ai_key_points,
            node.ai_confidence, node.content_type_code, node.created_at,
            node.updated_at, node.is_deleted
          );
          if (result.changes > 0) nodesImported++;
        }

        // Import metadata tags
        const insertTag = db.prepare(`
          INSERT OR IGNORE INTO metadata_tags (id, node_id, tag_type, tag_code, created_at)
          VALUES (?, ?, ?, ?, ?)
        `);

        for (const tag of metadataTags || []) {
          insertTag.run(tag.id, tag.node_id, tag.tag_type, tag.tag_code, tag.created_at);
        }

        // Import extracted fields
        const insertField = db.prepare(`
          INSERT OR IGNORE INTO extracted_fields (id, node_id, field_name, field_value, field_type, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        for (const field of extractedFields || []) {
          insertField.run(
            field.id, field.node_id, field.field_name,
            field.field_value, field.field_type, field.created_at
          );
        }

        // Import settings (overwrite existing)
        const insertSetting = db.prepare(`
          INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
        `);

        for (const setting of settings || []) {
          // Skip sensitive settings like API key
          if (setting.key !== 'openai_api_key') {
            insertSetting.run(setting.key, setting.value);
          }
        }

        return { nodesImported };
      });

      const result = importTransaction();

      return {
        success: true,
        nodesImported: result.nodesImported,
      };
    } catch (error) {
      console.error('Import failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Import failed',
      };
    }
  });

  console.log('IPC handlers registered');
}

/**
 * Unregister all IPC handlers (for cleanup)
 */
export function unregisterIPCHandlers(): void {
  Object.values(IPC_CHANNELS).forEach((channel) => {
    ipcMain.removeHandler(channel);
  });
  console.log('IPC handlers unregistered');
}
