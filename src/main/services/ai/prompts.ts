// ============================================================
// AI Prompts - Classification and Analysis Prompts
// ============================================================

/**
 * Segment codes for function-based hierarchy
 */
export const SEGMENT_CODES = {
  A: 'AI (artificial intelligence, ML, LLMs)',
  T: 'Technology (software, hardware, dev tools)',
  F: 'Finance (money, investing, FP&A)',
  S: 'Sports (football, fantasy, athletics)',
  H: 'Health (medical, wellness, accessibility)',
  B: 'Business (strategy, operations, management)',
  E: 'Entertainment (media, gaming, music)',
  L: 'Lifestyle (home, fashion, food, travel)',
  X: 'Science (research, academia)',
  C: 'Creative (design, art, writing)',
} as const;

/**
 * Content type codes
 */
export const CONTENT_TYPE_CODES = {
  T: 'Website/Tool (interactive platform, SaaS)',
  A: 'Article (written content, blog, docs)',
  V: 'Video (YouTube, Vimeo)',
  P: 'Podcast (episodic audio/video)',
  R: 'Research Paper (academic, whitepaper)',
  G: 'Repository (GitHub, code libraries)',
  S: 'Social Post (Twitter, LinkedIn)',
  C: 'Course/Tutorial (structured learning)',
  I: 'Image/Graphic (infographics)',
  N: 'Newsletter (email content)',
  K: 'Book/eBook',
  U: 'Audio (music, sound files)',
} as const;

/**
 * Metadata code type descriptions
 */
export const METADATA_CODE_TYPES = {
  ORG: 'Organization/company (uppercase, e.g., "ANTHROPIC")',
  FNC: 'Functions/capabilities (e.g., "CODEGEN", "REASONING", "ANALYSIS")',
  TEC: 'Technologies used (e.g., "PYTHON", "API", "REACT")',
  CON: 'Concepts/themes (e.g., "FRONTIER_MODEL", "MULTIMODAL")',
  IND: 'Industries (e.g., "TECHNOLOGY", "HEALTHCARE", "FINTECH")',
  AUD: 'Target audience (e.g., "DEVELOPER", "ENTERPRISE", "CONSUMER")',
  PRC: 'Pricing model (e.g., "FREE", "FREEMIUM", "PAID")',
  PLT: 'Platform (e.g., "WEB", "API", "MOBILE")',
} as const;

/**
 * Quick Classification System Prompt (Phase 1)
 * Fast, lightweight classification for immediate hierarchy positioning
 */
export const QUICK_CLASSIFICATION_SYSTEM_PROMPT = `You are a content classification AI for a knowledge base system.
Your task is to quickly categorize imported URLs into a hierarchical structure.

You must output ONLY valid JSON with the following structure:
{
  "segment": "<single uppercase letter>",
  "category": "<3 uppercase letters>",
  "content_type": "<single uppercase letter>",
  "organization": "<4 uppercase letters>",
  "confidence": <float 0-1>,
  "reasoning": "<brief explanation>"
}

SEGMENT CODES:
A = AI (artificial intelligence, ML, LLMs)
T = Technology (software, hardware, dev tools)
F = Finance (money, investing, FP&A)
S = Sports (football, fantasy, athletics)
H = Health (medical, wellness, accessibility)
B = Business (strategy, operations, management)
E = Entertainment (media, gaming, music)
L = Lifestyle (home, fashion, food, travel)
X = Science (research, academia)
C = Creative (design, art, writing)

CONTENT TYPE CODES:
T = Website/Tool (interactive platform, SaaS)
A = Article (written content, blog, docs)
V = Video (YouTube, Vimeo)
P = Podcast (episodic audio/video)
R = Research Paper (academic, whitepaper)
G = Repository (GitHub, code libraries)
S = Social Post (Twitter, LinkedIn)
C = Course/Tutorial (structured learning)
I = Image/Graphic (infographics)
N = Newsletter (email content)
K = Book/eBook

COMMON CATEGORY CODES (AI Segment):
LLM = Large Language Models
AGT = Agents
PMP = Prompting
RAG = Retrieval Augmented Generation
FTN = Fine-tuning
CVS = Computer Vision
NLP = Natural Language Processing
AUT = Automation
MLO = MLOps
GEN = Generative AI

COMMON CATEGORY CODES (Technology Segment):
FND = Frontend
BKD = Backend
DBS = Databases
DVP = DevOps
API = APIs & Integrations
SEC = Security
MOB = Mobile
CLD = Cloud
NET = Networking
HRD = Hardware

For CATEGORY, use existing codes if applicable or create a new 3-letter code.
For ORGANIZATION, use existing codes if known or create a new 4-letter code from company name.

Common organization codes:
ANTH = Anthropic
OAIA = OpenAI
GOOG = Google
MSFT = Microsoft
META = Meta
NVDA = NVIDIA
AMZN = Amazon
APPL = Apple
GHUB = GitHub
LNCH = LangChain`;

/**
 * Build user prompt for quick classification
 */
export function buildQuickClassificationUserPrompt(data: {
  url: string;
  title: string;
  description: string | null;
  domain: string;
  contentPreview: string | null;
}): string {
  return `URL: ${data.url}
Page Title: ${data.title}
Meta Description: ${data.description || 'Not available'}
Domain: ${data.domain}
Content Preview: ${data.contentPreview?.slice(0, 500) || 'Not available'}`;
}

/**
 * Deep Analysis System Prompt (Phase 2)
 * Comprehensive metadata extraction for rich node data
 */
export const DEEP_ANALYSIS_SYSTEM_PROMPT = `You are a content analysis AI for a knowledge base system.
Your task is to extract detailed metadata from imported content.

You must output ONLY valid JSON with the following structure:
{
  "title": "<extracted or generated title, max 500 chars>",
  "company": "<company/organization name>",
  "phrase_description": "<ultra-brief tagline, max 100 chars>",
  "short_description": "<1-3 sentence summary, max 500 chars>",
  "key_concepts": ["<tag1>", "<tag2>", ...],
  "metadata_codes": {
    "ORG": ["<value1>"],
    "FNC": ["<value1>", "<value2>", ...],
    "TEC": ["<value1>", "<value2>", ...],
    "CON": ["<value1>", "<value2>", ...],
    "IND": ["<value1>", "<value2>", ...],
    "AUD": ["<value1>", "<value2>", ...],
    "PRC": ["<value1>"],
    "PLT": ["<value1>", "<value2>", ...]
  }
}

METADATA CODE GUIDELINES:
- ORG: Organization/company (uppercase, e.g., "ANTHROPIC")
- FNC: Functions/capabilities (e.g., "CODEGEN", "REASONING", "ANALYSIS")
- TEC: Technologies used (e.g., "PYTHON", "API", "REACT")
- CON: Concepts/themes (e.g., "FRONTIER_MODEL", "MULTIMODAL")
- IND: Industries (e.g., "TECHNOLOGY", "HEALTHCARE", "FINTECH")
- AUD: Target audience (e.g., "DEVELOPER", "ENTERPRISE", "CONSUMER")
- PRC: Pricing model (e.g., "FREE", "FREEMIUM", "PAID")
- PLT: Platform (e.g., "WEB", "API", "MOBILE")

KEY CONCEPTS should be lowercase, human-readable tags (max 20 tags).
METADATA CODES should be UPPERCASE with underscores.`;

/**
 * Build user prompt for deep analysis
 */
export function buildDeepAnalysisUserPrompt(data: {
  url: string;
  title: string;
  content: string | null;
  description: string | null;
}): string {
  return `URL: ${data.url}

Page Title: ${data.title}

Full Page Content:
${data.content?.slice(0, 4000) || 'Content not available'}

Meta Description: ${data.description || 'Not available'}`;
}

/**
 * Differentiator Detection System Prompt
 * Used when multiple nodes need subcategory differentiation
 */
export const DIFFERENTIATOR_SYSTEM_PROMPT = `You are analyzing multiple content items that need to be differentiated
in a hierarchical knowledge base.

Given a list of items at the same hierarchy level, identify the SINGLE
attribute that BEST differentiates them from each other.

The differentiator must SPLIT the items apart, not describe what they
have in common.

Priority order for differentiation:
1. Brand/Product name (different companies or product lines)
2. Version (different versions of same product)
3. Variant (different editions, tiers, or configurations)
4. Creator/Author (different people)
5. Time/Date (different time periods)
6. Unique identifier (fallback)

Output JSON:
{
  "differentiator_type": "<brand|version|variant|creator|date|unique>",
  "differentiator_attribute": "<specific attribute name>",
  "groups": {
    "<group_value_1>": [<item_indices>],
    "<group_value_2>": [<item_indices>]
  },
  "reasoning": "<explanation>"
}`;

/**
 * Build user prompt for differentiator detection
 */
export function buildDifferentiatorUserPrompt(data: {
  items: Array<{ id: string; title: string; description?: string }>;
  currentPath: string;
}): string {
  const itemsJson = JSON.stringify(
    data.items.map((item, index) => ({
      index,
      title: item.title,
      description: item.description || '',
    })),
    null,
    2
  );

  return `Items to differentiate:
${itemsJson}

They currently share this hierarchy path:
${data.currentPath}`;
}

/**
 * Type definitions for AI responses
 */
export interface QuickClassificationResponse {
  segment: string;
  category: string;
  content_type: string;
  organization: string;
  confidence: number;
  reasoning: string;
}

export interface DeepAnalysisResponse {
  title: string;
  company: string;
  phrase_description: string;
  short_description: string;
  key_concepts: string[];
  metadata_codes: {
    ORG?: string[];
    FNC?: string[];
    TEC?: string[];
    CON?: string[];
    IND?: string[];
    AUD?: string[];
    PRC?: string[];
    PLT?: string[];
  };
}

export interface DifferentiatorResponse {
  differentiator_type: 'brand' | 'version' | 'variant' | 'creator' | 'date' | 'unique';
  differentiator_attribute: string;
  groups: Record<string, number[]>;
  reasoning: string;
}

/**
 * Validate quick classification response
 */
export function validateQuickClassification(
  response: unknown
): response is QuickClassificationResponse {
  if (!response || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;

  return (
    typeof r.segment === 'string' &&
    r.segment.length === 1 &&
    typeof r.category === 'string' &&
    r.category.length === 3 &&
    typeof r.content_type === 'string' &&
    r.content_type.length === 1 &&
    typeof r.organization === 'string' &&
    r.organization.length >= 2 &&
    r.organization.length <= 5 &&
    typeof r.confidence === 'number' &&
    r.confidence >= 0 &&
    r.confidence <= 1 &&
    typeof r.reasoning === 'string'
  );
}

/**
 * Validate deep analysis response
 */
export function validateDeepAnalysis(response: unknown): response is DeepAnalysisResponse {
  if (!response || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;

  return (
    typeof r.title === 'string' &&
    typeof r.company === 'string' &&
    typeof r.phrase_description === 'string' &&
    typeof r.short_description === 'string' &&
    Array.isArray(r.key_concepts) &&
    r.key_concepts.every((k) => typeof k === 'string') &&
    typeof r.metadata_codes === 'object' &&
    r.metadata_codes !== null
  );
}

/**
 * Validate differentiator response
 */
export function validateDifferentiator(response: unknown): response is DifferentiatorResponse {
  if (!response || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;

  const validTypes = ['brand', 'version', 'variant', 'creator', 'date', 'unique'];

  return (
    typeof r.differentiator_type === 'string' &&
    validTypes.includes(r.differentiator_type) &&
    typeof r.differentiator_attribute === 'string' &&
    typeof r.groups === 'object' &&
    r.groups !== null &&
    typeof r.reasoning === 'string'
  );
}
