// ============================================================
// Import Dialog - URL Input Modal
// ============================================================

import React, { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';

interface ImportState {
  url: string;
  status: 'idle' | 'importing' | 'success' | 'error';
  progress: string;
  error: string | null;
}

export function ImportDialog(): React.ReactElement | null {
  const { state, actions } = useApp();
  const { importDialogOpen } = state;

  const [importState, setImportState] = useState<ImportState>({
    url: '',
    status: 'idle',
    progress: '',
    error: null,
  });

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setImportState((prev) => ({
      ...prev,
      url: e.target.value,
      error: null,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const url = importState.url.trim();
      if (!url) {
        setImportState((prev) => ({ ...prev, error: 'Please enter a URL' }));
        return;
      }

      // Basic URL validation
      try {
        new URL(url);
      } catch {
        setImportState((prev) => ({ ...prev, error: 'Please enter a valid URL' }));
        return;
      }

      setImportState((prev) => ({
        ...prev,
        status: 'importing',
        progress: 'Fetching page...',
        error: null,
      }));

      try {
        await actions.importUrl(url);
        setImportState({
          url: '',
          status: 'success',
          progress: 'Import complete!',
          error: null,
        });

        // Reset after brief success message
        setTimeout(() => {
          setImportState({
            url: '',
            status: 'idle',
            progress: '',
            error: null,
          });
        }, 1500);
      } catch (err) {
        setImportState((prev) => ({
          ...prev,
          status: 'error',
          progress: '',
          error: err instanceof Error ? err.message : 'Import failed',
        }));
      }
    },
    [importState.url, actions]
  );

  const handleClose = useCallback(() => {
    if (importState.status !== 'importing') {
      setImportState({
        url: '',
        status: 'idle',
        progress: '',
        error: null,
      });
      actions.closeImportDialog();
    }
  }, [importState.status, actions]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!importDialogOpen) {
    return null;
  }

  const isImporting = importState.status === 'importing';

  return (
    <div className="import-dialog-overlay" onClick={handleClose} onKeyDown={handleKeyDown}>
      <div
        className="import-dialog gum-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-dialog-title"
      >
        <div className="import-dialog-header">
          <h2 id="import-dialog-title">Import URL</h2>
          <button
            className="import-dialog-close"
            onClick={handleClose}
            disabled={isImporting}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="import-dialog-form">
          <div className="import-dialog-field">
            <label htmlFor="import-url" className="import-dialog-label">
              Paste a URL to import
            </label>
            <input
              id="import-url"
              type="url"
              className="gum-input import-dialog-input"
              placeholder="https://example.com/article"
              value={importState.url}
              onChange={handleUrlChange}
              disabled={isImporting}
              autoFocus
            />
          </div>

          {importState.error && (
            <div className="import-dialog-error">
              <span className="error-icon">⚠️</span>
              <span>{importState.error}</span>
            </div>
          )}

          {importState.progress && (
            <div
              className={`import-dialog-progress ${
                importState.status === 'success' ? 'success' : ''
              }`}
            >
              {importState.status === 'importing' && (
                <span className="progress-spinner">⏳</span>
              )}
              {importState.status === 'success' && <span className="progress-icon">✅</span>}
              <span>{importState.progress}</span>
            </div>
          )}

          <div className="import-dialog-actions">
            <button
              type="button"
              className="gum-button"
              onClick={handleClose}
              disabled={isImporting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gum-button gum-button--pink"
              disabled={isImporting || !importState.url.trim()}
            >
              {isImporting ? 'Importing...' : 'Import'}
            </button>
          </div>
        </form>

        <div className="import-dialog-hint">
          <p className="text-muted text-small">
            AI will automatically classify and organize the content.
          </p>
        </div>
      </div>

      <style>{`
        .import-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .import-dialog {
          width: 100%;
          max-width: 500px;
          background: var(--gum-white);
          padding: var(--space-lg);
        }

        .import-dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-lg);
        }

        .import-dialog-header h2 {
          margin: 0;
          font-size: var(--font-size-lg);
        }

        .import-dialog-close {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          border-radius: var(--border-radius);
          transition: background var(--transition-fast);
        }

        .import-dialog-close:hover:not(:disabled) {
          background: var(--gum-gray-100);
        }

        .import-dialog-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .import-dialog-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .import-dialog-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .import-dialog-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .import-dialog-input {
          width: 100%;
          font-size: var(--font-size-base);
        }

        .import-dialog-error {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: #fff0f0;
          border: 1px solid #ffcccc;
          border-radius: var(--border-radius);
          color: #cc0000;
          font-size: var(--font-size-sm);
        }

        .import-dialog-progress {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--gum-gray-100);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
        }

        .import-dialog-progress.success {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .progress-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .import-dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-sm);
          margin-top: var(--space-sm);
        }

        .import-dialog-hint {
          margin-top: var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid var(--gum-gray-200);
        }

        .import-dialog-hint p {
          margin: 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
