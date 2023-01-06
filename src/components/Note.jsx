import { TiDelete } from 'react-icons/ti';
import { AiOutlineClockCircle } from 'react-icons/ai';

function Note ({ id, noteText, noteDate, noteTime, handleDeleteNote }) {
    // console.log(id, noteDate, noteTime, noteText)
    return (
        <div className="note">
            <span>{noteText}</span>

            <div className="note-footer">
                <div className="date">
                    <AiOutlineClockCircle className="date-icon"/>
                    <p>{noteTime} - {noteDate}</p>
                </div>
                <button className="delete-btn">
                    <TiDelete className="delete-icon" onClick={() => handleDeleteNote(id)}/>
                </button>
            </div>
        </div>
    );
}

export default Note;