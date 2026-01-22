// ============================================================
// Database Module Index
// ============================================================

export { getDatabase, closeDatabase, getAppDataPath, getDatabasePath } from './connection';
export { initializeDatabase, runMigrations } from './schema';
export {
  createNode,
  readNode,
  updateNode,
  deleteNode,
  moveNode,
  getChildren,
  getAllNodes,
  searchNodes as searchNodesByTitle,
  getNodePath,
} from './nodes';
export {
  getSegments,
  getOrganizations,
  getTree,
  getSegmentByCode,
  getOrganizationByCode,
} from './taxonomy';
export {
  searchNodes,
  getSearchSuggestions,
  getRecentItems,
} from './search';
