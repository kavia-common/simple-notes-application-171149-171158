import React, { useState } from 'react';
import './TopNav.css';

/**
 * PUBLIC_INTERFACE
 * Top navigation with app title, search, add note, and theme toggle.
 * Props:
 * - onSearch: (query: string) => void
 * - onAdd: () => void
 * - onToggleTheme: () => void
 * - theme: 'light' | 'dark'
 */
function TopNav({ onSearch, onAdd, onToggleTheme, theme }) {
  const [localQuery, setLocalQuery] = useState('');

  const onInput = (e) => {
    const q = e.target.value;
    setLocalQuery(q);
    onSearch?.(q);
  };

  return (
    <header className="topnav">
      <div className="topnav-left">
        <div className="brand">
          <span className="brand-dot" />
          <span className="brand-title">Notes</span>
        </div>
      </div>
      <div className="topnav-center">
        <div className="search">
          <input
            type="text"
            value={localQuery}
            onChange={onInput}
            className="search-input"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
      </div>
      <div className="topnav-right">
        <button className="btn btn-secondary" onClick={onAdd} aria-label="Add note">
          + New
        </button>
        <button className="btn btn-ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default TopNav;
