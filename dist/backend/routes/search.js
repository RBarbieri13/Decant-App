// ============================================================
// Search API Routes
// ============================================================
import { searchNodes as dbSearchNodes } from '../database/search.js';
export async function search(req, res) {
    try {
        const { q: query, filters } = req.query;
        if (!query || typeof query !== 'string') {
            res.status(400).json({ error: 'Query parameter "q" is required' });
            return;
        }
        const results = dbSearchNodes(query, filters);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
