// ============================================================
// Hierarchy API Routes
// ============================================================

import { Request, Response } from 'express';
import {
  getTree,
  getSegments as dbGetSegments,
  getOrganizations as dbGetOrganizations,
} from '../database/taxonomy.js';

export async function getHierarchyTree(req: Request, res: Response): Promise<void> {
  try {
    const view = req.params.view as 'function' | 'organization';
    if (!['function', 'organization'].includes(view)) {
      res.status(400).json({ error: 'Invalid view. Must be "function" or "organization"' });
      return;
    }
    const tree = getTree(view);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getSegments(req: Request, res: Response): Promise<void> {
  try {
    const segments = dbGetSegments();
    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getOrganizations(req: Request, res: Response): Promise<void> {
  try {
    const orgs = dbGetOrganizations();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
