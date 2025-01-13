import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import "./Navbar.css";

const Navbar = ({ screenSize, setScreenSize, darkMode, toggleDarkMode, color, setColor, rippleEffect }) => {

  useEffect(() => {    // handle resize window width
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileView = 640;

  return (
    <>
      <div id="navbar" className={`flex w-full h-[65px] max-sm:h-[56px] justify-between items-center shadow-[5px_0px_10px_rgba(0,0,0,0.5)] 
        ${!darkMode ? "bg-white" : "bg-mainDark2"} `}>
          <div  className={`flex xl:w-[93%] lg:mx-auto w-full h-full justify-between items-center p-[25px] transform ease-in-out duration-500 `}>
            <div id="logo_container">
            <h1
              className={` ${
                !darkMode ? "text-mainDark" : "text-white"
              } text-[1.3rem]`}
            >
              The Flag App
            </h1>
          </div>

          {screenSize > mobileView ? (
            <div>
              <img
                className="w-[183px]"
                src={!darkMode ? "/TechoverBlack.png" : "/TechoverWhite.png"}
                alt=""
              />
            </div>
          ) : null}

          <div
            id="light-container"
            className="RIPPLE_EFFECT flex items-center py-[9px] px-[9px] rounded-[5px] gap-[8px] cursor-pointer"
            onClick={(e) => {
              toggleDarkMode();
              setColor(`${color === "white" ? "black" : "white"}`);
              rippleEffect(e)
            }}
          >
            {darkMode? <i class={`fa-solid fa-sun text-white`}></i> : <i class="fa-solid fa-moon"></i>}
            {!darkMode ? (
              <p className="LIGHT text-[0.9rem] text-black">DARK MODE</p>
            ) : (
              <p className="DARK text-[0.9rem] text-white">LIGHT MODE</p>
            )}
          </div>
        </div>
       
      </div>

      <Outlet />
    </>
  );
};
// CHECK POINT CHeckpoint !!
export default Navbar;
