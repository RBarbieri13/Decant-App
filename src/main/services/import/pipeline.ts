// ============================================================
// Import Pipeline - Full URL Import Flow
// ============================================================

import { v4 as uuidv4 } from 'uuid';
import {
  extractContent,
  extractQuickMetadata,
  fetchAndCacheFavicon,
  isValidUrl,
  extractDomain,
  detectContentTypeFromUrl,
} from '../scraper';
import {
  classifyContent,
  enrichContent,
  hasApiKey,
} from '../ai';
import type {
  ExtractedContent,
  AIClassification,
  DeepAnalysisResult,
  ImportResult,
  Node,
} from '@shared/types';

// ============================================================
// Types
// ============================================================

export interface ImportPhase1Result {
  nodeId: string;
  extractedContent: ExtractedContent;
  classification: AIClassification;
  functionCode: string;
  organizationCode: string;
  faviconPath: string | null;
}

export interface ImportPhase2Result {
  nodeId: string;
  deepAnalysis: DeepAnalysisResult;
  descriptorString: string;
  logoUrl: string | null;
}

export type ImportProgressCallback = (progress: {
  phase: 'extracting' | 'classifying' | 'storing' | 'complete' | 'error';
  message: string;
  percentage: number;
}) => void;

// ============================================================
// Phase 1: Immediate Import
// ============================================================

/**
 * Phase 1: Extract and classify content immediately
 * This runs synchronously when user imports a URL
 */
export async function importUrlPhase1(
  url: string,
  onProgress?: ImportProgressCallback
): Promise<ImportPhase1Result> {
  // Validate URL
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  // Check if API key is configured
  const hasKey = await hasApiKey();
  if (!hasKey) {
    throw new Error('OpenAI API key not configured. Please set your API key in settings.');
  }

  // Generate node ID
  const nodeId = uuidv4();

  // Step 1: Extract content from URL
  onProgress?.({
    phase: 'extracting',
    message: 'Extracting content from URL...',
    percentage: 10,
  });

  let extractedContent: ExtractedContent;
  try {
    extractedContent = await extractContent(url);
  } catch (error) {
    // Fall back to quick metadata extraction if full extraction fails
    console.warn('Full extraction failed, falling back to quick metadata:', error);
    const quickMeta = await extractQuickMetadata(url);
    extractedContent = {
      url: quickMeta.url,
      title: quickMeta.title,
      description: null,
      content: null,
      author: null,
      date: null,
      image: null,
      favicon: quickMeta.favicon,
      siteName: null,
    };
  }

  onProgress?.({
    phase: 'extracting',
    message: 'Content extracted',
    percentage: 30,
  });

  // Step 2: Fetch and cache favicon
  onProgress?.({
    phase: 'extracting',
    message: 'Caching favicon...',
    percentage: 40,
  });

  const faviconPath = await fetchAndCacheFavicon(url, extractedContent.favicon);

  // Step 3: Classify content using AI
  onProgress?.({
    phase: 'classifying',
    message: 'Classifying content with AI...',
    percentage: 50,
  });

  // Check if we can determine content type from URL before AI classification
  const urlBasedContentType = detectContentTypeFromUrl(url);

  const { classification, functionCode, organizationCode } = await classifyContent(extractedContent);

  // Override content type if URL-based detection is confident
  if (urlBasedContentType) {
    classification.contentType = urlBasedContentType;
  }

  onProgress?.({
    phase: 'classifying',
    message: `Classified as ${classification.segment}.${classification.category}.${classification.contentType}`,
    percentage: 80,
  });

  // Step 4: Return result (storage will be handled by IPC handler)
  onProgress?.({
    phase: 'complete',
    message: 'Import complete',
    percentage: 100,
  });

  return {
    nodeId,
    extractedContent,
    classification,
    functionCode,
    organizationCode,
    faviconPath,
  };
}

// ============================================================
// Phase 2: Background Enrichment
// ============================================================

/**
 * Phase 2: Deep analysis and enrichment
 * This runs in the background after Phase 1 is complete
 */
export async function importUrlPhase2(
  nodeId: string,
  extractedContent: ExtractedContent,
  existingTitle: string
): Promise<ImportPhase2Result> {
  // Re-extract content if needed (might have more content now)
  let contentForAnalysis = extractedContent;

  // If we don't have content, try to re-extract
  if (!extractedContent.content || extractedContent.content.length < 100) {
    try {
      contentForAnalysis = await extractContent(extractedContent.url);
    } catch {
      // Use existing content if re-extraction fails
      console.warn('Re-extraction failed, using existing content');
    }
  }

  // Perform deep analysis
  const { deepAnalysis, descriptorString, logoUrl } = await enrichContent(
    contentForAnalysis,
    existingTitle
  );

  return {
    nodeId,
    deepAnalysis,
    descriptorString,
    logoUrl,
  };
}

// ============================================================
// Convenience Functions
// ============================================================

/**
 * Convert Phase 1 result to a partial Node object
 * (To be stored in the database)
 */
export function phase1ResultToNode(result: ImportPhase1Result): Partial<Node> {
  return {
    id: result.nodeId,
    title: result.extractedContent.title,
    nodeType: 'item',
    functionCode: result.functionCode,
    organizationCode: result.organizationCode,
    functionParentId: null, // Will be set by hierarchy manager
    organizationParentId: null, // Will be set by hierarchy manager
    functionPosition: 0,
    organizationPosition: 0,
    sourceUrl: result.extractedContent.url,
    faviconPath: result.faviconPath,
    thumbnailPath: result.extractedContent.image || null,
    aiSummary: result.classification.reasoning,
    aiKeyPoints: null, // Will be set in Phase 2
    aiConfidence: result.classification.confidence,
    contentTypeCode: result.classification.contentType as Node['contentTypeCode'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
  };
}

/**
 * Create ImportResult from Phase 1 result
 */
export function createImportResult(
  result: ImportPhase1Result,
  success: boolean,
  error?: string
): ImportResult {
  return {
    success,
    nodeId: result.nodeId,
    error,
    classification: result.classification,
  };
}

/**
 * Validate that a URL hasn't already been imported
 * (To be called before import)
 */
export function normalizeUrlForDuplicateCheck(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove tracking parameters
    const trackingParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'ref',
      'source',
      'fbclid',
      'gclid',
    ];
    trackingParams.forEach((param) => urlObj.searchParams.delete(param));
    // Remove trailing slash
    let normalized = urlObj.toString();
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch {
    return url;
  }
}

/**
 * Extract domain for display purposes
 */
export function getDomainForDisplay(url: string): string {
  return extractDomain(url);
}
