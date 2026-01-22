// ============================================================
// AI Classifier Service - Content Classification
// ============================================================

import { chatCompletion } from './openai';
import {
  QUICK_CLASSIFICATION_SYSTEM_PROMPT,
  DEEP_ANALYSIS_SYSTEM_PROMPT,
  DIFFERENTIATOR_SYSTEM_PROMPT,
  buildQuickClassificationUserPrompt,
  buildDeepAnalysisUserPrompt,
  buildDifferentiatorUserPrompt,
  validateQuickClassification,
  validateDeepAnalysis,
  validateDifferentiator,
  type QuickClassificationResponse,
  type DeepAnalysisResponse,
  type DifferentiatorResponse,
} from './prompts';
import type { ExtractedContent, AIClassification, DeepAnalysisResult } from '@shared/types';

/**
 * Perform quick classification (Phase 1)
 * Fast, lightweight classification for immediate hierarchy positioning
 */
export async function quickClassify(
  extractedContent: ExtractedContent
): Promise<AIClassification> {
  const userPrompt = buildQuickClassificationUserPrompt({
    url: extractedContent.url,
    title: extractedContent.title,
    description: extractedContent.description,
    domain: extractedContent.url ? new URL(extractedContent.url).hostname.replace(/^www\./, '') : '',
    contentPreview: extractedContent.content,
  });

  const response = await chatCompletion(
    QUICK_CLASSIFICATION_SYSTEM_PROMPT,
    userPrompt,
    {
      model: 'gpt-4o-mini', // Fast model for quick classification
      temperature: 0.2,
      maxTokens: 500,
    }
  );

  let parsed: QuickClassificationResponse;
  try {
    parsed = JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${response}`);
  }

  if (!validateQuickClassification(parsed)) {
    throw new Error(`Invalid AI response structure: ${JSON.stringify(parsed)}`);
  }

  return {
    segment: parsed.segment,
    category: parsed.category,
    contentType: parsed.content_type,
    organization: parsed.organization,
    confidence: parsed.confidence,
    reasoning: parsed.reasoning,
  };
}

/**
 * Perform deep analysis (Phase 2)
 * Comprehensive metadata extraction for rich node data
 */
export async function deepAnalyze(
  extractedContent: ExtractedContent
): Promise<DeepAnalysisResult> {
  const userPrompt = buildDeepAnalysisUserPrompt({
    url: extractedContent.url,
    title: extractedContent.title,
    content: extractedContent.content,
    description: extractedContent.description,
  });

  const response = await chatCompletion(
    DEEP_ANALYSIS_SYSTEM_PROMPT,
    userPrompt,
    {
      model: 'gpt-4o', // More capable model for deep analysis
      temperature: 0.3,
      maxTokens: 2000,
    }
  );

  let parsed: DeepAnalysisResponse;
  try {
    parsed = JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${response}`);
  }

  if (!validateDeepAnalysis(parsed)) {
    throw new Error(`Invalid AI response structure: ${JSON.stringify(parsed)}`);
  }

  return {
    title: parsed.title,
    company: parsed.company,
    phraseDescription: parsed.phrase_description,
    shortDescription: parsed.short_description,
    keyConcepts: parsed.key_concepts,
    metadataCodes: {
      ORG: parsed.metadata_codes.ORG || [],
      FNC: parsed.metadata_codes.FNC || [],
      TEC: parsed.metadata_codes.TEC || [],
      CON: parsed.metadata_codes.CON || [],
      IND: parsed.metadata_codes.IND || [],
      AUD: parsed.metadata_codes.AUD || [],
      PRC: parsed.metadata_codes.PRC || [],
      PLT: parsed.metadata_codes.PLT || [],
    },
  };
}

/**
 * Detect differentiators for subcategory creation
 * Used when multiple nodes need to be split at the same hierarchy level
 */
export async function detectDifferentiator(
  items: Array<{ id: string; title: string; description?: string }>,
  currentPath: string
): Promise<DifferentiatorResponse> {
  const userPrompt = buildDifferentiatorUserPrompt({
    items,
    currentPath,
  });

  const response = await chatCompletion(
    DIFFERENTIATOR_SYSTEM_PROMPT,
    userPrompt,
    {
      model: 'gpt-4o',
      temperature: 0.2,
      maxTokens: 1000,
    }
  );

  let parsed: DifferentiatorResponse;
  try {
    parsed = JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${response}`);
  }

  if (!validateDifferentiator(parsed)) {
    throw new Error(`Invalid AI response structure: ${JSON.stringify(parsed)}`);
  }

  return parsed;
}

/**
 * Generate hierarchy code based on classification
 * Format: SEGMENT.CATEGORY.CONTENT_TYPE.SUBCATEGORIES
 */
export function generateHierarchyCode(
  classification: AIClassification,
  subcategories: string[] = []
): string {
  const parts = [
    classification.segment,
    classification.category,
    classification.contentType,
    ...subcategories,
  ];
  return parts.join('.');
}

/**
 * Generate organization hierarchy code
 * Format: ORG.CATEGORY.CONTENT_TYPE.SUBCATEGORIES
 */
export function generateOrgHierarchyCode(
  classification: AIClassification,
  subcategories: string[] = []
): string {
  const parts = [
    classification.organization,
    classification.category,
    classification.contentType,
    ...subcategories,
  ];
  return parts.join('.');
}

/**
 * Create descriptor string from deep analysis
 * Concatenates all text fields for full-text search
 */
export function createDescriptorString(
  title: string,
  deepAnalysis: DeepAnalysisResult,
  url: string
): string {
  const domain = new URL(url).hostname.replace(/^www\./, '');

  const parts = [
    title,
    domain,
    deepAnalysis.company,
    deepAnalysis.phraseDescription,
    deepAnalysis.shortDescription,
    ...deepAnalysis.keyConcepts,
    // Flatten metadata codes
    ...Object.values(deepAnalysis.metadataCodes).flat(),
  ].filter(Boolean);

  return parts.join(' | ');
}

/**
 * Extract logo URL from content if available
 * Uses favicon as fallback
 */
export function extractLogoUrl(extractedContent: ExtractedContent): string | null {
  // Try to get a larger logo from Open Graph or structured data
  if (extractedContent.image) {
    // Check if it looks like a logo (not a content image)
    const imageUrl = extractedContent.image.toLowerCase();
    if (
      imageUrl.includes('logo') ||
      imageUrl.includes('brand') ||
      imageUrl.includes('icon')
    ) {
      return extractedContent.image;
    }
  }

  // Fall back to favicon
  return extractedContent.favicon;
}

/**
 * Full classification pipeline - Phase 1
 * Returns all fields needed for immediate display
 */
export async function classifyContent(extractedContent: ExtractedContent): Promise<{
  classification: AIClassification;
  functionCode: string;
  organizationCode: string;
}> {
  // Get AI classification
  const classification = await quickClassify(extractedContent);

  // Generate hierarchy codes (no subcategories yet - will be added if needed)
  const functionCode = generateHierarchyCode(classification);
  const organizationCode = generateOrgHierarchyCode(classification);

  return {
    classification,
    functionCode,
    organizationCode,
  };
}

/**
 * Full enrichment pipeline - Phase 2
 * Returns all fields needed for complete node data
 */
export async function enrichContent(
  extractedContent: ExtractedContent,
  existingTitle: string
): Promise<{
  deepAnalysis: DeepAnalysisResult;
  descriptorString: string;
  logoUrl: string | null;
}> {
  // Get deep analysis
  const deepAnalysis = await deepAnalyze(extractedContent);

  // Create descriptor string for search
  const descriptorString = createDescriptorString(
    existingTitle,
    deepAnalysis,
    extractedContent.url
  );

  // Extract logo URL
  const logoUrl = extractLogoUrl(extractedContent);

  return {
    deepAnalysis,
    descriptorString,
    logoUrl,
  };
}
