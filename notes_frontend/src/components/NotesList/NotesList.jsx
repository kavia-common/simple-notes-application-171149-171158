import React from 'react';
import './NotesList.css';

/**
 * PUBLIC_INTERFACE
 * NotesList displays a selectable list of notes.
 * Props:
 * - notes: Array<{ id, title, content, updatedAt, color }>
 * - selectedId: string | null
 * - onSelect: (id: string) => void
 * - onDelete: (id: string) => void
 */
function NotesList({ notes, selectedId, onSelect, onDelete }) {
  return (
    <ul className="notes-list" role="list">
      {notes.map((n) => {
        const selected = n.id === selectedId;
        return (
          <li
            key={n.id}
            className={`notes-item ${selected ? 'selected' : ''}`}
            onClick={() => onSelect?.(n.id)}
          >
            <span className={`color-dot color-${n.color || 'default'}`} aria-hidden="true" />
            <div className="note-meta">
              <div className="note-title">{n.title || 'Untitled'}</div>
              <div className="note-sub">
                <span className="note-updated">{formatDate(n.updatedAt)}</span>
              </div>
            </div>
            <button
              className="note-delete"
              aria-label={`Delete ${n.title || 'note'}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(n.id);
              }}
              title="Delete note"
            >
              ✕
            </button>
          </li>
        );
      })}
      {notes.length === 0 && (
        <li className="notes-empty">No notes found</li>
      )}
    </ul>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default NotesList;
