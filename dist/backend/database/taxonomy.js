// ============================================================
// Taxonomy Operations (Segments & Organizations)
// ============================================================
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from './connection.js';
// Sample segments (Functional Taxonomy)
const DEFAULT_SEGMENTS = [
    { name: 'AI & Machine Learning', code: 'AI_ML' },
    { name: 'Development & Tools', code: 'DEV_TOOLS' },
    { name: 'Business & Productivity', code: 'BIZ_PROD' },
    { name: 'Finance & Economics', code: 'FIN_ECON' },
    { name: 'Personal & Lifestyle', code: 'PERSONAL' },
];
// Sample organizations (Organizational Taxonomy)
const DEFAULT_ORGANIZATIONS = [
    { name: 'Work', code: 'WORK' },
    { name: 'Learning', code: 'LEARNING' },
    { name: 'Personal Projects', code: 'PROJECTS' },
    { name: 'Reference', code: 'REFERENCE' },
];
export function getSegments() {
    const db = getDatabase();
    let segments = db.prepare('SELECT * FROM segments ORDER BY created_at').all();
    // If no segments exist, create defaults
    if (segments.length === 0) {
        const stmt = db.prepare(`
      INSERT INTO segments (id, name, code, color)
      VALUES (?, ?, ?, ?)
    `);
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        for (let i = 0; i < DEFAULT_SEGMENTS.length; i++) {
            const seg = DEFAULT_SEGMENTS[i];
            stmt.run(uuidv4(), seg.name, seg.code, colors[i]);
        }
        segments = db.prepare('SELECT * FROM segments ORDER BY created_at').all();
    }
    return segments;
}
export function getOrganizations() {
    const db = getDatabase();
    let orgs = db.prepare('SELECT * FROM organizations ORDER BY created_at').all();
    // If no organizations exist, create defaults
    if (orgs.length === 0) {
        const stmt = db.prepare(`
      INSERT INTO organizations (id, name, code, color)
      VALUES (?, ?, ?, ?)
    `);
        const colors = ['#9B59B6', '#E74C3C', '#3498DB', '#F39C12'];
        for (let i = 0; i < DEFAULT_ORGANIZATIONS.length; i++) {
            const org = DEFAULT_ORGANIZATIONS[i];
            stmt.run(uuidv4(), org.name, org.code, colors[i]);
        }
        orgs = db.prepare('SELECT * FROM organizations ORDER BY created_at').all();
    }
    return orgs;
}
export function getTree(view) {
    const db = getDatabase();
    const parentField = view === 'function' ? 'function_parent_id' : 'organization_parent_id';
    // Get taxonomy
    const taxonomy = view === 'function' ? getSegments() : getOrganizations();
    // Build tree for each taxonomy item
    const tree = taxonomy.map(item => ({
        ...item,
        children: buildSubtree(item.id, parentField),
    }));
    // Add root nodes (no parent in the selected view)
    const rootNodes = db.prepare(`
    SELECT * FROM nodes
    WHERE is_deleted = 0 AND ${parentField} IS NULL
    ORDER BY date_added DESC
  `).all();
    return {
        taxonomy,
        root: rootNodes.map(node => ({
            ...node,
            extracted_fields: JSON.parse(node.extracted_fields || '{}'),
            metadata_tags: JSON.parse(node.metadata_tags || '[]'),
            key_concepts: db.prepare('SELECT concept FROM key_concepts WHERE node_id = ?').all(node.id).map((c) => c.concept),
            children: buildSubtree(node.id, parentField),
        })),
    };
}
function buildSubtree(parentId, parentField) {
    const db = getDatabase();
    const nodes = db.prepare(`
    SELECT * FROM nodes
    WHERE is_deleted = 0 AND ${parentField} = ?
    ORDER BY date_added DESC
  `).all(parentId);
    return nodes.map(node => ({
        ...node,
        extracted_fields: JSON.parse(node.extracted_fields || '{}'),
        metadata_tags: JSON.parse(node.metadata_tags || '[]'),
        key_concepts: db.prepare('SELECT concept FROM key_concepts WHERE node_id = ?').all(node.id).map((c) => c.concept),
        children: buildSubtree(node.id, parentField),
    }));
}
