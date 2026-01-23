// ============================================================
// Hierarchy API Routes
// ============================================================
import { getTree, getSegments as dbGetSegments, getOrganizations as dbGetOrganizations, } from '../database/taxonomy.js';
export async function getHierarchyTree(req, res) {
    try {
        const view = req.params.view;
        if (!['function', 'organization'].includes(view)) {
            res.status(400).json({ error: 'Invalid view. Must be "function" or "organization"' });
            return;
        }
        const tree = getTree(view);
        res.json(tree);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getSegments(req, res) {
    try {
        const segments = dbGetSegments();
        res.json(segments);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getOrganizations(req, res) {
    try {
        const orgs = dbGetOrganizations();
        res.json(orgs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
