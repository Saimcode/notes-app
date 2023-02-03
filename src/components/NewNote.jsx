import { useState, useEffect, useRef } from "react";
import { BsCheckLg } from "react-icons/bs";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewNote = ({ handleNewNote, setShowErrorMsg, setErrorCloseAnimation }) => {
  const [noteUserText, setNoteUserText] = useState("");
  const htmlToString = noteUserText.replace(/<[^>]+>/g, "");
  const characterLimit = 250 - noteUserText.replace(/<[^>]+>/g, "").length;
  const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
  
  const textEditor = useRef(null);
  const saveBtn = useRef()
 
  // ReactQuill Modules & character limit function
  Quill.register("modules/maxlength", function (quill, options) {
    quill.on("text-change", function (e) {
      let size = quill.getText();
      if (size.length > options.value) quill.history.undo();
    });
  });

  const modules = {
		toolbar: [["bold", "italic", "underline", "strike"]],
		maxlength : {value : 251},
		history: { delay: 100, userOnly: true }  
  };

  const handleValueChange = (event) => {
      setNoteUserText(event);
  };

  const handleSaveClick = () => {
    if (htmlToString.trim().length > 0) {
      handleNewNote(noteUserText);
      setNoteUserText("");
      // Error message and animation
      setErrorCloseAnimation(true)

      setTimeout(() => {
          setErrorCloseAnimation(false)
          setShowErrorMsg(false)
      }, 500);


      console.log("saving");
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
  }

  // Focus inside the textbox when refreshed
  useEffect(() => {
    textEditor.current.focus();
  }, []);

  return (
    <div className="note new">
      <ReactQuill
        ref={textEditor}
        tabIndex={1}
        placeholder="Type here to add a note..."
        theme="snow"
        value={noteUserText}
        onChange={handleValueChange}
        modules={modules}
        // Save new note when Enter key is pressed
        onKeyDown={event => {
          handleKeyDown(event)
        }}
      />
      <div className="note-footer">
        <p className={`character-count ${characterLimit <= 0 && "error"}`}>
          {characterLimit} Remaining
        </p>
        <button className="add-btn" onClick={handleSaveClick} ref={saveBtn}>
          <BsCheckLg className="check-icon" />
        </button>
      </div>
    </div>
  );
};

export default NewNote;
