import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs'

const NewNote = ({ handleNewNote }) => {
	const [noteUserText, setNoteUserText] = useState('');
	const userTextbox = document.querySelector('.new .textbox')
	const characterLimit = (250 - noteUserText.length)

	const handleValueChange = (e) => {
		setNoteUserText(e.target.value)

		userTextbox.classList.remove("error")
		userTextbox.placeholder = "Type here to add a note..."
	};
	
	console.log(characterLimit)
	
	const handleSaveClick = () => {
		if (noteUserText.trim().length > 0) {
			handleNewNote(noteUserText);
			setNoteUserText('');

			userTextbox.classList.remove("error")

		} else {
			setNoteUserText('');
			
			// Adding and resetting shake animation
			setTimeout(() => {
				document.querySelector(".new").classList.remove("shake-animation")
			}, 400);
			document.querySelector(".new").classList.add("shake-animation")

			userTextbox.classList.add("error")
			userTextbox.placeholder = "Please enter some text here..."
		}
	};

	return (
		<div className='note new'>
			{
				
			}
			<textarea
				className={"textbox"}
				rows='8'
				cols='10'
				maxLength={250}
				placeholder="Type here to add a note..."
				value={noteUserText}
				onChange={handleValueChange}
			></textarea>
			<div className='note-footer'>
				<p className={`${characterLimit <= 0 && "error"}` + " character-count"}>
					{characterLimit} Remaining
				</p>
				<button className='add-btn' onClick={handleSaveClick}>
					<BsCheckLg className='check-icon'/>
					
				</button>
			</div>
		</div>
	);
};

export default NewNote;