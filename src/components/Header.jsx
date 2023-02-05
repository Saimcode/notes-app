import React, { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { HiMoon, HiOutlineSun } from 'react-icons/hi'
import Select from 'react-select';

function Header({ selectedOption, setSelectedOption, notes, setNotes, handleThemeToggle, handleSearchInput, currentMode }) {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = [
    { value: 'date-LO', label: 'Date (Latest to Oldest)' },
    { value: 'date-OL', label: 'Date (Oldest to Latest)' },
    { value: 'alphabetically-AZ', label: 'Alphabetically (A-Z)' },
    { value: 'alphabetically-ZA', label: 'Alphabetically (Z-A)' },
  ];

  

  return (
    screenWidth <= 500 ?
      <header className='header mobile'>
        <div className="header-first">
          <h1 className="logo">Notes <span>App</span></h1>
          
          <button className="change-theme-btn" onClick={handleThemeToggle}>
            {currentMode ? <HiOutlineSun /> : <HiMoon />}
          </button>
        </div>


        <div className="header-second">
          <div className="search-bar">
            <GoSearch className='search-icon'/>
            <input type="text" placeholder='Type here to search...' onChange={(e) => {
              handleSearchInput(e.target.value);
            }} />
          </div>

          <Select 
              defaultValue={null}
              onChange={setSelectedOption}
              options={options}
              isSearchable={false}
              isClearable={false}
              placeholder={"--Sort By--"}   
              className="react-select-container"  
              classNamePrefix="react-select"
            />
        </div>


      </header>
     : screenWidth <= 750 ? 
     <header className='header tablet'>
        <div className="header-first">
          <h1 className="logo">Notes <span>App</span></h1>
          
          <button className="change-theme-btn" onClick={handleThemeToggle}>
            {currentMode ? <HiOutlineSun /> : <HiMoon />}
          </button>
        </div>


        <div className="header-second">
          <div className="search-bar">
            <GoSearch className='search-icon'/>
            <input type="text" placeholder='Type here to search...' onChange={(e) => {
              handleSearchInput(e.target.value);
            }} />
          </div>

          <Select 
              defaultValue={null}
              onChange={setSelectedOption}
              options={options}
              isSearchable={false}
              isClearable={false}
              placeholder={"--Sort By--"}   
              className="react-select-container"  
              classNamePrefix="react-select"
            />
        </div>


      </header>
     :
    <header className='header desktop'>      
          <h1 className="logo">Notes <span>App</span></h1>
          

        <div className="header-second">
          <div className="search-bar">
            <GoSearch className='search-icon'/>
            <input type="text" placeholder='Type here to search...' onChange={(e) => {
              handleSearchInput(e.target.value);
            }} />
          </div>

            <Select 
              defaultValue={null}
              onChange={setSelectedOption}
              options={options}
              isSearchable={false}
              isClearable={false}
              placeholder={"--Sort By--"}   
              className="react-select-container"  
              classNamePrefix="react-select"
            />
        </div>
          <button className="change-theme-btn" onClick={handleThemeToggle}>
            {currentMode ? <HiOutlineSun /> : <HiMoon />}
          </button>
    </header>
  )
}

export default Header