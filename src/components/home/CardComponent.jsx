import React from 'react'
import { useEffect } from 'react';

const CardComponent = ({ darkMode, image, title, capital, population, region, color, onClick, className }) => {

  useEffect(() => { // Reset scroll position to the top
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div id='card' className={` ${!className? ' flex flex-1 rounded-md flex-col min-w-[250px] max-w-[350px] max-sm:w-full max-sm:mx-[5%] h-fit shadow-[4px_4px_10px_rgba(0,0,0,0.5)] cursor-pointer hover:brightness-125 mb-[30px]' : className} `} onClick={onClick}>

      <div id='img-container' className='w-full rounded-md rounded-b-none overflow-hidden'>
        <img src={image} className='w-full h-[180px] object-cover object-center bg-no-repeat' alt=""/>
      </div>

      <div id='info' className={`flex flex-col rounded-b-md ${darkMode? 'bg-mainDark2' : 'bg-white'} p-[15px]`}>
        <h2 className={`text-${color} text-[16px] font-bold tracking-wider mb-3`}>{title}</h2>
        <p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} text-[14px]`}><span className='font-semibold'>Population:</span> {population.toLocaleString()}</p>
        <p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} text-[14px]`}><span className='font-semibold'>Region:</span>  {region}</p>
        <p className={`${darkMode? ' text-gray-300' : ' text-gray-600'} text-[14px]`}><span className='font-semibold'>Capital:</span>  {capital}</p>
      </div>

    </div>
  )
}

export default CardComponent