// ============================================================
// Import Route
// POST /api/import - Import a URL with AI classification
// ============================================================
import { scrapeUrl } from '../services/scraper.js';
import { classifyContent } from '../services/classifier.js';
import { createNode } from '../database/nodes.js';
// API key storage (in production, use environment variables or secure storage)
let cachedApiKey = null;
/**
 * Set the OpenAI API key
 */
export function setApiKey(key) {
    cachedApiKey = key;
}
/**
 * Get the OpenAI API key
 */
export function getApiKey() {
    return cachedApiKey || process.env.OPENAI_API_KEY || null;
}
/**
 * Import a URL
 * POST /api/import
 * Body: { url: string }
 */
export async function importUrl(req, res) {
    try {
        const { url } = req.body;
        // Validate URL
        if (!url || typeof url !== 'string') {
            res.status(400).json({ error: 'URL is required' });
            return;
        }
        // Validate URL format
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
            if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                throw new Error('Invalid protocol');
            }
        }
        catch {
            res.status(400).json({ error: 'Invalid URL format' });
            return;
        }
        // Get API key
        const apiKey = getApiKey();
        if (!apiKey) {
            res.status(400).json({
                error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable or configure via settings.'
            });
            return;
        }
        console.log(`[Import] Starting import for: ${url}`);
        // Step 1: Scrape the URL
        console.log('[Import] Scraping URL...');
        const scraped = await scrapeUrl(url);
        console.log(`[Import] Scraped: ${scraped.title}`);
        // Step 2: Classify with AI
        console.log('[Import] Classifying with AI...');
        const classification = await classifyContent(scraped, apiKey);
        console.log(`[Import] Classified as: ${classification.segment} / ${classification.contentType}`);
        // Step 3: Create node in database
        console.log('[Import] Creating node...');
        const node = createNode({
            title: classification.title,
            url: url,
            source_domain: scraped.domain,
            company: classification.company || undefined,
            phrase_description: classification.phraseDescription,
            short_description: classification.shortDescription,
            logo_url: scraped.favicon || undefined,
            ai_summary: classification.shortDescription,
            extracted_fields: {
                author: scraped.author,
                siteName: scraped.siteName,
                image: scraped.image,
                segment: classification.segment,
                contentType: classification.contentType,
            },
            metadata_tags: [
                `segment:${classification.segment}`,
                `type:${classification.contentType}`,
            ],
            key_concepts: classification.keyConcepts,
            function_parent_id: classification.functionParentId,
            organization_parent_id: classification.organizationParentId,
        });
        console.log(`[Import] Created node: ${node.id}`);
        res.json({
            success: true,
            nodeId: node.id,
            node: node,
            classification: {
                segment: classification.segment,
                contentType: classification.contentType,
                keyConcepts: classification.keyConcepts,
            },
        });
    }
    catch (error) {
        console.error('[Import] Error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        // Handle specific error types
        if (message.includes('Failed to fetch URL')) {
            res.status(400).json({ error: `Could not fetch the URL: ${message}` });
            return;
        }
        if (message.includes('API key')) {
            res.status(401).json({ error: 'Invalid or missing API key' });
            return;
        }
        res.status(500).json({ error: `Import failed: ${message}` });
    }
}
/**
 * Set API key endpoint
 * POST /api/settings/api-key
 * Body: { apiKey: string }
 */
export async function setApiKeyEndpoint(req, res) {
    try {
        const { apiKey } = req.body;
        if (!apiKey || typeof apiKey !== 'string') {
            res.status(400).json({ error: 'API key is required' });
            return;
        }
        setApiKey(apiKey);
        res.json({ success: true });
    }
    catch (error) {
        console.error('[Settings] Error setting API key:', error);
        res.status(500).json({ error: 'Failed to set API key' });
    }
}
/**
 * Check if API key is configured
 * GET /api/settings/api-key/status
 */
export async function getApiKeyStatus(_req, res) {
    const hasKey = !!getApiKey();
    res.json({ configured: hasKey });
}
