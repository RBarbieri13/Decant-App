// ============================================================
// Detail Panel - Right panel showing node details
// ============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

interface EditState {
  title: string;
  aiSummary: string;
}

export function DetailPanel(): React.ReactElement {
  const { state, actions } = useApp();
  const { selectedNode, detailLoading, currentView } = state;

  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState<EditState>({ title: '', aiSummary: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset edit state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setEditState({
        title: selectedNode.title,
        aiSummary: selectedNode.aiSummary || '',
      });
    }
    setIsEditing(false);
    setShowDeleteConfirm(false);
  }, [selectedNode?.id]);

  // Format date for display
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return 'Unknown';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Get content type label
  const getContentTypeLabel = (code: string | null): string => {
    if (!code) return 'Unknown';
    const labels: Record<string, string> = {
      T: 'Tool / Website',
      A: 'Article',
      V: 'Video',
      P: 'Podcast',
      R: 'Research Paper',
      G: 'Repository',
      S: 'Social Post',
      C: 'Course / Tutorial',
      I: 'Image / Graphic',
      N: 'Newsletter',
      K: 'Book / eBook',
    };
    return labels[code] || code;
  };

  // Get badge color for content type
  const getContentTypeBadgeClass = (code: string | null): string => {
    if (!code) return '';
    const colorMap: Record<string, string> = {
      T: 'gum-badge--pink',
      A: 'gum-badge--blue',
      V: 'gum-badge--green',
      G: 'gum-badge--yellow',
    };
    return colorMap[code] || '';
  };

  // Handle edit input changes
  const handleEditChange = useCallback(
    (field: keyof EditState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditState((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  // Start editing
  const handleStartEdit = useCallback(() => {
    if (selectedNode) {
      setEditState({
        title: selectedNode.title,
        aiSummary: selectedNode.aiSummary || '',
      });
      setIsEditing(true);
    }
  }, [selectedNode]);

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    if (selectedNode) {
      setEditState({
        title: selectedNode.title,
        aiSummary: selectedNode.aiSummary || '',
      });
    }
    setIsEditing(false);
  }, [selectedNode]);

  // Save changes
  const handleSave = useCallback(async () => {
    if (!selectedNode) return;

    setIsSaving(true);
    try {
      await actions.updateNode(selectedNode.id, {
        title: editState.title,
        aiSummary: editState.aiSummary || null,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  }, [selectedNode, editState, actions]);

  // Handle delete
  const handleDelete = useCallback(async () => {
    if (!selectedNode) return;

    setIsDeleting(true);
    try {
      await actions.deleteNode(selectedNode.id);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setIsDeleting(false);
    }
  }, [selectedNode, actions]);

  return (
    <section className="panel detail-panel">
      <div className="panel-header">
        <span>Details</span>
        {isEditing && <span className="edit-indicator">Editing</span>}
      </div>

      <div className="panel-content">
        {detailLoading ? (
          <div className="detail-loading">
            <span className="loading-spinner">⏳</span>
            <span>Loading details...</span>
          </div>
        ) : !selectedNode ? (
          <div className="detail-empty">
            <div className="empty-icon">👆</div>
            <p className="text-muted">Select an item to view details</p>
          </div>
        ) : (
          <div className="detail-content">
            {/* Header with favicon and title */}
            <div className="detail-header">
              {selectedNode.faviconPath && (
                <img
                  src={`file://${selectedNode.faviconPath}`}
                  alt=""
                  className="detail-favicon"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="detail-header-text">
                {isEditing ? (
                  <input
                    type="text"
                    className="gum-input detail-title-input"
                    value={editState.title}
                    onChange={handleEditChange('title')}
                    placeholder="Title"
                    autoFocus
                  />
                ) : (
                  <h2 className="detail-title">{selectedNode.title}</h2>
                )}
                {selectedNode.contentTypeCode && (
                  <span className={`gum-badge ${getContentTypeBadgeClass(selectedNode.contentTypeCode)}`}>
                    {getContentTypeLabel(selectedNode.contentTypeCode)}
                  </span>
                )}
              </div>
            </div>

            {/* Source URL */}
            {selectedNode.sourceUrl && (
              <div className="detail-section">
                <div className="detail-label">Source</div>
                <a
                  href={selectedNode.sourceUrl}
                  className="detail-url"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(selectedNode.sourceUrl!, '_blank');
                  }}
                >
                  {new URL(selectedNode.sourceUrl).hostname}
                  <span className="external-link-icon">↗</span>
                </a>
              </div>
            )}

            {/* Hierarchy Code */}
            <div className="detail-section">
              <div className="detail-label">
                {currentView === 'function' ? 'Function Code' : 'Organization Code'}
              </div>
              <code className="detail-code">
                {currentView === 'function'
                  ? selectedNode.functionCode
                  : selectedNode.organizationCode}
              </code>
            </div>

            {/* AI Summary */}
            <div className="detail-section">
              <div className="detail-label">AI Summary</div>
              {isEditing ? (
                <textarea
                  className="gum-input detail-summary-input"
                  value={editState.aiSummary}
                  onChange={handleEditChange('aiSummary')}
                  placeholder="Enter a summary..."
                  rows={4}
                />
              ) : selectedNode.aiSummary ? (
                <p className="detail-summary">{selectedNode.aiSummary}</p>
              ) : (
                <p className="detail-summary text-muted">No summary available</p>
              )}
            </div>

            {/* Key Points */}
            {selectedNode.aiKeyPoints && selectedNode.aiKeyPoints.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">Key Points</div>
                <ul className="detail-key-points">
                  {selectedNode.aiKeyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confidence */}
            {selectedNode.aiConfidence !== null && (
              <div className="detail-section">
                <div className="detail-label">AI Confidence</div>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{ width: `${selectedNode.aiConfidence * 100}%` }}
                  />
                  <span className="confidence-text">
                    {Math.round(selectedNode.aiConfidence * 100)}%
                  </span>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="detail-section">
              <div className="detail-label">Added</div>
              <span className="detail-date">{formatDate(selectedNode.createdAt)}</span>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              {isEditing ? (
                <>
                  <button
                    className="gum-button gum-button--small"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    className="gum-button gum-button--small gum-button--green"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <>
                  {selectedNode.sourceUrl && (
                    <button
                      className="gum-button gum-button--small gum-button--blue"
                      onClick={() => window.open(selectedNode.sourceUrl!, '_blank')}
                    >
                      Open Link
                    </button>
                  )}
                  <button
                    className="gum-button gum-button--small"
                    onClick={handleStartEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="gum-button gum-button--small delete-btn"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && selectedNode && (
          <div className="delete-confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
            <div className="delete-confirm-dialog gum-card" onClick={(e) => e.stopPropagation()}>
              <h3>Delete Item?</h3>
              <p>
                Are you sure you want to delete <strong>{selectedNode.title}</strong>?
                This action cannot be undone.
              </p>
              <div className="delete-confirm-actions">
                <button
                  className="gum-button gum-button--small"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  className="gum-button gum-button--small delete-confirm-btn"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .detail-panel {
          flex: 1;
          min-width: var(--panel-detail-min-width);
          display: flex;
          flex-direction: column;
        }

        .edit-indicator {
          font-size: var(--font-size-xs);
          background: var(--gum-yellow);
          padding: 2px 8px;
          border-radius: var(--border-radius);
          font-weight: var(--font-weight-normal);
        }

        .detail-loading,
        .detail-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: var(--space-md);
          text-align: center;
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .detail-header {
          display: flex;
          gap: var(--space-md);
          align-items: flex-start;
        }

        .detail-favicon {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius);
          border: 1px solid var(--gum-gray-200);
          flex-shrink: 0;
        }

        .detail-header-text {
          flex: 1;
          min-width: 0;
        }

        .detail-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-sm);
          word-wrap: break-word;
        }

        .detail-title-input {
          width: 100%;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-sm);
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .detail-label {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
          color: var(--gum-gray-600);
          letter-spacing: 0.5px;
        }

        .detail-url {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--gum-black);
          text-decoration: none;
          font-size: var(--font-size-sm);
        }

        .detail-url:hover {
          text-decoration: underline;
        }

        .external-link-icon {
          font-size: var(--font-size-xs);
          opacity: 0.5;
        }

        .detail-code {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          background: var(--gum-gray-100);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--border-radius);
          display: inline-block;
        }

        .detail-summary {
          font-size: var(--font-size-sm);
          line-height: 1.6;
          color: var(--gum-gray-800);
        }

        .detail-summary-input {
          width: 100%;
          font-size: var(--font-size-sm);
          line-height: 1.6;
          resize: vertical;
        }

        .detail-key-points {
          margin: 0;
          padding-left: var(--space-md);
          font-size: var(--font-size-sm);
        }

        .detail-key-points li {
          margin-bottom: var(--space-xs);
        }

        .confidence-bar {
          position: relative;
          height: 20px;
          background: var(--gum-gray-200);
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .confidence-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--gum-green);
          transition: width 0.3s ease;
        }

        .confidence-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          color: var(--gum-black);
        }

        .detail-date {
          font-size: var(--font-size-sm);
          color: var(--gum-gray-600);
        }

        .detail-actions {
          display: flex;
          gap: var(--space-sm);
          padding-top: var(--space-md);
          border-top: 1px solid var(--gum-gray-200);
        }

        .delete-btn {
          margin-left: auto;
          color: var(--gum-black);
        }

        .delete-btn:hover {
          background: #ff6b6b;
        }

        /* Delete Confirmation Dialog */
        .delete-confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .delete-confirm-dialog {
          width: 100%;
          max-width: 400px;
          padding: var(--space-lg);
          background: var(--gum-white);
        }

        .delete-confirm-dialog h3 {
          margin: 0 0 var(--space-md);
          font-size: var(--font-size-lg);
        }

        .delete-confirm-dialog p {
          margin: 0 0 var(--space-lg);
          font-size: var(--font-size-sm);
          color: var(--gum-gray-600);
        }

        .delete-confirm-actions {
          display: flex;
          gap: var(--space-sm);
          justify-content: flex-end;
        }

        .delete-confirm-btn {
          background: #ff6b6b;
        }

        .delete-confirm-btn:hover {
          background: #ff4444;
        }
      `}</style>
    </section>
  );
}
