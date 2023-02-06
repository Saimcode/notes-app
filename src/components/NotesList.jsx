import NewNote from "./NewNote";
import Note from "./Note";

const NotesList = ({
  notes,
  handleNewNote,
  handleDeleteNote,
  handleEditNote,
  setShowErrorMsg,
  setEditNoteID,
  newNoteId,
  darkMode,
  editedNoteAnimation,
  noteRef,
  setErrorCloseAnimation,
  handleSortNotes
}) => {
  //console.log("notelist: ", newNoteId)
  return (
    <div className="notes-list">
      <NewNote
        handleNewNote={handleNewNote}
        setShowErrorMsg={setShowErrorMsg}
        setErrorCloseAnimation={setErrorCloseAnimation}
      />
      
      {notes.map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                newNoteId={newNoteId}
                noteText={note.noteText}
                noteDate={note.noteDate}
                noteTime={note.noteTime}
                editText={note.editText}
                noteRef={noteRef}
                handleDeleteNote={handleDeleteNote}
                handleEditNote={handleEditNote}
                setEditNoteID={setEditNoteID}
                darkMode={darkMode}
                editedNoteAnimation={editedNoteAnimation}
              />
            );
          })
      }
    </div>
  )
};
export default NotesList;