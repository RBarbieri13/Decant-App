// ============================================================
// Preload Script - Context Bridge
// ============================================================

import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from './shared/constants';
import type {
  DecantAPI,
  CreateNodeInput,
  UpdateNodeInput,
  HierarchyView,
  SearchFilters,
} from './shared/types';

/**
 * Expose secure API to renderer process via context bridge
 */
const decantAPI: DecantAPI = {
  nodes: {
    create: (data: CreateNodeInput) =>
      ipcRenderer.invoke(IPC_CHANNELS.NODES_CREATE, data),

    read: (id: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.NODES_READ, id),

    update: (id: string, data: UpdateNodeInput) =>
      ipcRenderer.invoke(IPC_CHANNELS.NODES_UPDATE, id, data),

    delete: (id: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.NODES_DELETE, id),

    move: (id: string, newParentId: string, view: HierarchyView) =>
      ipcRenderer.invoke(IPC_CHANNELS.NODES_MOVE, id, newParentId, view),
  },

  hierarchy: {
    getTree: (view: HierarchyView, rootId?: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.HIERARCHY_GET_TREE, view, rootId),

    getPath: (nodeId: string, view: HierarchyView) =>
      ipcRenderer.invoke(IPC_CHANNELS.HIERARCHY_GET_PATH, nodeId, view),

    getSegments: () =>
      ipcRenderer.invoke(IPC_CHANNELS.HIERARCHY_GET_SEGMENTS),

    getOrganizations: () =>
      ipcRenderer.invoke(IPC_CHANNELS.HIERARCHY_GET_ORGANIZATIONS),
  },

  import: {
    url: (url: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.IMPORT_URL, url),

    status: () =>
      ipcRenderer.invoke(IPC_CHANNELS.IMPORT_STATUS),

    onProgress: (callback: (event: unknown, progress: number) => void) => {
      ipcRenderer.on(IPC_CHANNELS.IMPORT_PROGRESS, callback);
    },
  },

  search: {
    query: (query: string, filters?: SearchFilters) =>
      ipcRenderer.invoke(IPC_CHANNELS.SEARCH_QUERY, query, filters),
  },

  settings: {
    get: (key: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET, key),

    set: (key: string, value: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET, key, value),

    getApiKey: () =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET_API_KEY),

    setApiKey: (key: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET_API_KEY, key),
  },

  data: {
    export: () =>
      ipcRenderer.invoke(IPC_CHANNELS.DATA_EXPORT),

    import: (jsonData: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.DATA_IMPORT, jsonData),
  },
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('decantAPI', decantAPI);

console.log('Decant API exposed to renderer');
