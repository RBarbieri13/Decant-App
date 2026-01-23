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
