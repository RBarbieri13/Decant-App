// ============================================================
// AI Service - Main Export
// ============================================================

export {
  getApiKey,
  setApiKey,
  deleteApiKey,
  hasApiKey,
  getOpenAIClient,
  chatCompletion,
  validateApiKey,
} from './openai';

export {
  quickClassify,
  deepAnalyze,
  detectDifferentiator,
  generateHierarchyCode,
  generateOrgHierarchyCode,
  createDescriptorString,
  extractLogoUrl,
  classifyContent,
  enrichContent,
} from './classifier';

export {
  SEGMENT_CODES,
  CONTENT_TYPE_CODES,
  METADATA_CODE_TYPES,
  QUICK_CLASSIFICATION_SYSTEM_PROMPT,
  DEEP_ANALYSIS_SYSTEM_PROMPT,
  DIFFERENTIATOR_SYSTEM_PROMPT,
  buildQuickClassificationUserPrompt,
  buildDeepAnalysisUserPrompt,
  buildDifferentiatorUserPrompt,
  validateQuickClassification,
  validateDeepAnalysis,
  validateDifferentiator,
} from './prompts';

export type {
  QuickClassificationResponse,
  DeepAnalysisResponse,
  DifferentiatorResponse,
} from './prompts';
