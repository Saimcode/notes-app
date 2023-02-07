import { useState, useEffect, useRef } from "react";
import { BsCheckLg } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditNote({
  editNoteID,
  setEditNoteID,
  setShowErrorMsg,
  showErrorMsg,
  textEditor,
  notes,
  setNotes,
  setEditMode,
  editMode,
  setEditedNoteAnimation,
  noteRef,
}) {
  const [noteUserText, setNoteUserText] = useState("");
  const htmlToString = noteUserText.replace(/<[^>]+>/g, "");
  const characterLimit = 250 - noteUserText.replace(/<[^>]+>/g, "").length;
  const [editAnimation, setEditAnimation] = useState(false);
  const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
  const editNote = useRef(null);
  const [isEditTextAdded, setIsEditTextAdded] = useState(false);

  //console.log("editMode:", editMode);

  // ReactQuill Modules & character limit function
  Quill.register("modules/maxlength", function (quill, options) {
    quill.on("text-change", function (e) {
      let size = quill.getText();
      if (size.length > options.value) quill.history.undo();
    });
  });

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"]],
    maxlength: { value: 251 },
    history: { delay: 100, userOnly: true },
  };

  const handleValueChange = (event) => {
    setNoteUserText(event);
  };

  const handleSaveClick = () => {
    if (htmlToString.trim().length > 0) {
      // Updated the Edited Note
      const updatedNotes = notes.map((note) => {
        if (note.id === editNoteID) {
          setEditedNoteAnimation(true);

          if (!isEditTextAdded && note.noteText !== noteUserText) {
            var editText = "(Edited)";
            setIsEditTextAdded(true);
          } else {
            var editText = note.editText || "";
          }

          const userDate = new Date();
          const userTime =
            (userDate.getHours() < 10 ? "0" : "") +
            userDate.getHours() +
            ":" +
            (userDate.getMinutes() < 10 ? "0" : "") +
            userDate.getMinutes();
          const editedNote = {
            id: note.id,
            noteText: noteUserText,
            noteDate: userDate,

            editText: editText,
            noteTime: userTime,
          };
          return { ...note, ...editedNote };
        }
        return note;
      });
      setNotes(updatedNotes);
      setNoteUserText("");
      setEditNoteID("");
      setShowErrorMsg(false);

      // Edit mode animation
      setEditAnimation(true);
      setTimeout(() => {
        setEditMode(false);
        setEditAnimation(false);
      }, 800);

      // Edited note animation
      const editedNoteEl = document.querySelector(`[id='${editNoteID}']`);
      notes.map((note) => {
        if (note.id === editNoteID) {
          console.log(note.id, editNoteID);
          setTimeout(() => {
            editedNoteEl.classList.add("animated__green-fade");

            setTimeout(() => {
              setEditedNoteAnimation(false);
              editedNoteEl.classList.remove("animated__green-fade");
            }, 1000);
          }, 200);
        }
      });
    } else {
      setNoteUserText("");
      // Error message
      setShowErrorMsg(true);

      console.log("not saving");

      setTimeout(() => {
        document.querySelector(".new").classList.remove("shake-animation");
      }, 400);
      document.querySelector(".new").classList.add("shake-animation");
    }
  };

  const handleCancelEdit = () => {
    setEditAnimation(true);
    setTimeout(() => {
      setEditAnimation(false);
      setEditMode(false);
      setEditNoteID("");
    }, 800);
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      // Check if the user is not on mobile or tablet
      if (!isMobile) {
        event.preventDefault();
        // Check if the shift key is not pressed with the Enter key
        if (!event.shiftKey) {
          handleSaveClick();
        }
      }
    }
  };

  useEffect(() => {
    // Handling note appearing animation
    editNote.current.classList.add("animate__fadeInDownBig");
    setTimeout(() => {
      editNote.current.classList.remove("animate__fadeInDownBig");
    }, 1000);

    // Adding the relevant text to the text editor
    notes.map((note) => {
      if (note.id === editNoteID) {
        //console.log("useEffect Notes: ", note)
        return setNoteUserText(note.noteText);
      }
    });

    setTimeout(() => {
      // Focusing at the end of the text inside the textEditor
      textEditor.current.focus();
    }, 500);
  }, []);

  return (
    <div
      className={`edit-note-container animate__animated animate__fadeIn 
    ${editAnimation ? "animate__fadeOut" : ""}`}
    >
      <h2>Editing Note...</h2>

      <div
        ref={editNote}
        className={`note new edit-note animate__animated  
        ${editAnimation ? "animate__fadeOutDownBig" : " "}`}
      >
        <ReactQuill
          ref={textEditor}
          placeholder="Type here to add a note..."
          theme="snow"
          value={noteUserText}
          onChange={handleValueChange}
          modules={modules}
          // Save new note when Enter key is pressed
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
        />
        <div className="note-footer">
          <p
            className={`${characterLimit <= 0 && "error"}` + " character-count"}
          >
            {characterLimit} Remaining
          </p>
          <div className="buttons">
            <button className="add-btn" onClick={() => handleSaveClick()}>
              <BsCheckLg className="check-icon" />
            </button>
            <button className="delete-btn">
              <TiDelete
                className="delete-icon"
                onClick={() => {
                  handleCancelEdit();
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
