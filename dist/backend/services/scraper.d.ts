export interface ScrapedContent {
    url: string;
    title: string;
    description: string | null;
    author: string | null;
    siteName: string | null;
    favicon: string | null;
    image: string | null;
    content: string | null;
    domain: string;
}
/**
 * Scrape metadata from a URL
 */
export declare function scrapeUrl(url: string): Promise<ScrapedContent>;
