// ============================================================
// Node Operations
// ============================================================
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from './connection.js';
export function createNode(data) {
    const db = getDatabase();
    const id = uuidv4();
    const stmt = db.prepare(`
    INSERT INTO nodes (
      id, title, url, source_domain, company, phrase_description,
      short_description, logo_url, ai_summary, extracted_fields,
      metadata_tags, function_parent_id, organization_parent_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
    stmt.run(id, data.title, data.url, data.source_domain, data.company || null, data.phrase_description || null, data.short_description || null, data.logo_url || null, data.ai_summary || null, JSON.stringify(data.extracted_fields || {}), JSON.stringify(data.metadata_tags || []), data.function_parent_id || null, data.organization_parent_id || null);
    // Insert key concepts
    if (data.key_concepts && data.key_concepts.length > 0) {
        const conceptStmt = db.prepare(`
      INSERT INTO key_concepts (id, node_id, concept) VALUES (?, ?, ?)
    `);
        for (const concept of data.key_concepts) {
            conceptStmt.run(uuidv4(), id, concept);
        }
    }
    return readNode(id);
}
export function readNode(id) {
    const db = getDatabase();
    const node = db.prepare(`
    SELECT * FROM nodes WHERE id = ? AND is_deleted = 0
  `).get(id);
    if (!node)
        return null;
    const concepts = db.prepare(`
    SELECT concept FROM key_concepts WHERE node_id = ?
  `).all(id);
    return {
        ...node,
        extracted_fields: JSON.parse(node.extracted_fields || '{}'),
        metadata_tags: JSON.parse(node.metadata_tags || '[]'),
        key_concepts: concepts.map(c => c.concept),
    };
}
export function updateNode(id, data) {
    const db = getDatabase();
    const updates = [];
    const values = [];
    if (data.title !== undefined) {
        updates.push('title = ?');
        values.push(data.title);
    }
    if (data.company !== undefined) {
        updates.push('company = ?');
        values.push(data.company);
    }
    if (data.phrase_description !== undefined) {
        updates.push('phrase_description = ?');
        values.push(data.phrase_description);
    }
    if (data.short_description !== undefined) {
        updates.push('short_description = ?');
        values.push(data.short_description);
    }
    if (data.logo_url !== undefined) {
        updates.push('logo_url = ?');
        values.push(data.logo_url);
    }
    if (data.ai_summary !== undefined) {
        updates.push('ai_summary = ?');
        values.push(data.ai_summary);
    }
    if (data.extracted_fields !== undefined) {
        updates.push('extracted_fields = ?');
        values.push(JSON.stringify(data.extracted_fields));
    }
    if (data.metadata_tags !== undefined) {
        updates.push('metadata_tags = ?');
        values.push(JSON.stringify(data.metadata_tags));
    }
    if (data.function_parent_id !== undefined) {
        updates.push('function_parent_id = ?');
        values.push(data.function_parent_id);
    }
    if (data.organization_parent_id !== undefined) {
        updates.push('organization_parent_id = ?');
        values.push(data.organization_parent_id);
    }
    if (updates.length === 0)
        return readNode(id);
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    const sql = `UPDATE nodes SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...values);
    // Update key concepts if provided
    if (data.key_concepts) {
        db.prepare('DELETE FROM key_concepts WHERE node_id = ?').run(id);
        const conceptStmt = db.prepare(`
      INSERT INTO key_concepts (id, node_id, concept) VALUES (?, ?, ?)
    `);
        for (const concept of data.key_concepts) {
            conceptStmt.run(uuidv4(), id, concept);
        }
    }
    return readNode(id);
}
export function deleteNode(id) {
    const db = getDatabase();
    db.prepare('UPDATE nodes SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
}
export function getAllNodes() {
    const db = getDatabase();
    const nodes = db.prepare(`
    SELECT * FROM nodes WHERE is_deleted = 0 ORDER BY date_added DESC
  `).all();
    return nodes.map(node => ({
        ...node,
        extracted_fields: JSON.parse(node.extracted_fields || '{}'),
        metadata_tags: JSON.parse(node.metadata_tags || '[]'),
        key_concepts: db.prepare('SELECT concept FROM key_concepts WHERE node_id = ?').all(node.id).map((c) => c.concept),
    }));
}
export function getNodeById(id) {
    return readNode(id);
}
