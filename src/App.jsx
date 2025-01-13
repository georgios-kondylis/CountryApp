import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFoound from "./components/regions/NotFoound";

import { fetchingCountryIdUsingParams } from "./CountryDetails";
import CountryDetails from "./CountryDetails";

const rippleEffect = (e) => {
  const element = e.currentTarget;
  const ripple = document.createElement('span');
  const size = Math.max(element.offsetWidth, element.offsetHeight);
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');

  // Append ripple to element
  element.appendChild(ripple);

  // Remove ripple after animation ends
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
};


function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev); // Toggles dark mode
  };
  const [color, setColor] = useState("black");

  //------------------- ROUTES ------------------------

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar rippleEffect={rippleEffect} screenSize={screenSize} setScreenSize={setScreenSize} searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} toggleDarkMode={toggleDarkMode} color={color} setColor={setColor}/>}>
        <Route index element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} toggleDarkMode={toggleDarkMode} color={color} setColor={setColor} screenSize={screenSize} setScreenSize={setScreenSize} rippleEffect={rippleEffect}/>}/>
        <Route
          path="/:region/:id"
          element={<CountryDetails rippleEffect={rippleEffect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} color={color} />}
          loader={fetchingCountryIdUsingParams}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          errorElement={<NotFoound color={color} />} />

        <Route path="*" element={<NotFoound darkMode={darkMode} rippleEffect={rippleEffect} color={color} />} />
      </Route>
    )
  );
  //-----------------------------------------------------

  return (
    <div
      className={` ${
        !darkMode ? "bg-white" : "bg-mainDark"
      } h-[full] pb-[10rem] overflow-x-hidden`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

