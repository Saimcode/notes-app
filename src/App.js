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

  const exampleNote = [{
    id: nanoid(),
    noteText: "This is an example note. This app allows you to add and delete your notes. You can add as many notes as want but there's a <strong>250 character limit</strong> on each note.",
    noteDate: new Date().toLocaleDateString("en-GB", {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }),
    noteTime: (new Date().getHours() < 10 ? "0" : "") + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes(),
  }]
  const [notes, setNotes] = useState([]);
  // const [sortNotes, setSortNotes] = useState(notes);

  // Saving Notes to local storage.
  useEffect(() => {
    localStorage.setItem("user-saved-notes",
      JSON.stringify(notes)
    )
  }, [setNotes])

  // Sorting filters
  const handleSortNotes = () => {
    if (selectedOption && selectedOption !== '') {
      let sortedNotes = [...notes];
      switch (selectedOption.value) {

        case "alphabetically-AZ":
          sortedNotes.sort((a, b) => a.noteText && b.noteText ? 
          a.noteText.localeCompare(b.noteText) : null);
          console.log("alphabetically sorted A-Z: ", sortedNotes)
          setNotes(sortedNotes)
          break;

        case "alphabetically-ZA":
          sortedNotes.sort((a, b) => b.noteText && a.noteText ? 
          b.noteText.localeCompare(a.noteText) : null);
          console.log("alphabetically sorted Z-A: ", sortedNotes)
          setNotes(sortedNotes)
          break;

        case "date-OL":
          sortedNotes.sort((a, b) => {
            const aDate = a.noteDate
            console.log("aDate", aDate, a.noteDate)
            aDate.setTime(a.noteTime);
            console.log(a.noteTime)
            
            const bDate = b.noteDate
            bDate.setTime(b.noteTime);
            
            return bDate - aDate;
          });
          console.log("date sorted OL: ", sortedNotes)
          setNotes(sortedNotes)
          break;

        case "date-LO":
          sortedNotes.sort((a, b) => {
            let dateResult = a.noteDate.localeCompare(b.noteDate);
            console.log("date-LO data-result:",dateResult)
            return dateResult === 0 ? a.noteTime.localeCompare(b.noteTime) : dateResult;
          });
          console.log("date sorted LO: ", sortedNotes)
          setNotes(sortedNotes)
          break;

        default:
          setNotes([...notes]);
          break;
      }
    }
  };

  useEffect(() => {
    handleSortNotes();
  }, [selectedOption]);



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

  console.log("updated notes: ", notes)

  // Handling dark mode.
  const [darkMode, setDarkMode] = useState(false);

  // Saving user's theme settings everytime its changed
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

  // Search for a note.
  const [searchInput, setSearchInput] = useState('');

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
      {notes.filter((note) => 
        !searchInput || !searchInput.toLowerCase().trim() &&
        note.noteText.toLowerCase().includes(searchInput.toLowerCase()) 
      )}
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