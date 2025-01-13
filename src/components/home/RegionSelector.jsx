import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "./Home.css";

const RegionSelector = ({ darkMode, rippleEffect,  setURLsearchParams, color }) => {
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const dropdownRef = useRef(null);

  const regions = [
    { label: "All", value: "" },
    { label: "Europe", value: "europe" },
    { label: "Asia", value: "asia" },
    { label: "America", value: "americas" },
    { label: "Africa", value: "africa" },
    { label: "Antarctic", value: "antarctic" },
    { label: "Oceania", value: "oceania" },
  ];

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply pointer-events-none to body when dropdown is active
  useEffect(() => {
    if (active) {
      document.body.classList.add("pointer-events-none");
    } else {
      document.body.classList.remove("pointer-events-none");
    }

    return () => {
      document.body.classList.remove("pointer-events-none"); // Cleanup if component is unmounted
    };
  }, [active]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region.label); // Updates the displayed region
    setURLsearchParams(region.value ? { region: region.value } : {}); // If region.value exists (e.g., "europe"), it updates the query parameter to ?region=europe.
    setActive(false); // Closes the dropdown menu
  };
  
  return (
    <div className="relative w-[17%] min-w-[130px] max-sm:w-[50%] z-50" id="select-region" ref={dropdownRef}>
      {/* Selector Box */}
      <div
        className={` h-[55px]
          ${darkMode ? `bg-mainDark border-mainFaded hover:border-white ${focus && "border-white border-[2px]"}` 
          : 
          `bg-white border-gray-400  hover:border-BLACK ${focus && `border-BLACK border-[2px]`}`}
          relative text-${color} w-full px-4 py-[15px] rounded-[4px] border-[1px] cursor-pointer focus:outline-none`}
        onClick={() => {
          setFocus(true);
          setActive((prev) => !prev);}}>
            
        {selectedRegion ? (<span className={`text-${color}`}>{selectedRegion}</span>) : null}

        {/* Placeholder */}
        <span
          className={`absolute left-4 text-gray-400 text-[15px] transition-all duration-300 ease-in-out pointer-events-none ${
            selectedRegion || active
              ? `transform translate-y-[-30px] translate-x-[-20px] px-1 scale-75 ${darkMode ? "bg-mainDark text-white" : "bg-white text-BLACK"}`
              : "opacity-50" }`}>

          Region
        </span>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute left-0 top-full mt-1 z-[50] ${darkMode? 'bg-mainDark2':'bg-white'} shadow-[0px_3px_10px_rgba(0,0,0,0.7)]  rounded-[4px] w-full transition-opacity duration-300 ease-in-out ${
          active ? "flex flex-col opacity-100 pointer-events-auto" : "hidden opacity-0"}`}>
        {regions.map((region, i) => (
          <button key={i}
            className={` py-2 px-4 z-[50] text-${color} rounded-sm text-left ${darkMode? 'hover:bg-gray-500': 'hover:bg-gray-200'}`}
            onClick={() => handleRegionSelect(region) }>

            {region.label}
          </button>
        ))}
      </div>
      {/* Arrow Icon */}
      <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-${color}`}>
        {active ? (
          <i className=" fa-solid fa-sort-up"></i>
        ) : (
          <i className="fa-solid fa-caret-down"></i>
        )}
      </span>
    </div>
  );
};

export default RegionSelector;
