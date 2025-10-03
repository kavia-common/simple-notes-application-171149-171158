import React from 'react';
import './Sidebar.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar container that provides a styled surface for navigation and lists.
 * Children are rendered inside a card-like panel.
 */
function Sidebar({ children }) {
  return (
    <div className="sidebar-root">
      <div className="sidebar-header">
        <div className="sidebar-title">All Notes</div>
      </div>
      <div className="sidebar-content">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
