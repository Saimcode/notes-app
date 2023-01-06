import React from 'react'
import { GoSearch } from 'react-icons/go'
import { HiMoon, HiOutlineSun } from 'react-icons/hi'

function Header({ handleThemeToggle, handleSearchInput, currentMode }) {

  return (
    <header className='header'>
      <h1 className="logo">Notes <span>App</span></h1>
      
      <div className="search-bar">
        <GoSearch className='search-icon'/>
        <input type="text" placeholder='Type here to search...' onChange={(e) => {
          handleSearchInput(e.target.value);
        }} />
      </div>
      
      <button className="change-theme-btn" onClick={handleThemeToggle}>
        {currentMode ? <HiOutlineSun /> : <HiMoon />}
      </button>
    </header>
  )
}

export default Header