import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './css/App.css';
import NotesList from './components/NotesList';
import Header from './components/Header';

function App() {
  const [notes, setNotes] = useState(
    [{
      id: nanoid(),
      noteText: "This is an example note. This app allows you to add and delete your notes. You can add as many notes as want but there's a 250 character limit on each note.",
      noteDate: "01/01/23",
      noteTime: "00:00"
    }],

    () => JSON.parse(localStorage.getItem("user-saved-notes")),

  );
    
  // Saving Notes to local storage.
  useEffect(() => {
    localStorage.setItem("user-saved-notes", 
      JSON.stringify(notes)
    )
  }, [notes])
  
  useEffect(() => {
    if (!notes.length) {
      const exampleNote = {
        id: nanoid(),
        noteText: "This is an example note. This app allows you to add and delete your notes. You can add as many notes as want but there's a 250 character limit on each note.",
        noteDate: "01/01/23",
        noteTime: "00:00"
      }
      const updatedNotes = [exampleNote, ...notes]
      setNotes(updatedNotes)

    }
    }, [])

  // Handling dark mode.
  const [darkMode, setDarkMode] = useState(true);

  
  const addDarkClass = () => {
    setDarkMode(!darkMode)

    console.log(darkMode)
    
    darkMode ? document.documentElement.classList.add("dark") : 
    document.documentElement.classList.remove("dark")
  }

  // Search for a note.
  const [searchInput, setSearchInput] = useState('');

  // Adding a new note.
  const addNewNote = (userText) => {
    const userDate = new Date();
    const userTime = userDate.getHours() + ":" + (userDate.getMinutes() < 10 ? '0' : '') + userDate.getMinutes()
    const newNote = {
      id: nanoid(),
      noteText: userText,
      noteDate: userDate.toLocaleDateString(),
      noteTime: userTime
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
  }

  // Deleting a note.
  const deleteNote = (userNoteID) => {
    const deletedNotes = notes.filter(note => note.id !== userNoteID)
    setNotes(deletedNotes)
    console.log(deletedNotes)
  }

  return (
    <div className={"container"}>
      <Header currentMode={darkMode} handleThemeToggle={addDarkClass} handleSearchInput={setSearchInput} />
      <NotesList notesList=
      {notes.filter((note) => 
        note.noteText.includes(searchInput) 
      )} 
      handleNewNote={addNewNote} handleDeleteNote={deleteNote} />
    </div>
  );
}

export default App;