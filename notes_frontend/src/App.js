import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import './theme.css';

import TopNav from './components/TopNav/TopNav';
import Sidebar from './components/Sidebar/Sidebar';
import NotesList from './components/NotesList/NotesList';
import NoteEditor from './components/NoteEditor/NoteEditor';
import { initialNotes } from './data/mockNotes';

/**
 * Root application layout composing TopNav, Sidebar/NotesList, and NoteEditor.
 * Applies the Ocean Professional theme and coordinates mock data selection.
 */
// PUBLIC_INTERFACE
function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('light'); // for future dark mode support

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      (n.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [notes, query]);

  // PUBLIC_INTERFACE
  const handleSelectNote = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleCreateNote = () => {
    const now = new Date().toISOString();
    const newNote = {
      id: `note_${Date.now()}`,
      title: 'Untitled',
      content: '',
      color: 'default',
      updatedAt: now,
      tags: []
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setSelectedId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (selectedId === id) {
      setSelectedId(updated[0]?.id ?? null);
    }
  };

  // PUBLIC_INTERFACE
  const handleUpdateNote = (partial) => {
    if (!selectedId) return;
    setNotes(prev =>
      prev.map(n =>
        n.id === selectedId ? { ...n, ...partial, updatedAt: new Date().toISOString() } : n
      )
    );
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
    // Currently only CSS variables for light theme are defined; dark theme stubbed for future
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <TopNav
        onSearch={setQuery}
        onAdd={handleCreateNote}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="layout">
        <aside className="sidebar">
          <Sidebar>
            <NotesList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={handleSelectNote}
              onDelete={handleDeleteNote}
            />
          </Sidebar>
        </aside>
        <main className="content-area">
          <NoteEditor
            note={selectedNote}
            onChangeTitle={(title) => handleUpdateNote({ title })}
            onChangeContent={(content) => handleUpdateNote({ content })}
            onChangeColor={(color) => handleUpdateNote({ color })}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
