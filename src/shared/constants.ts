// ============================================================
// Decant Shared Constants
// ============================================================

import type { ContentTypeCode, SegmentCode, GumroadColor } from './types';

// ============================================================
// IPC Channel Names
// ============================================================

export const IPC_CHANNELS = {
  // Nodes
  NODES_CREATE: 'nodes:create',
  NODES_READ: 'nodes:read',
  NODES_UPDATE: 'nodes:update',
  NODES_DELETE: 'nodes:delete',
  NODES_MOVE: 'nodes:move',

  // Hierarchy
  HIERARCHY_GET_TREE: 'hierarchy:get-tree',
  HIERARCHY_GET_PATH: 'hierarchy:get-path',
  HIERARCHY_GET_SEGMENTS: 'hierarchy:get-segments',
  HIERARCHY_GET_ORGANIZATIONS: 'hierarchy:get-organizations',

  // Import
  IMPORT_URL: 'import:url',
  IMPORT_STATUS: 'import:status',
  IMPORT_PROGRESS: 'import:progress',

  // Search
  SEARCH_QUERY: 'search:query',

  // Settings
  SETTINGS_GET: 'settings:get',
  SETTINGS_SET: 'settings:set',
  SETTINGS_GET_API_KEY: 'settings:get-api-key',
  SETTINGS_SET_API_KEY: 'settings:set-api-key',

  // Data Export/Import
  DATA_EXPORT: 'data:export',
  DATA_IMPORT: 'data:import',
} as const;

// ============================================================
// Content Type Mappings
// ============================================================

export const CONTENT_TYPE_LABELS: Record<ContentTypeCode, string> = {
  T: 'Tool',
  A: 'Article',
  V: 'Video',
  P: 'Paper',
  D: 'Documentation',
  C: 'Course',
  R: 'Repository',
};

export const CONTENT_TYPE_ICONS: Record<ContentTypeCode, string> = {
  T: '🔧',
  A: '📄',
  V: '▶️',
  P: '📑',
  D: '📚',
  C: '🎓',
  R: '💻',
};

export const CONTENT_TYPE_COLORS: Record<ContentTypeCode, GumroadColor> = {
  T: 'pink',
  A: 'blue',
  V: 'pink',
  P: 'yellow',
  D: 'blue',
  C: 'green',
  R: 'blue',
};

// ============================================================
// Segment Mappings
// ============================================================

export const SEGMENT_LABELS: Record<SegmentCode, string> = {
  A: 'AI',
  T: 'Technology',
  S: 'Science',
  R: 'Resources',
};

export const SEGMENT_COLORS: Record<SegmentCode, GumroadColor> = {
  A: 'pink',
  T: 'blue',
  S: 'green',
  R: 'yellow',
};

export const SEGMENT_ICONS: Record<SegmentCode, string> = {
  A: '🤖',
  T: '💻',
  S: '🔬',
  R: '📚',
};

// ============================================================
// Gumroad Colors (CSS values)
// ============================================================

export const GUMROAD_COLORS: Record<GumroadColor, string> = {
  pink: '#FF90E8',
  yellow: '#E1FF3C',
  blue: '#90A8ED',
  green: '#23C66B',
};

// ============================================================
// Default Segments
// ============================================================

export const DEFAULT_SEGMENTS: Array<{
  code: SegmentCode;
  name: string;
  color: GumroadColor;
}> = [
  { code: 'A', name: 'AI', color: 'pink' },
  { code: 'T', name: 'Technology', color: 'blue' },
  { code: 'S', name: 'Science', color: 'green' },
  { code: 'R', name: 'Resources', color: 'yellow' },
];

// ============================================================
// Default Organizations
// ============================================================

export const DEFAULT_ORGANIZATIONS: Array<{
  code: string;
  name: string;
}> = [
  { code: 'ANTH', name: 'Anthropic' },
  { code: 'OAI', name: 'OpenAI' },
  { code: 'GOOG', name: 'Google' },
  { code: 'MSFT', name: 'Microsoft' },
  { code: 'META', name: 'Meta' },
  { code: 'IND', name: 'Independent' },
];

// ============================================================
// App Settings Keys
// ============================================================

export const SETTINGS_KEYS = {
  OPENAI_API_KEY: 'openai_api_key',
  THEME: 'theme',
  VIEW_MODE: 'view_mode',
  LAST_SELECTED_SEGMENT: 'last_selected_segment',
} as const;

// ============================================================
// App Data Paths
// ============================================================

export const APP_NAME = 'Decant';
export const DATABASE_FILENAME = 'decant.db';
export const CACHE_DIR_NAME = 'cache';
export const FAVICONS_DIR_NAME = 'favicons';
export const THUMBNAILS_DIR_NAME = 'thumbnails';

// ============================================================
// AI Configuration
// ============================================================

export const AI_CONFIG = {
  MODEL: 'gpt-4-turbo-preview',
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.3,
  MAX_CONTENT_LENGTH: 4000, // Characters of content to send to AI
} as const;

// ============================================================
// URL Patterns for Content Type Detection
// ============================================================

export const URL_PATTERNS = {
  YOUTUBE: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch|youtu\.be\/)/i,
  GITHUB: /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+/i,
  TWITTER: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\//i,
  ARXIV: /^(https?:\/\/)?(www\.)?arxiv\.org\//i,
  PDF: /\.pdf(\?.*)?$/i,
} as const;
