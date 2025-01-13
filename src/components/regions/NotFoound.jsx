import React from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";


const NotFoound = ({darkMode, rippleEffect, color}) => {

  const navigate = useNavigate();

  return (
    
    <div className="flex h-[100vh] flex-col gap-5 items-start max-md:items-center justify-start w-full mt-[50px]">
       <div
        id="back-btn"
        className={`flex RIPPLE_EFFECT w-full items-center`}
        onClick={(e) => {
          navigate(`/`);
          setSearchQuery("");
          rippleEffect(e)
        }}
      >
        <div
          className={`flex rounded-[4px] py-[5px] pr-[20px] pl-[15px] max-sm:px-[15px] items-center gap-3
         ${darkMode? ' hover:bg-gray-700': ' hover:bg-gray-100'} cursor-pointer duration-300 md:mx-[40px]`}
        > 
          <i className={`text-${color} fa-solid fa-arrow-left`}></i>
          <h1 className={ `text-${color}`}>BACK</h1>
        </div>
      </div>

      <h1 className={`text-[1.1rem]  duration-300 max-md:mx-[15px] md:mx-[40px] text-${color} `}>Could not find that country!</h1>
    </div>
  );
};

export default NotFoound;
