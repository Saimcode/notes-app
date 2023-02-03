import React, { useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { BsFillExclamationCircleFill } from 'react-icons/bs'

function ErrorMsg({ setShowErrorMsg, showErrorMsg, errorCloseAnimation, setErrorCloseAnimation, textEditor }) {
  console.log(showErrorMsg)

  // Automatically remove the error msg after 5 seconds
  useEffect(() => {
    if (showErrorMsg) {
      setTimeout(() => {
        setErrorCloseAnimation(true)

        setTimeout(() => {
            setErrorCloseAnimation(false)
            setShowErrorMsg(false)
        }, 500);

    }, 5000);
    }
  }, [showErrorMsg, setShowErrorMsg]);

  const handleError = () => {
    setErrorCloseAnimation(true);
    setTimeout(() => {
        setShowErrorMsg(false);
        setErrorCloseAnimation(false);
    }, 500);
  }
  

  return (
    showErrorMsg && (
    <div className={`error-msg animate__animated animate__bounceIn 
    ${ errorCloseAnimation ? 'animate__bounceOut' : '' }`
    } >
        <BsFillExclamationCircleFill className='danger-icon' />
        <p>Please enter some text.</p>
        <IoCloseSharp className='close-icon' onClick={handleError}/>
    </div>
    )
  )

}

export default ErrorMsg
