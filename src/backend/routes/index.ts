// ============================================================
// API Routes
// ============================================================

import { Express } from 'express';
import * as nodeRoutes from './nodes.js';
import * as hierarchyRoutes from './hierarchy.js';
import * as searchRoutes from './search.js';

export function registerAPIRoutes(app: Express): void {
  // Node routes
  app.get('/api/nodes', nodeRoutes.getAllNodes);
  app.get('/api/nodes/:id', nodeRoutes.getNode);
  app.post('/api/nodes', nodeRoutes.createNode);
  app.put('/api/nodes/:id', nodeRoutes.updateNode);
  app.delete('/api/nodes/:id', nodeRoutes.deleteNode);

  // Hierarchy routes
  app.get('/api/hierarchy/tree/:view', hierarchyRoutes.getHierarchyTree);
  app.get('/api/hierarchy/segments', hierarchyRoutes.getSegments);
  app.get('/api/hierarchy/organizations', hierarchyRoutes.getOrganizations);

  // Search routes
  app.get('/api/search', searchRoutes.search);
}
