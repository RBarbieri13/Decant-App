// ============================================================
// App Context - Global State Management
// ============================================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { hierarchyAPI, nodesAPI, searchAPI } from '../services/api';

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
  | { type: 'SET_SEARCH_RESULTS'; results: any[] };

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
