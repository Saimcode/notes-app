import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import DOMPurify from "dompurify";

function Note({
  id,
  noteText,
  noteDate,
  noteTime,
  editText,
  noteRef,
  handleDeleteNote,
  handleEditNote,
  newNoteId,
  editedNoteAnimation,
}) {
  //console.log(id, noteDate, noteTime, noteText)
  const sanitizedText = DOMPurify.sanitize(noteText);

  const [noteFadeIn, setNoteFadeIn] = useState(false);
  const [noteFadeOut, setNoteFadeOut] = useState(false);

  // Formatting noteDate
  const formattedDate = new Date(noteDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

  useEffect(() => {
    if (id === newNoteId) {
      setNoteFadeIn(true);
      setTimeout(() => {
        setNoteFadeIn(false)
      }, 1100);
    }
  }, [newNoteId, id]);

  const handleDeleteBtn = (deleteId) => {
    handleDeleteNote(deleteId);

      setNoteFadeOut(true);
      setTimeout(() => {
        setNoteFadeOut(false)
      }, 500);
  }
  //console.log(editedNoteAnimation)

  return (
    <div className={`note animate__animated 
    ${noteFadeOut ? "animate__customBounceOut" : ""} 
    ${noteFadeIn ? "animated__green-fade" : ""}
    `} ref={noteRef} id={id} >
      <span dangerouslySetInnerHTML={{ __html: sanitizedText }}></span>

      <div className="note-footer">
        <div className="date">
          <AiOutlineClockCircle className="date-icon" />
          <p>
            {noteTime} - {formattedDate} 
            <em> {editText}</em>
          </p>
        </div>
        <div className="buttons">
          <button className="edit-btn" onClick={() => handleEditNote(id)}>
            <MdEdit className="edit-icon"  />
          </button>
          <button className={`delete-btn`} 
          onClick={() => handleDeleteBtn(id)}>
            <TiDelete
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;
