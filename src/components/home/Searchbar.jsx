import React, { useState, useEffect, useRef } from 'react';

const Searchbar = ({ searchQuery, setSearchQuery, darkMode, color }) => {
  const [focus, setFocus] = useState(false);
  const searchBarRef = useRef(null);

  // Event listener to detect clicks outside of the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setFocus(false); // Remove focus if clicked outside
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} id="searchbar" className="relative flex flex-1 max-w-[300px] max-sm:w-full max-sm:max-w-full items-center justify-between gap-4">
      <input
        className={`${darkMode ? 'bg-mainDark' : 'bg-white'} w-full text-${color} px-4 py-[15px] rounded-[5px] border-[1px] 
        ${darkMode ? 'border-mainFaded hover:border-white ' : 'border-gray-400 hover:border-black'} 
        ${focus && !darkMode && `border-[2px] border-BLACK`}
        ${focus && darkMode && `border-[2px] border-white`}
        focus:outline-none`}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Handle input changes
        onFocus={() => setFocus(true)} // Trigger focus state when clicked
      />
      <span
        className={`placeH absolute left-[15px] ${darkMode? 'text-gray-300' : 'text-gray-500'} text-gray-400 text-[15px] transition-all duration-300 ease-in-out pointer-events-none ${
          searchQuery || focus
            ? `transform translate-y-[-30px] translate-x-[-20px] px-1 scale-75 ${darkMode ? 'bg-mainDark text-white' : 'bg-white text-[BLACK]'}`
            : "opacity-500" }`}>

        Search for a Country
      </span>
    </div>
  );
};

export default Searchbar;
