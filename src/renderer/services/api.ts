// ============================================================
// API Service - Frontend HTTP Client
// ============================================================

const API_BASE = '/api';

export interface Node {
  id: string;
  title: string;
  url: string;
  source_domain: string;
  date_added: string;
  company?: string;
  phrase_description?: string;
  short_description?: string;
  logo_url?: string;
  ai_summary?: string;
  extracted_fields?: Record<string, any>;
  metadata_tags?: string[];
  key_concepts?: string[];
  function_parent_id?: string | null;
  organization_parent_id?: string | null;
}

// Nodes API
export const nodesAPI = {
  async getAll(): Promise<Node[]> {
    const res = await fetch(`${API_BASE}/nodes`);
    if (!res.ok) throw new Error('Failed to fetch nodes');
    return res.json();
  },

  async get(id: string): Promise<Node> {
    const res = await fetch(`${API_BASE}/nodes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch node');
    return res.json();
  },

  async create(data: Partial<Node>): Promise<Node> {
    const res = await fetch(`${API_BASE}/nodes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create node');
    return res.json();
  },

  async update(id: string, data: Partial<Node>): Promise<Node> {
    const res = await fetch(`${API_BASE}/nodes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update node');
    return res.json();
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/nodes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete node');
  },
};

// Hierarchy API
export const hierarchyAPI = {
  async getTree(view: 'function' | 'organization'): Promise<any> {
    const res = await fetch(`${API_BASE}/hierarchy/tree/${view}`);
    if (!res.ok) throw new Error(`Failed to fetch ${view} tree`);
    return res.json();
  },

  async getSegments(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/hierarchy/segments`);
    if (!res.ok) throw new Error('Failed to fetch segments');
    return res.json();
  },

  async getOrganizations(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/hierarchy/organizations`);
    if (!res.ok) throw new Error('Failed to fetch organizations');
    return res.json();
  },
};

// Search API
export const searchAPI = {
  async search(query: string, filters?: any): Promise<Node[]> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      params.append('filters', JSON.stringify(filters));
    }
    const res = await fetch(`${API_BASE}/search?${params}`);
    if (!res.ok) throw new Error('Failed to search');
    return res.json();
  },
};

// Import API
export interface ImportResult {
  success: boolean;
  nodeId?: string;
  node?: Node;
  classification?: {
    segment: string;
    contentType: string;
    keyConcepts: string[];
  };
  error?: string;
}

export const importAPI = {
  async importUrl(url: string): Promise<ImportResult> {
    const res = await fetch(`${API_BASE}/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Import failed' };
    }
    return data;
  },
};

// Merge API
export const mergeAPI = {
  async merge(primaryId: string, secondaryId: string, options: { keepMetadata?: boolean; appendSummary?: boolean }): Promise<Node> {
    const res = await fetch(`${API_BASE}/nodes/${primaryId}/merge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secondaryId, options }),
    });
    if (!res.ok) throw new Error('Failed to merge nodes');
    return res.json();
  },
};

// Hierarchy API - Move operations
export const moveAPI = {
  async moveNode(nodeId: string, targetParentId: string, targetHierarchy: 'function' | 'organization'): Promise<Node> {
    const res = await fetch(`${API_BASE}/nodes/${nodeId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetParentId, targetHierarchy }),
    });
    if (!res.ok) throw new Error('Failed to move node');
    return res.json();
  },
};

// Settings API
export const settingsAPI = {
  async setApiKey(apiKey: string): Promise<void> {
    const res = await fetch(`${API_BASE}/settings/api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
    if (!res.ok) throw new Error('Failed to set API key');
  },

  async getApiKeyStatus(): Promise<{ configured: boolean }> {
    const res = await fetch(`${API_BASE}/settings/api-key/status`);
    if (!res.ok) throw new Error('Failed to get API key status');
    return res.json();
  },
};
