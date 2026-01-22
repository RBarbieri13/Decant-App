// ============================================================
// Decant App Root Component
// ============================================================

import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

/**
 * Main App Component
 * Provides global context and renders the main shell
 */
function App(): React.ReactElement {
  // Load saved theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await window.decantAPI.settings.get('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } catch (err) {
        console.error('Failed to load theme:', err);
      }
    };
    loadTheme();
  }, []);

  // Register global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+N or Ctrl+N: Open import dialog
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('decant:open-import'));
      }

      // Cmd+F or Ctrl+F: Focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Cmd+1: Switch to Function view
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('decant:set-view', { detail: 'function' }));
      }

      // Cmd+2: Switch to Organization view
      if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('decant:set-view', { detail: 'organization' }));
      }

      // Escape: Close dialogs or clear selection
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('decant:escape'));
      }

      // Cmd+R or Ctrl+R: Refresh tree
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('decant:refresh'));
      }

      // Cmd+, or Ctrl+,: Open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('decant:open-settings'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
