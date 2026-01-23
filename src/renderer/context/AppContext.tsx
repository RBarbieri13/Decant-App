// ============================================================
// App Context - Global State Management
// ============================================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type {
  Segment,
  Organization,
  TreeNode,
  Node,
  HierarchyView,
  QueueStatus,
  UpdateNodeInput,
} from '../../shared/types';

// ============================================================
// State Types
// ============================================================

interface AppState {
  // View State
  currentView: HierarchyView;

  // Segments & Organizations
  segments: Segment[];
  organizations: Organization[];
  selectedSegmentId: string | null;
  selectedOrganizationId: string | null;

  // Tree State
  tree: TreeNode[];
  selectedNodeId: string | null;
  expandedNodeIds: Set<string>;

  // Detail State
  selectedNode: Node | null;

  // Import State
  importDialogOpen: boolean;
  importStatus: QueueStatus | null;

  // Settings State
  settingsDialogOpen: boolean;

  // Loading States
  loading: boolean;
  treeLoading: boolean;
  detailLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_VIEW'; view: HierarchyView }
  | { type: 'SET_SEGMENTS'; segments: Segment[] }
  | { type: 'SET_ORGANIZATIONS'; organizations: Organization[] }
  | { type: 'SELECT_SEGMENT'; id: string | null }
  | { type: 'SELECT_ORGANIZATION'; id: string | null }
  | { type: 'SET_TREE'; tree: TreeNode[] }
  | { type: 'SELECT_NODE'; id: string | null }
  | { type: 'TOGGLE_NODE_EXPANDED'; id: string }
  | { type: 'SET_SELECTED_NODE_DETAIL'; node: Node | null }
  | { type: 'OPEN_IMPORT_DIALOG' }
  | { type: 'CLOSE_IMPORT_DIALOG' }
  | { type: 'SET_IMPORT_STATUS'; status: QueueStatus }
  | { type: 'OPEN_SETTINGS_DIALOG' }
  | { type: 'CLOSE_SETTINGS_DIALOG' }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_TREE_LOADING'; loading: boolean }
  | { type: 'SET_DETAIL_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

// ============================================================
// Initial State
// ============================================================

const initialState: AppState = {
  currentView: 'function',
  segments: [],
  organizations: [],
  selectedSegmentId: null,
  selectedOrganizationId: null,
  tree: [],
  selectedNodeId: null,
  expandedNodeIds: new Set(),
  selectedNode: null,
  importDialogOpen: false,
  importStatus: null,
  settingsDialogOpen: false,
  loading: true,
  treeLoading: false,
  detailLoading: false,
  error: null,
};

// ============================================================
// Reducer
// ============================================================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.view };

    case 'SET_SEGMENTS':
      return {
        ...state,
        segments: action.segments,
        selectedSegmentId: action.segments.length > 0 ? action.segments[0].id : null,
      };

    case 'SET_ORGANIZATIONS':
      return {
        ...state,
        organizations: action.organizations,
        selectedOrganizationId:
          action.organizations.length > 0 ? action.organizations[0].id : null,
      };

    case 'SELECT_SEGMENT':
      return { ...state, selectedSegmentId: action.id };

    case 'SELECT_ORGANIZATION':
      return { ...state, selectedOrganizationId: action.id };

    case 'SET_TREE':
      return { ...state, tree: action.tree };

    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.id };

    case 'TOGGLE_NODE_EXPANDED': {
      const newExpanded = new Set(state.expandedNodeIds);
      if (newExpanded.has(action.id)) {
        newExpanded.delete(action.id);
      } else {
        newExpanded.add(action.id);
      }
      return { ...state, expandedNodeIds: newExpanded };
    }

    case 'SET_SELECTED_NODE_DETAIL':
      return { ...state, selectedNode: action.node };

    case 'OPEN_IMPORT_DIALOG':
      return { ...state, importDialogOpen: true };

    case 'CLOSE_IMPORT_DIALOG':
      return { ...state, importDialogOpen: false };

    case 'SET_IMPORT_STATUS':
      return { ...state, importStatus: action.status };

    case 'OPEN_SETTINGS_DIALOG':
      return { ...state, settingsDialogOpen: true };

    case 'CLOSE_SETTINGS_DIALOG':
      return { ...state, settingsDialogOpen: false };

    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'SET_TREE_LOADING':
      return { ...state, treeLoading: action.loading };

    case 'SET_DETAIL_LOADING':
      return { ...state, detailLoading: action.loading };

    case 'SET_ERROR':
      return { ...state, error: action.error };

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
    updateNode: (id: string, data: UpdateNodeInput) => Promise<void>;
    deleteNode: (id: string) => Promise<void>;
    moveNode: (nodeId: string, newParentId: string) => Promise<void>;
    toggleView: () => void;
    openImportDialog: () => void;
    closeImportDialog: () => void;
    importUrl: (url: string) => Promise<void>;
    refreshTree: () => Promise<void>;
    openSettingsDialog: () => void;
    closeSettingsDialog: () => void;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

// ============================================================
// Provider
// ============================================================

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load segments
  const loadSegments = useCallback(async () => {
    try {
      const segments = await window.decantAPI.hierarchy.getSegments();
      dispatch({ type: 'SET_SEGMENTS', segments });
    } catch (err) {
      console.error('Failed to load segments:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to load segments' });
    }
  }, []);

  // Load organizations
  const loadOrganizations = useCallback(async () => {
    try {
      const organizations = await window.decantAPI.hierarchy.getOrganizations();
      dispatch({ type: 'SET_ORGANIZATIONS', organizations });
    } catch (err) {
      console.error('Failed to load organizations:', err);
    }
  }, []);

  // Load tree based on current view and selection
  const loadTree = useCallback(async () => {
    dispatch({ type: 'SET_TREE_LOADING', loading: true });
    try {
      const rootId =
        state.currentView === 'function'
          ? state.selectedSegmentId
          : state.selectedOrganizationId;

      // Load tree with or without rootId (rootId is optional - if not provided, shows root items)
      const tree = await window.decantAPI.hierarchy.getTree(state.currentView, rootId || undefined);
      dispatch({ type: 'SET_TREE', tree });
    } catch (err) {
      console.error('Failed to load tree:', err);
      dispatch({ type: 'SET_TREE', tree: [] });
    } finally {
      dispatch({ type: 'SET_TREE_LOADING', loading: false });
    }
  }, [state.currentView, state.selectedSegmentId, state.selectedOrganizationId]);

  // Select a node and load its details
  const selectNode = useCallback(async (id: string | null) => {
    dispatch({ type: 'SELECT_NODE', id });

    if (id) {
      dispatch({ type: 'SET_DETAIL_LOADING', loading: true });
      try {
        const node = await window.decantAPI.nodes.read(id);
        dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node });
      } catch (err) {
        console.error('Failed to load node details:', err);
        dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node: null });
      } finally {
        dispatch({ type: 'SET_DETAIL_LOADING', loading: false });
      }
    } else {
      dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node: null });
    }
  }, []);

  // Update a node
  const updateNode = useCallback(async (id: string, data: UpdateNodeInput) => {
    try {
      const updatedNode = await window.decantAPI.nodes.update(id, data);
      // Update selected node if it's the one being updated
      if (state.selectedNodeId === id) {
        dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node: updatedNode });
      }
      // Refresh tree to reflect title changes
      await loadTree();
    } catch (err) {
      console.error('Failed to update node:', err);
      throw err;
    }
  }, [state.selectedNodeId, loadTree]);

  // Delete a node
  const deleteNode = useCallback(async (id: string) => {
    try {
      await window.decantAPI.nodes.delete(id);
      // Clear selection if deleted node was selected
      if (state.selectedNodeId === id) {
        dispatch({ type: 'SELECT_NODE', id: null });
        dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node: null });
      }
      // Refresh tree
      await loadTree();
    } catch (err) {
      console.error('Failed to delete node:', err);
      throw err;
    }
  }, [state.selectedNodeId, loadTree]);

  // Move a node to a new parent
  const moveNode = useCallback(async (nodeId: string, newParentId: string) => {
    try {
      await window.decantAPI.nodes.move(nodeId, newParentId, state.currentView);
      // Refresh tree to reflect new structure
      await loadTree();
    } catch (err) {
      console.error('Failed to move node:', err);
      throw err;
    }
  }, [state.currentView, loadTree]);

  // Toggle between function and organization view
  const toggleView = useCallback(() => {
    const newView = state.currentView === 'function' ? 'organization' : 'function';
    dispatch({ type: 'SET_VIEW', view: newView });
  }, [state.currentView]);

  // Open import dialog
  const openImportDialog = useCallback(() => {
    dispatch({ type: 'OPEN_IMPORT_DIALOG' });
  }, []);

  // Close import dialog
  const closeImportDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_IMPORT_DIALOG' });
  }, []);

  // Open settings dialog
  const openSettingsDialog = useCallback(() => {
    dispatch({ type: 'OPEN_SETTINGS_DIALOG' });
  }, []);

  // Close settings dialog
  const closeSettingsDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_SETTINGS_DIALOG' });
  }, []);

  // Import a URL
  const importUrl = useCallback(async (url: string) => {
    try {
      const result = await window.decantAPI.import.url(url);
      if (result.success) {
        // Refresh tree after import
        await loadTree();
        dispatch({ type: 'CLOSE_IMPORT_DIALOG' });
        // Select the newly imported node
        if (result.nodeId) {
          await selectNode(result.nodeId);
        }
      } else {
        throw new Error(result.error || 'Import failed');
      }
    } catch (err) {
      console.error('Import failed:', err);
      throw err;
    }
  }, [loadTree, selectNode]);

  // Refresh tree
  const refreshTree = useCallback(async () => {
    await loadTree();
  }, [loadTree]);

  // Initial load
  useEffect(() => {
    const init = async () => {
      dispatch({ type: 'SET_LOADING', loading: true });
      await Promise.all([loadSegments(), loadOrganizations()]);
      dispatch({ type: 'SET_LOADING', loading: false });
    };
    init();
  }, [loadSegments, loadOrganizations]);

  // Load tree when selection changes
  useEffect(() => {
    loadTree();
  }, [loadTree]);

  // Listen for keyboard shortcut events
  useEffect(() => {
    const handleOpenImport = () => {
      dispatch({ type: 'OPEN_IMPORT_DIALOG' });
    };

    const handleOpenSettings = () => {
      dispatch({ type: 'OPEN_SETTINGS_DIALOG' });
    };

    const handleSetView = (e: Event) => {
      const customEvent = e as CustomEvent<'function' | 'organization'>;
      if (customEvent.detail && customEvent.detail !== state.currentView) {
        dispatch({ type: 'SET_VIEW', view: customEvent.detail });
      }
    };

    const handleEscape = () => {
      // Close import dialog if open
      if (state.importDialogOpen) {
        dispatch({ type: 'CLOSE_IMPORT_DIALOG' });
      }
      // Otherwise clear selection
      else if (state.selectedNodeId) {
        dispatch({ type: 'SELECT_NODE', id: null });
        dispatch({ type: 'SET_SELECTED_NODE_DETAIL', node: null });
      }
    };

    const handleRefresh = () => {
      loadTree();
    };

    window.addEventListener('decant:open-import', handleOpenImport);
    window.addEventListener('decant:open-settings', handleOpenSettings);
    window.addEventListener('decant:set-view', handleSetView);
    window.addEventListener('decant:escape', handleEscape);
    window.addEventListener('decant:refresh', handleRefresh);

    return () => {
      window.removeEventListener('decant:open-import', handleOpenImport);
      window.removeEventListener('decant:open-settings', handleOpenSettings);
      window.removeEventListener('decant:set-view', handleSetView);
      window.removeEventListener('decant:escape', handleEscape);
      window.removeEventListener('decant:refresh', handleRefresh);
    };
  }, [state.currentView, state.importDialogOpen, state.selectedNodeId, loadTree]);

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
      moveNode,
      toggleView,
      openImportDialog,
      closeImportDialog,
      importUrl,
      refreshTree,
      openSettingsDialog,
      closeSettingsDialog,
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
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Convenience hooks
export function useAppState(): AppState {
  return useApp().state;
}

export function useAppActions() {
  return useApp().actions;
}
