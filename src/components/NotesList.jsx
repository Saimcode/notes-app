import NewNote from './NewNote';
import Note from './Note';

const NotesList = ({ notesList, handleNewNote, handleDeleteNote }) => {
    return (
        <div className="notes-list">
            <NewNote handleNewNote={handleNewNote} />
            {notesList.map((note) => {
                return (
                <Note 
                    key={Math.random()}
                    id={note.id} 
                    noteText={note.noteText} 
                    noteDate={note.noteDate}
                    noteTime={note.noteTime}
                    handleDeleteNote={handleDeleteNote} 
                 />
                 )
            })}
        </div>
    ) 
}
export default NotesList;