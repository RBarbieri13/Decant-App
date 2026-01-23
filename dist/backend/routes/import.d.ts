import { Request, Response } from 'express';
/**
 * Set the OpenAI API key
 */
export declare function setApiKey(key: string): void;
/**
 * Get the OpenAI API key
 */
export declare function getApiKey(): string | null;
/**
 * Import a URL
 * POST /api/import
 * Body: { url: string }
 */
export declare function importUrl(req: Request, res: Response): Promise<void>;
/**
 * Set API key endpoint
 * POST /api/settings/api-key
 * Body: { apiKey: string }
 */
export declare function setApiKeyEndpoint(req: Request, res: Response): Promise<void>;
/**
 * Check if API key is configured
 * GET /api/settings/api-key/status
 */
export declare function getApiKeyStatus(_req: Request, res: Response): Promise<void>;
