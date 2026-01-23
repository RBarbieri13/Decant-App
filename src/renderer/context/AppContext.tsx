// ============================================================
// App Context - Global State Management
// ============================================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { hierarchyAPI, nodesAPI, searchAPI, importAPI, settingsAPI, mergeAPI, moveAPI } from '../services/api';

// ============================================================
// State Types
// ============================================================

interface AppState {
  currentView: 'function' | 'organization';
  segments: any[];
  organizations: any[];
  tree: any[];
  selectedNodeId: string | null;
  selectedNode: any | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  searchResults: any[];
  importDialogOpen: boolean;
  mergeDialogOpen: boolean;
  mergeSourceNodeId: string | null;
  selectedSegmentId: string | null;
  selectedOrganizationId: string | null;
  expandedNodeIds: Set<string>;
  searchResultIds: Set<string>;
  treeLoading: boolean;
}

type AppAction =
  | { type: 'SET_VIEW'; view: 'function' | 'organization' }
  | { type: 'SET_SEGMENTS'; segments: any[] }
  | { type: 'SET_ORGANIZATIONS'; organizations: any[] }
  | { type: 'SET_TREE'; tree: any[] }
  | { type: 'SELECT_NODE'; id: string | null }
  | { type: 'SET_SELECTED_NODE'; node: any }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_SEARCH_RESULTS'; results: any[] }
  | { type: 'OPEN_IMPORT_DIALOG' }
  | { type: 'CLOSE_IMPORT_DIALOG' }
  | { type: 'OPEN_MERGE_DIALOG'; nodeId: string }
  | { type: 'CLOSE_MERGE_DIALOG' }
  | { type: 'SET_SELECTED_SEGMENT'; id: string | null }
  | { type: 'SET_SELECTED_ORGANIZATION'; id: string | null }
  | { type: 'TOGGLE_NODE_EXPANDED'; id: string }
  | { type: 'SET_TREE_LOADING'; loading: boolean }
  | { type: 'SET_SEARCH_RESULT_IDS'; ids: Set<string> };

// ============================================================
// Initial State
// ============================================================

const initialState: AppState = {
  currentView: 'function',
  segments: [],
  organizations: [],
  tree: [],
  selectedNodeId: null,
  selectedNode: null,
  loading: true,
  error: null,
  searchQuery: '',
  searchResults: [],
  importDialogOpen: false,
  mergeDialogOpen: false,
  mergeSourceNodeId: null,
  selectedSegmentId: null,
  selectedOrganizationId: null,
  expandedNodeIds: new Set(),
  searchResultIds: new Set(),
  treeLoading: true,
};

// ============================================================
// Reducer
// ============================================================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.view };
    case 'SET_SEGMENTS':
      return { ...state, segments: action.segments };
    case 'SET_ORGANIZATIONS':
      return { ...state, organizations: action.organizations };
    case 'SET_TREE':
      return { ...state, tree: action.tree };
    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.id };
    case 'SET_SELECTED_NODE':
      return { ...state, selectedNode: action.node };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.query };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.results };
    case 'OPEN_IMPORT_DIALOG':
      return { ...state, importDialogOpen: true };
    case 'CLOSE_IMPORT_DIALOG':
      return { ...state, importDialogOpen: false };
    case 'OPEN_MERGE_DIALOG':
      return { ...state, mergeDialogOpen: true, mergeSourceNodeId: action.nodeId };
    case 'CLOSE_MERGE_DIALOG':
      return { ...state, mergeDialogOpen: false, mergeSourceNodeId: null };
    case 'SET_SELECTED_SEGMENT':
      return { ...state, selectedSegmentId: action.id };
    case 'SET_SELECTED_ORGANIZATION':
      return { ...state, selectedOrganizationId: action.id };
    case 'TOGGLE_NODE_EXPANDED': {
      const newSet = new Set(state.expandedNodeIds);
      if (newSet.has(action.id)) {
        newSet.delete(action.id);
      } else {
        newSet.add(action.id);
      }
      return { ...state, expandedNodeIds: newSet };
    }
    case 'SET_TREE_LOADING':
      return { ...state, treeLoading: action.loading };
    case 'SET_SEARCH_RESULT_IDS':
      return { ...state, searchResultIds: action.ids };
    default:
      return state;
  }
}

// ============================================================
// Context
// ============================================================

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    loadSegments: () => Promise<void>;
    loadOrganizations: () => Promise<void>;
    loadTree: () => Promise<void>;
    selectNode: (id: string | null) => Promise<void>;
    updateNode: (id: string, data: any) => Promise<void>;
    deleteNode: (id: string) => Promise<void>;
    toggleView: () => void;
    search: (query: string) => Promise<void>;
    refreshTree: () => Promise<void>;
    importUrl: (url: string) => Promise<{ success: boolean; nodeId?: string; error?: string }>;
    setApiKey: (apiKey: string) => Promise<void>;
    checkApiKeyStatus: () => Promise<boolean>;
    openImportDialog: () => void;
    closeImportDialog: () => void;
    openMergeDialog: (nodeId: string) => void;
    closeMergeDialog: () => void;
    mergeNodes: (primaryId: string, secondaryId: string, options: { keepMetadata?: boolean; appendSummary?: boolean }) => Promise<void>;
    moveNode: (nodeId: string, targetParentId: string) => Promise<void>;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

// ============================================================
// Provider
// ============================================================

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadSegments = useCallback(async () => {
    try {
      const segments = await hierarchyAPI.getSegments();
      dispatch({ type: 'SET_SEGMENTS', segments });
    } catch (err) {
      console.error('Failed to load segments:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to load segments' });
    }
  }, []);

  const loadOrganizations = useCallback(async () => {
    try {
      const organizations = await hierarchyAPI.getOrganizations();
      dispatch({ type: 'SET_ORGANIZATIONS', organizations });
    } catch (err) {
      console.error('Failed to load organizations:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to load organizations' });
    }
  }, []);

  const loadTree = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const response = await hierarchyAPI.getTree(state.currentView);
      // The API returns { taxonomy, root } - we want to display root nodes
      const tree = response.root || [];
      dispatch({ type: 'SET_TREE', tree });
    } catch (err) {
      console.error('Failed to load tree:', err);
      dispatch({ type: 'SET_TREE', tree: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }, [state.currentView]);

  const selectNode = useCallback(async (id: string | null) => {
    dispatch({ type: 'SELECT_NODE', id });

    if (id) {
      try {
        const node = await nodesAPI.get(id);
        dispatch({ type: 'SET_SELECTED_NODE', node });
      } catch (err) {
        console.error('Failed to load node details:', err);
        dispatch({ type: 'SET_SELECTED_NODE', node: null });
      }
    } else {
      dispatch({ type: 'SET_SELECTED_NODE', node: null });
    }
  }, []);

  const updateNode = useCallback(async (id: string, data: any) => {
    try {
      const updatedNode = await nodesAPI.update(id, data);
      dispatch({ type: 'SET_SELECTED_NODE', node: updatedNode });
      await loadTree();
    } catch (err) {
      console.error('Failed to update node:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to update node' });
    }
  }, [loadTree]);

  const deleteNode = useCallback(async (id: string) => {
    try {
      await nodesAPI.delete(id);
      dispatch({ type: 'SELECT_NODE', id: null });
      dispatch({ type: 'SET_SELECTED_NODE', node: null });
      await loadTree();
    } catch (err) {
      console.error('Failed to delete node:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to delete node' });
    }
  }, [loadTree]);

  const toggleView = useCallback(() => {
    const newView = state.currentView === 'function' ? 'organization' : 'function';
    dispatch({ type: 'SET_VIEW', view: newView });
  }, [state.currentView]);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', query: '' });
      dispatch({ type: 'SET_SEARCH_RESULTS', results: [] });
      return;
    }

    try {
      const results = await searchAPI.search(query);
      dispatch({ type: 'SET_SEARCH_QUERY', query });
      dispatch({ type: 'SET_SEARCH_RESULTS', results });
    } catch (err) {
      console.error('Search failed:', err);
      dispatch({ type: 'SET_ERROR', error: 'Search failed' });
    }
  }, []);

  const refreshTree = useCallback(async () => {
    await loadTree();
  }, [loadTree]);

  const importUrl = useCallback(async (url: string) => {
    try {
      const result = await importAPI.importUrl(url);
      if (result.success) {
        // Refresh tree to show the new node
        await loadTree();
        // Select the newly imported node
        if (result.nodeId) {
          await selectNode(result.nodeId);
        }
      }
      return result;
    } catch (err) {
      console.error('Import failed:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Import failed' };
    }
  }, [loadTree, selectNode]);

  const setApiKey = useCallback(async (apiKey: string) => {
    await settingsAPI.setApiKey(apiKey);
  }, []);

  const checkApiKeyStatus = useCallback(async () => {
    const status = await settingsAPI.getApiKeyStatus();
    return status.configured;
  }, []);

  const openImportDialog = useCallback(() => {
    dispatch({ type: 'OPEN_IMPORT_DIALOG' });
  }, []);

  const closeImportDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_IMPORT_DIALOG' });
  }, []);

  const openMergeDialog = useCallback((nodeId: string) => {
    dispatch({ type: 'OPEN_MERGE_DIALOG', nodeId });
  }, []);

  const closeMergeDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_MERGE_DIALOG' });
  }, []);

  const mergeNodes = useCallback(async (primaryId: string, secondaryId: string, options: { keepMetadata?: boolean; appendSummary?: boolean }) => {
    try {
      await mergeAPI.merge(primaryId, secondaryId, options);
      dispatch({ type: 'CLOSE_MERGE_DIALOG' });
      await loadTree();
      await selectNode(primaryId);
    } catch (err) {
      console.error('Failed to merge nodes:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to merge nodes' });
    }
  }, [loadTree, selectNode]);

  const moveNode = useCallback(async (nodeId: string, targetParentId: string) => {
    try {
      await moveAPI.moveNode(nodeId, targetParentId, state.currentView);
      await loadTree();
    } catch (err) {
      console.error('Failed to move node:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to move node' });
    }
  }, [loadTree, state.currentView]);

  // Load initial data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([loadSegments(), loadOrganizations()]);
        await loadTree();
      } catch (err) {
        console.error('Failed to initialize app:', err);
        dispatch({ type: 'SET_ERROR', error: 'Failed to initialize app' });
      }
    };
    initializeApp();
  }, []);

  const value: AppContextValue = {
    state,
    dispatch,
    actions: {
      loadSegments,
      loadOrganizations,
      loadTree,
      selectNode,
      updateNode,
      deleteNode,
      toggleView,
      search,
      refreshTree,
      importUrl,
      setApiKey,
      checkApiKeyStatus,
      openImportDialog,
      closeImportDialog,
      openMergeDialog,
      closeMergeDialog,
      mergeNodes,
      moveNode,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================================
// Hook
// ============================================================

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
