import React from 'react'
import { useEffect } from 'react';

const SkeletonLoader = ({ darkMode, rippleEffect, color, className }) => {

  useEffect(() => { // Reset scroll position to the top
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div id='card' className={` ${!className? 'flex flex-1 flex-col min-w-[250px] max-w-[350px] max-sm:w-full max-sm:mx-[5%] h-fit rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)]' : className}
    ${darkMode? 'bg-mainDark' : 'bg-white'}`} >

      <div id='img-container' className='w-full rounded-lg rounded-b-none overflow-hidden'>
         <div className={`w-full loading_anim2 ${darkMode? 'bg-gray-600': 'bg-gray-200'}  h-[180px]`}></div>
      </div>

      <div id='info' className={`flex gap-[2px] flex-col rounded-b-lg ${darkMode? 'bg-mainDark2' : 'bg-white'} p-[15px]`}>
        <div className={`w-full loading_anim ${darkMode? 'bg-gray-600': 'bg-gray-200'} h-[12px] mb-5 mt-[9px] rounded-sm`}></div>
        <div className='flex flex-col pb-[3px] gap-2'>
          <div className='flex items-center gap-3 h-[12px]'><p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} font-semibold text-[14px]`}>Population:</p>  <div className={`w-full loading_anim ${darkMode? 'bg-gray-600': 'bg-gray-200'} h-full rounded-sm`}></div> </div>
          <div className='flex items-center gap-3 h-[12px]'><p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} font-semibold text-[14px]`}>Region:</p>  <div className={`w-full loading_anim ${darkMode? 'bg-gray-600': 'bg-gray-200'} h-full rounded-sm`}></div> </div>
          <div className='flex items-center gap-3 h-[12px]'><p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} font-semibold text-[14px]`}>Capital:</p>  <div className={`w-full loading_anim ${darkMode? 'bg-gray-600': 'bg-gray-200'} h-full rounded-sm`}></div> </div>
        </div>
      </div>

    </div>
  )
}

export default SkeletonLoader


