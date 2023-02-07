import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  nanoid
} from 'nanoid';
import './css/App.css';
import NotesList from './components/NotesList';
import Header from './components/Header';
import ErrorMsg from './components/ErrorMsg';
import EditNote from './components/EditNote';

function App() {
  // Local Storage states
  const [savedNotes] = useState(localStorage.getItem("user-saved-notes"))
  const [savedTheme] = useState(localStorage.getItem("user-saved-theme") === "true" ? true : false)

  // useRefs
  const textEditor = useRef(null);
  const noteRef = useRef(null);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorCloseAnimation, setErrorCloseAnimation] = useState(false)

  const [newNoteId, setNewNoteId] = useState("");
  const [editNoteID, setEditNoteID] = useState("");
  const [editMode, setEditMode] = useState(false)
  const [editedNoteAnimation, setEditedNoteAnimation] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
    
  const exampleNote = [
    {
      id: nanoid(),
      noteText: "This is an example note. This app allows you to add and delete your notes. You can add as many notes as want but there's a <strong>250 character limit</strong> on each note.",
      noteDate: new Date(),
      noteTime: (new Date().getHours() < 10 ? "0" : "") + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes(),
    },
  ]
  const [notes, setNotes] = useState([]);

  // Saving Notes to local storage.
  useEffect(() => {
    localStorage.setItem("user-saved-notes",
      JSON.stringify(notes)
    )
  }, [notes])

  // Check localStorage availability
  useEffect(() => {
    if (typeof localStorage !== 'undefined' || localStorage !== null) {
      try {
        setNotes(savedNotes ? JSON.parse(savedNotes) : exampleNote, ...notes)
        setDarkMode(savedTheme ? savedTheme : false)

      } catch (error) {
        console.log("Error getting notes from local storage:", error);
        setNotes(exampleNote, ...notes)
        setDarkMode(false)

      }
    } else {
      console.log("Local storage is not supported by the browser");
      setNotes(exampleNote, ...notes);
      setDarkMode(false)

    }
    }, [])

  // Search for a note.
  const [searchInput, setSearchInput] = useState('');

  const filteredNotes = notes.filter((note) => {
    if (!searchInput || !searchInput.toLowerCase().trim()) {
      return true;
    } else {
      return note.noteText.toLowerCase().includes(searchInput.toLowerCase());
    }
  })

  // Sorting filters
  useEffect(() => {

    const handleSortNotes = () => {
      if (selectedOption && selectedOption !== '') {
        
        let sortedNotes = [...notes];

        switch (selectedOption.value) {

          case "alphabetically-AZ":          
            sortedNotes.sort((a, b) => {
              const htmlToString_a = a.noteText.replace(/<[^>]+>/g, "");
              const htmlToString_b = b.noteText.replace(/<[^>]+>/g, "");
              
              return a.noteText && b.noteText ? 
              htmlToString_a.localeCompare(htmlToString_b) : null
            })

            console.log("alphabetically sorted A-Z: ", notes)
            break;

          case "alphabetically-ZA":
            sortedNotes.sort((a, b) => {
              const htmlToString_a = a.noteText.replace(/<[^>]+>/g, "");
              const htmlToString_b = b.noteText.replace(/<[^>]+>/g, "");
              
              return a.noteText && b.noteText ? 
              htmlToString_b.localeCompare(htmlToString_a) : null
            })
            console.log("alphabetically sorted Z-A: ", notes)
            break;

          case "date-OL":          
            sortedNotes.sort((a, b) => {
              const aDate = new Date(a.noteDate);            
              const bDate = new Date(b.noteDate)
              
              return aDate - bDate;
            })
            console.log("date sorted OL: ", notes)
            break;

          case "date-LO":
            sortedNotes.sort((a, b) => {
              const aDate = new Date(a.noteDate);
              const bDate = new Date(b.noteDate)
              
              return bDate - aDate;
            })
            console.log("date sorted LO: ", notes)
            break;

          default:
            setNotes([...notes])
            break;
        }

        setNotes(sortedNotes);
      }
    };
    handleSortNotes()
  }, [selectedOption, notes.length]);

  // Handling dark mode.
  const [darkMode, setDarkMode] = useState(false);

  // Saving user's theme settings every time its changed
  useEffect(() => {
    localStorage.setItem("user-saved-theme", darkMode.toString())

    darkMode ? document.documentElement.classList.add("dark") :
      document.documentElement.classList.remove("dark")
  }, [darkMode])

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)

    // Add dark mode classes
    darkMode ? document.documentElement.classList.add("dark") :
      document.documentElement.classList.remove("dark")
  }

  console.log("selectedOption: ", selectedOption)

  // Adding a new note.
  const addNewNote = (userText) => {
    const userDate = new Date();
    const userTime = (userDate.getHours() < 10 ? "0" : "") + userDate.getHours() + ":" + (userDate.getMinutes() < 10 ? "0" : "") + userDate.getMinutes();
    const newNote = {
      id: nanoid(),
      noteText: userText,
      noteDate: userDate,
      noteTime: userTime
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)

    setNewNoteId(newNote.id)
  }

  // Deleting a note.
  const deleteNote = (userNoteID) => {
    const deletedNotes = notes.filter(note => note.id !== userNoteID)

    // Wait for the animation to finish
    setTimeout(() => {
      setNotes(deletedNotes)
    }, 500);

  }

  // Editing a note
  const handleEditNote = (userNoteID) => {
    setEditNoteID(userNoteID)
    setEditMode(true)
  }

  return (
    <div className={"container"}>

      {/* Edit note popup */}
      { editMode && <EditNote 
      editNoteID={editNoteID} 
      setEditNoteID={setEditNoteID}
      setShowErrorMsg={setShowErrorMsg} 
      showErrorMsg={showErrorMsg}
      textEditor={textEditor}
      notes={notes}
      setNotes={setNotes}
      handleEditNote={handleEditNote}
      setEditMode={setEditMode}
      editMode={editMode}
      setEditedNoteAnimation={setEditedNoteAnimation}
      noteRef={noteRef}
      />
      }

      {/* Error msg popup */}
      { showErrorMsg && <ErrorMsg setShowErrorMsg={setShowErrorMsg} showErrorMsg={showErrorMsg} textEditor={textEditor} setErrorCloseAnimation={setErrorCloseAnimation} errorCloseAnimation={errorCloseAnimation} /> }
      
      <Header 
      notes={notes} 
      setNotes={setNotes} 
      currentMode={darkMode} 
      handleThemeToggle={handleThemeToggle} 
      handleSearchInput={setSearchInput} 
      setSelectedOption={setSelectedOption} 
      selectedOption={selectedOption} 
      />
      
      <NotesList notes=
      {selectedOption === undefined ? filteredNotes.sort((a, b) => {
        const aDate = new Date(a.noteDate);
        const bDate = new Date(b.noteDate)
        console.log("run")
        return bDate - aDate;
      }) : filteredNotes}
      setNotes={setNotes}
      handleNewNote={addNewNote} 
      handleDeleteNote={deleteNote} 
      setEditNoteID={setEditNoteID} 
      setShowErrorMsg={setShowErrorMsg}    
      handleEditNote={handleEditNote}
      newNoteId={newNoteId}
      darkMode={darkMode}
      editedNoteAnimation={editedNoteAnimation}
      setErrorCloseAnimation={setErrorCloseAnimation}
      />
    </div>
  );
}

export default App;