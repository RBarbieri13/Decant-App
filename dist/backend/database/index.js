// ============================================================
// Database Module Index
// ============================================================
export { getDatabase, closeDatabase, getDatabasePath, isDatabaseInitialized } from './connection.js';
export { initializeDatabase, runMigrations } from './schema.js';
export { createNode, readNode, updateNode, deleteNode, getAllNodes, getNodeById } from './nodes.js';
export { getSegments, getOrganizations, getTree } from './taxonomy.js';
export { searchNodes } from './search.js';
