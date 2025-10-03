import React from 'react';
import './NoteEditor.css';

/**
 * PUBLIC_INTERFACE
 * NoteEditor displays and edits the selected note.
 * Props:
 * - note: { id, title, content, color } | null
 * - onChangeTitle: (value: string) => void
 * - onChangeContent: (value: string) => void
 * - onChangeColor: (value: string) => void
 */
function NoteEditor({ note, onChangeTitle, onChangeContent, onChangeColor }) {
  if (!note) {
    return (
      <div className="note-editor empty">
        <div className="empty-state">
          <div className="empty-title">Select or create a note</div>
          <div className="empty-sub">Use the + New button to start a fresh note.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <div className="editor-header">
        <input
          className="title-input"
          value={note.title || ''}
          onChange={(e) => onChangeTitle?.(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <div className="color-palette" role="group" aria-label="Note color">
          {COLOR_CHOICES.map(c => (
            <button
              key={c.value}
              className={`color-chip color-${c.value} ${note.color === c.value ? 'active' : ''}`}
              title={c.label}
              aria-label={c.label}
              onClick={() => onChangeColor?.(c.value)}
            />
          ))}
        </div>
      </div>
      <textarea
        className="content-textarea"
        value={note.content || ''}
        onChange={(e) => onChangeContent?.(e.target.value)}
        placeholder="Start typing your note..."
        aria-label="Note content"
      />
    </div>
  );
}

const COLOR_CHOICES = [
  { value: 'default', label: 'Default' },
  { value: 'pink', label: 'Pink' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'purple', label: 'Purple' },
];

export default NoteEditor;
