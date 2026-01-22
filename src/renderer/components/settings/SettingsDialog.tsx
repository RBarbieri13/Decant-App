// ============================================================
// Settings Dialog - Application settings and configuration
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps): React.ReactElement | null {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [dataMessage, setDataMessage] = useState<string | null>(null);

  // Load settings on open
  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      // Load API key status
      const existingKey = await window.decantAPI.settings.getApiKey();
      setHasApiKey(!!existingKey);
      setApiKey(''); // Don't show existing key for security

      // Load theme preference
      const savedTheme = await window.decantAPI.settings.get('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const handleSaveApiKey = useCallback(async () => {
    if (!apiKey.trim()) return;

    setIsSaving(true);
    setSaveMessage(null);
    try {
      await window.decantAPI.settings.setApiKey(apiKey.trim());
      setHasApiKey(true);
      setApiKey('');
      setSaveMessage('API key saved successfully');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save API key:', err);
      setSaveMessage('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  }, [apiKey]);

  const handleClearApiKey = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await window.decantAPI.settings.setApiKey('');
      setHasApiKey(false);
      setSaveMessage('API key cleared');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error('Failed to clear API key:', err);
      setSaveMessage('Failed to clear API key');
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handleThemeChange = useCallback(async (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      await window.decantAPI.settings.set('theme', newTheme);
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (err) {
      console.error('Failed to save theme:', err);
    }
  }, []);

  const handleExportData = useCallback(async () => {
    setIsExporting(true);
    setDataMessage(null);
    try {
      const result = await window.decantAPI.data.export();
      if (result.success && result.data) {
        // Create a download link
        const blob = new Blob([result.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `decant-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDataMessage('Data exported successfully');
      } else {
        setDataMessage(result.error || 'Export failed');
      }
    } catch (err) {
      console.error('Export failed:', err);
      setDataMessage('Export failed');
    } finally {
      setIsExporting(false);
      setTimeout(() => setDataMessage(null), 3000);
    }
  }, []);

  const handleImportData = useCallback(async () => {
    // Create file input to select JSON file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsImporting(true);
      setDataMessage(null);
      try {
        const jsonData = await file.text();
        const result = await window.decantAPI.data.import(jsonData);
        if (result.success) {
          setDataMessage(`Imported ${result.nodesImported} nodes successfully`);
          // Trigger a refresh event so the tree updates
          window.dispatchEvent(new CustomEvent('decant:refresh'));
        } else {
          setDataMessage(result.error || 'Import failed');
        }
      } catch (err) {
        console.error('Import failed:', err);
        setDataMessage('Import failed: Invalid file format');
      } finally {
        setIsImporting(false);
        setTimeout(() => setDataMessage(null), 5000);
      }
    };
    input.click();
  }, []);

  const handleClose = useCallback(() => {
    setApiKey('');
    setShowApiKey(false);
    setSaveMessage(null);
    onClose();
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={handleClose}>
      <div className="settings-dialog gum-card" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="settings-content">
          {/* API Key Section */}
          <div className="settings-section">
            <h3>OpenAI API Key</h3>
            <p className="settings-description">
              Required for AI-powered content classification and summarization.
            </p>

            {hasApiKey ? (
              <div className="api-key-status">
                <span className="api-key-indicator api-key-set">
                  API key is configured
                </span>
                <button
                  className="gum-button gum-button--small"
                  onClick={handleClearApiKey}
                  disabled={isSaving}
                >
                  Clear Key
                </button>
              </div>
            ) : (
              <div className="api-key-status">
                <span className="api-key-indicator api-key-missing">
                  No API key configured
                </span>
              </div>
            )}

            <div className="api-key-input-group">
              <div className="api-key-input-wrapper">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  className="gum-input api-key-input"
                  placeholder={hasApiKey ? 'Enter new API key to replace' : 'sk-...'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  className="api-key-toggle"
                  onClick={() => setShowApiKey(!showApiKey)}
                  type="button"
                  title={showApiKey ? 'Hide' : 'Show'}
                >
                  {showApiKey ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <button
                className="gum-button gum-button--small gum-button--green"
                onClick={handleSaveApiKey}
                disabled={!apiKey.trim() || isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>

            {saveMessage && (
              <div className={`settings-message ${saveMessage.includes('success') || saveMessage === 'API key cleared' ? 'success' : 'error'}`}>
                {saveMessage}
              </div>
            )}

            <p className="settings-hint">
              Get your API key from{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://platform.openai.com/api-keys', '_blank');
                }}
              >
                OpenAI Dashboard
              </a>
            </p>
          </div>

          {/* Theme Section */}
          <div className="settings-section">
            <h3>Appearance</h3>
            <p className="settings-description">
              Choose your preferred color theme.
            </p>

            <div className="theme-options">
              <button
                className={`theme-option gum-button ${theme === 'light' ? 'gum-button--yellow' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                ☀️ Light
              </button>
              <button
                className={`theme-option gum-button ${theme === 'dark' ? 'gum-button--blue' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          {/* Data Export/Import Section */}
          <div className="settings-section">
            <h3>Data Management</h3>
            <p className="settings-description">
              Export your knowledge base to a JSON file or import from a previous export.
            </p>

            <div className="data-actions">
              <button
                className="gum-button gum-button--blue"
                onClick={handleExportData}
                disabled={isExporting || isImporting}
              >
                {isExporting ? 'Exporting...' : '📦 Export Data'}
              </button>
              <button
                className="gum-button gum-button--pink"
                onClick={handleImportData}
                disabled={isExporting || isImporting}
              >
                {isImporting ? 'Importing...' : '📥 Import Data'}
              </button>
            </div>

            {dataMessage && (
              <div className={`settings-message ${dataMessage.includes('successfully') ? 'success' : 'error'}`}>
                {dataMessage}
              </div>
            )}

            <p className="settings-hint">
              Note: Import will add new items without overwriting existing data.
            </p>
          </div>

          {/* About Section */}
          <div className="settings-section">
            <h3>About</h3>
            <div className="about-info">
              <p><strong>Decant</strong> v1.0.0</p>
              <p className="text-muted">AI-Powered Knowledge Base</p>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="gum-button gum-button--small" onClick={handleClose}>
            Close
          </button>
        </div>

        <style>{`
          .settings-overlay {
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

          .settings-dialog {
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            background: var(--gum-white);
          }

          .settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-md) var(--space-lg);
            border-bottom: var(--border-width) solid var(--gum-black);
          }

          .settings-header h2 {
            margin: 0;
            font-size: var(--font-size-lg);
          }

          .settings-close-btn {
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
          }

          .settings-close-btn:hover {
            background: var(--gum-gray-100);
          }

          .settings-content {
            flex: 1;
            overflow-y: auto;
            padding: var(--space-lg);
          }

          .settings-section {
            margin-bottom: var(--space-xl);
          }

          .settings-section:last-child {
            margin-bottom: 0;
          }

          .settings-section h3 {
            margin: 0 0 var(--space-sm);
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-bold);
          }

          .settings-description {
            margin: 0 0 var(--space-md);
            font-size: var(--font-size-sm);
            color: var(--gum-gray-600);
          }

          .api-key-status {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
          }

          .api-key-indicator {
            font-size: var(--font-size-sm);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--border-radius);
            font-weight: var(--font-weight-medium);
          }

          .api-key-set {
            background: var(--gum-green);
            color: var(--gum-black);
          }

          .api-key-missing {
            background: var(--gum-gray-200);
            color: var(--gum-gray-600);
          }

          .api-key-input-group {
            display: flex;
            gap: var(--space-sm);
            margin-bottom: var(--space-sm);
          }

          .api-key-input-wrapper {
            flex: 1;
            position: relative;
          }

          .api-key-input {
            width: 100%;
            padding-right: 40px;
            font-family: var(--font-mono);
          }

          .api-key-toggle {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            font-size: 14px;
          }

          .settings-message {
            padding: var(--space-sm);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
            margin-bottom: var(--space-sm);
          }

          .settings-message.success {
            background: var(--gum-green);
            color: var(--gum-black);
          }

          .settings-message.error {
            background: #ff6b6b;
            color: var(--gum-white);
          }

          .settings-hint {
            margin: 0;
            font-size: var(--font-size-xs);
            color: var(--gum-gray-600);
          }

          .settings-hint a {
            color: var(--gum-black);
            text-decoration: underline;
          }

          .theme-options {
            display: flex;
            gap: var(--space-sm);
          }

          .theme-option {
            flex: 1;
          }

          .data-actions {
            display: flex;
            gap: var(--space-sm);
            margin-bottom: var(--space-md);
          }

          .data-actions button {
            flex: 1;
          }

          .about-info {
            background: var(--gum-gray-100);
            padding: var(--space-md);
            border-radius: var(--border-radius);
          }

          .about-info p {
            margin: 0;
          }

          .about-info p + p {
            margin-top: var(--space-xs);
          }

          .settings-footer {
            display: flex;
            justify-content: flex-end;
            padding: var(--space-md) var(--space-lg);
            border-top: var(--border-width) solid var(--gum-gray-200);
          }
        `}</style>
      </div>
    </div>
  );
}
