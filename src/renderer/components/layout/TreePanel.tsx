// ============================================================
// Tree Panel - Center panel with hierarchy tree
// ============================================================

import React, { useMemo, useState, useCallback, DragEvent, memo } from 'react';
import { useApp } from '../../context/AppContext';
import type { TreeNode } from '../../../shared/types';

// ============================================================
// Tree Node Component
// ============================================================

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onDrop: (draggedId: string, targetId: string) => void;
  selectedId: string | null;
  expandedIds: Set<string>;
  draggedId: string | null;
  setDraggedId: (id: string | null) => void;
}

const TreeNodeItem = memo(function TreeNodeItem({
  node,
  level,
  onSelect,
  onToggle,
  onDrop,
  selectedId,
  expandedIds,
  draggedId,
  setDraggedId,
}: TreeNodeItemProps): React.ReactElement {
  const [isDragOver, setIsDragOver] = useState(false);
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const isDragging = draggedId === node.id;

  // Can accept drops on categories and container types
  const canAcceptDrop = node.nodeType !== 'item';

  // Get content type badge color
  const getContentTypeBadgeClass = (code: string | null | undefined): string => {
    if (!code) return '';
    const colorMap: Record<string, string> = {
      T: 'gum-badge--pink',    // Tool
      A: 'gum-badge--blue',    // Article
      V: 'gum-badge--green',   // Video
      G: 'gum-badge--yellow',  // Repository
      P: '',                    // Podcast
      R: '',                    // Research
    };
    return colorMap[code] || '';
  };

  // Get node type indicator
  const getNodeTypeIndicator = (): string => {
    switch (node.nodeType) {
      case 'category':
        return '📁';
      case 'content_type':
        return '📂';
      case 'subcategory':
        return '📂';
      case 'item':
        return '';
      default:
        return '📁';
    }
  };

  // Drag handlers
  const handleDragStart = useCallback((e: DragEvent) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(node.id);
  }, [node.id, setDraggedId]);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
  }, [setDraggedId]);

  const handleDragOver = useCallback((e: DragEvent) => {
    if (!canAcceptDrop) return;
    if (draggedId === node.id) return; // Can't drop on self

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, [canAcceptDrop, draggedId, node.id]);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const draggedNodeId = e.dataTransfer.getData('text/plain');
    if (draggedNodeId && draggedNodeId !== node.id && canAcceptDrop) {
      onDrop(draggedNodeId, node.id);
    }
  }, [node.id, canAcceptDrop, onDrop]);

  return (
    <div className="tree-node-wrapper">
      <div
        className={`tree-node-row ${isSelected ? 'selected' : ''} ${node.nodeType} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
        style={{ paddingLeft: level * 16 + 8 }}
        draggable={node.nodeType === 'item'}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Expand/Collapse Button */}
        <button
          className={`tree-expand-btn ${hasChildren ? 'has-children' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(node.id);
          }}
          disabled={!hasChildren}
        >
          {hasChildren ? (isExpanded ? '▼' : '▶') : ''}
        </button>

        {/* Node Content */}
        <div
          className="tree-node-content"
          onClick={() => onSelect(node.id)}
        >
          {/* Favicon or Type Indicator */}
          {node.faviconPath ? (
            <img
              src={`file://${node.faviconPath}`}
              alt=""
              className="tree-node-favicon"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="tree-node-type-icon">{getNodeTypeIndicator()}</span>
          )}

          {/* Title */}
          <span className="tree-node-title">{node.title}</span>

          {/* Content Type Badge */}
          {node.contentTypeCode && node.nodeType === 'item' && (
            <span className={`gum-badge gum-badge--small ${getContentTypeBadgeClass(node.contentTypeCode)}`}>
              {node.contentTypeCode}
            </span>
          )}
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="tree-node-children">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onToggle={onToggle}
              onDrop={onDrop}
              selectedId={selectedId}
              expandedIds={expandedIds}
              draggedId={draggedId}
              setDraggedId={setDraggedId}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// ============================================================
// Tree Panel Component
// ============================================================

export function TreePanel(): React.ReactElement {
  const { state, dispatch, actions } = useApp();
  const {
    currentView,
    segments,
    organizations,
    selectedSegmentId,
    selectedOrganizationId,
    tree,
    selectedNodeId,
    expandedNodeIds,
    treeLoading,
  } = state;

  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Get current panel title
  const panelTitle = useMemo(() => {
    if (currentView === 'function') {
      const segment = segments.find((s) => s.id === selectedSegmentId);
      return segment?.segmentName || 'Select a space';
    } else {
      const org = organizations.find((o) => o.id === selectedOrganizationId);
      return org?.orgName || 'Select an organization';
    }
  }, [currentView, segments, organizations, selectedSegmentId, selectedOrganizationId]);

  // Handlers
  const handleSelectNode = (id: string) => {
    actions.selectNode(id);
  };

  const handleToggleNode = (id: string) => {
    dispatch({ type: 'TOGGLE_NODE_EXPANDED', id });
  };

  const handleDropNode = useCallback(async (draggedNodeId: string, targetId: string) => {
    try {
      await actions.moveNode(draggedNodeId, targetId);
    } catch (err) {
      console.error('Failed to move node:', err);
    }
  }, [actions]);

  return (
    <section className="panel tree-panel">
      <div className="panel-header">
        <div className="tree-header-content">
          <span className="tree-panel-title">{panelTitle}</span>
          <span className="tree-item-count">
            {tree.length > 0 && `${countNodes(tree)} items`}
          </span>
        </div>
        <button
          className="tree-refresh-btn"
          onClick={actions.refreshTree}
          title="Refresh"
        >
          ↻
        </button>
      </div>

      <div className="panel-content">
        {treeLoading ? (
          <div className="tree-loading">
            <span className="loading-spinner">⏳</span>
            <span>Loading...</span>
          </div>
        ) : tree.length === 0 ? (
          <div className="tree-empty">
            <div className="empty-icon">📥</div>
            <p className="text-muted">No items yet</p>
            <p className="text-small text-muted">Import a URL to get started</p>
            <button
              className="gum-button gum-button--pink gum-button--small"
              onClick={actions.openImportDialog}
            >
              Import URL
            </button>
          </div>
        ) : (
          <div className="tree-container">
            {tree.map((node) => (
              <TreeNodeItem
                key={node.id}
                node={node}
                level={0}
                onSelect={handleSelectNode}
                onToggle={handleToggleNode}
                onDrop={handleDropNode}
                selectedId={selectedNodeId}
                expandedIds={expandedNodeIds}
                draggedId={draggedId}
                setDraggedId={setDraggedId}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tree-panel {
          width: var(--panel-tree-width);
          display: flex;
          flex-direction: column;
        }

        .tree-panel .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tree-header-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tree-panel-title {
          font-weight: var(--font-weight-bold);
        }

        .tree-item-count {
          font-size: var(--font-size-xs);
          color: var(--gum-gray-500);
        }

        .tree-refresh-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-size: var(--font-size-lg);
          transition: transform var(--transition-fast);
        }

        .tree-refresh-btn:hover {
          background: var(--gum-gray-100);
          transform: rotate(90deg);
        }

        .tree-loading,
        .tree-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: var(--space-md);
          text-align: center;
        }

        .loading-spinner {
          font-size: 24px;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .tree-container {
          font-size: var(--font-size-sm);
        }

        .tree-node-wrapper {
          /* wrapper for node + children */
        }

        .tree-node-row {
          display: flex;
          align-items: center;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: background var(--transition-fast), border-color var(--transition-fast);
          border: 2px solid transparent;
        }

        .tree-node-row:hover {
          background: var(--gum-gray-100);
        }

        .tree-node-row.selected {
          background: var(--gum-yellow);
        }

        .tree-node-row.dragging {
          opacity: 0.5;
        }

        .tree-node-row.drag-over {
          background: var(--gum-blue);
          border-color: var(--gum-black);
        }

        .tree-node-row.category,
        .tree-node-row.content_type,
        .tree-node-row.subcategory {
          font-weight: var(--font-weight-medium);
        }

        .tree-node-row[draggable="true"] {
          cursor: grab;
        }

        .tree-node-row[draggable="true"]:active {
          cursor: grabbing;
        }

        .tree-expand-btn {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: default;
          font-size: 8px;
          color: var(--gum-gray-500);
          flex-shrink: 0;
          margin-right: var(--space-xs);
        }

        .tree-expand-btn.has-children {
          cursor: pointer;
        }

        .tree-expand-btn.has-children:hover {
          color: var(--gum-black);
        }

        .tree-node-content {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          flex: 1;
          min-width: 0;
        }

        .tree-node-favicon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border-radius: 2px;
        }

        .tree-node-type-icon {
          font-size: 12px;
          flex-shrink: 0;
        }

        .tree-node-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tree-node-children {
          /* children container */
        }

        .gum-badge--small {
          padding: 2px 6px;
          font-size: 10px;
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Helper Functions
// ============================================================

function countNodes(nodes: TreeNode[]): number {
  let count = 0;
  for (const node of nodes) {
    count++;
    if (node.children) {
      count += countNodes(node.children);
    }
  }
  return count;
}
