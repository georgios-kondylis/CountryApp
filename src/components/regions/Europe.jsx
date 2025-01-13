import React from "react";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import CardComponent from "../home/CardComponent";

const Europe = ({color}) => {

 const [EUcountries, setEUCountries] = useState([]);
 
   const fetchEUcountries = async () => {
     try {
       const data = await fetch("https://restcountries.com/v3.1/all");
       const dataInJson = await data.json();
       const Eu = dataInJson.filter((country) => country.region === 'Europe')
       setEUCountries(Eu);
     } catch (error) {
       console.error("Error fetching the countries", error);
     }
   };
 
   useEffect(() => {
     fetchEUcountries();
   }, []);

   console.log(EUcountries)

  return (
    <>
    <div className="flex flex-wrap justify-around gap-7 mx-[20px] my-[50px]">
      {EUcountries.map((country, index) => (
        <CardComponent
          key={index}
          image={country.flags.png} // Fixed flag property
          title={country.name.common}
          capital={country.capital?.[0] || "N/A"} // Handle missing capital
          population={country.population}
          region={country.region}
          color={color}
        />
      ))}
    </div>
    <Outlet />
  </>
  );
};

export default Europe;
