import type { ScrapedContent } from './scraper.js';
export interface ClassificationResult {
    title: string;
    company: string | null;
    phraseDescription: string;
    shortDescription: string;
    keyConcepts: string[];
    segment: string;
    contentType: string;
    functionParentId: string | null;
    organizationParentId: string | null;
}
/**
 * Classify and enrich scraped content using AI
 */
export declare function classifyContent(scraped: ScrapedContent, apiKey: string): Promise<ClassificationResult>;
/**
 * Get segment name from code
 */
export declare function getSegmentName(code: string): string;
/**
 * Get content type name from code
 */
export declare function getContentTypeName(code: string): string;
