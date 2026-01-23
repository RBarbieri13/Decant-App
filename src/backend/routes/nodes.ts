// ============================================================
// Node API Routes
// ============================================================

import { Request, Response } from 'express';
import {
  createNode as dbCreateNode,
  readNode,
  updateNode as dbUpdateNode,
  deleteNode as dbDeleteNode,
  getAllNodes as dbGetAllNodes,
} from '../database/nodes.js';

export async function getAllNodes(req: Request, res: Response): Promise<void> {
  try {
    const nodes = dbGetAllNodes();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getNode(req: Request, res: Response): Promise<void> {
  try {
    const node = readNode(req.params.id);
    if (!node) {
      res.status(404).json({ error: 'Node not found' });
      return;
    }
    res.json(node);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function createNode(req: Request, res: Response): Promise<void> {
  try {
    const node = dbCreateNode(req.body);
    res.status(201).json(node);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function updateNode(req: Request, res: Response): Promise<void> {
  try {
    const node = dbUpdateNode(req.params.id, req.body);
    res.json(node);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function deleteNode(req: Request, res: Response): Promise<void> {
  try {
    dbDeleteNode(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function mergeNodes(req: Request, res: Response): Promise<void> {
  try {
    const { id: primaryId } = req.params;
    const { secondaryId, options } = req.body;

    if (!secondaryId) {
      res.status(400).json({ error: 'secondaryId is required' });
      return;
    }

    // Get both nodes
    const primaryNode = readNode(primaryId);
    const secondaryNode = readNode(secondaryId);

    if (!primaryNode || !secondaryNode) {
      res.status(404).json({ error: 'One or both nodes not found' });
      return;
    }

    // Merge logic: keep primary, optionally merge metadata from secondary
    const mergedData: any = { ...primaryNode };

    if (options?.keepMetadata && secondaryNode.metadata_tags) {
      mergedData.metadata_tags = [
        ...(primaryNode.metadata_tags || []),
        ...secondaryNode.metadata_tags,
      ];
    }

    if (options?.appendSummary && secondaryNode.ai_summary) {
      mergedData.ai_summary = (primaryNode.ai_summary || '') + '\n' + secondaryNode.ai_summary;
    }

    // Update the primary node
    const updated = dbUpdateNode(primaryId, mergedData);

    // Delete the secondary node
    dbDeleteNode(secondaryId);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function moveNode(req: Request, res: Response): Promise<void> {
  try {
    const { id: nodeId } = req.params;
    const { targetParentId, targetHierarchy } = req.body;

    const node = readNode(nodeId);
    if (!node) {
      res.status(404).json({ error: 'Node not found' });
      return;
    }

    // Update parent reference based on hierarchy
    const updateData: any = {};
    if (targetHierarchy === 'function') {
      updateData.function_parent_id = targetParentId;
      updateData.organization_parent_id = null;
    } else {
      updateData.organization_parent_id = targetParentId;
      updateData.function_parent_id = null;
    }

    const updated = dbUpdateNode(nodeId, updateData);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
