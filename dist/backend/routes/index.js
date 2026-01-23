// ============================================================
// API Routes
// ============================================================
import * as nodeRoutes from './nodes.js';
import * as hierarchyRoutes from './hierarchy.js';
import * as searchRoutes from './search.js';
import * as importRoutes from './import.js';
export function registerAPIRoutes(app) {
    // Node routes
    app.get('/api/nodes', nodeRoutes.getAllNodes);
    app.get('/api/nodes/:id', nodeRoutes.getNode);
    app.post('/api/nodes', nodeRoutes.createNode);
    app.put('/api/nodes/:id', nodeRoutes.updateNode);
    app.delete('/api/nodes/:id', nodeRoutes.deleteNode);
    app.post('/api/nodes/:id/merge', nodeRoutes.mergeNodes);
    app.post('/api/nodes/:id/move', nodeRoutes.moveNode);
    // Hierarchy routes
    app.get('/api/hierarchy/tree/:view', hierarchyRoutes.getHierarchyTree);
    app.get('/api/hierarchy/segments', hierarchyRoutes.getSegments);
    app.get('/api/hierarchy/organizations', hierarchyRoutes.getOrganizations);
    // Search routes
    app.get('/api/search', searchRoutes.search);
    // Import routes
    app.post('/api/import', importRoutes.importUrl);
    app.post('/api/settings/api-key', importRoutes.setApiKeyEndpoint);
    app.get('/api/settings/api-key/status', importRoutes.getApiKeyStatus);
}
