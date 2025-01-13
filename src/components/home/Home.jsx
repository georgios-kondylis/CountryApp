import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router";
import { Outlet, useSearchParams } from "react-router";
import Searchbar from "./Searchbar";
import RegionSelector from "./RegionSelector";
import SkeletonLoader from "./SkeletonLoader";

const Home = ({ searchQuery, setSearchQuery, color, darkMode, rippleEffect }) => {
  useEffect(() => {
    // Reset scroll position to the top
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [URLsearchParams, setURLsearchParams] = useSearchParams();

  const regionFilter = URLsearchParams.get("region"); // Get the current region from query params ex (region.value)/ europe #last

  const fetchAllCountries = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const dataInJson = await data.json();
      setCountries(dataInJson);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the countries", error);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  // Filter countries based on search query and region
  const filteredCountries = countries.filter((country) => {
    const matchesSearchQuery = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !regionFilter || country.region.toLowerCase() === regionFilter.toLowerCase(); // matches region true if regionFilter is null (e.g., no region selected, so show all regions), OR The country's region matches the selected region (case-insensitive).
    return matchesSearchQuery && matchesRegion;
  });

  return (
    <div>   
      <div
        id="search-N-select"
        className="flex z-50 justify-between items-start mt-[30px] mx-[25px] max-sm:flex-col max-sm:gap-5 max-sm:items-start  xl:w-[90%] xl:mx-auto transform ease-in-out duration-500">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} color={color} />
        <RegionSelector URLsearchParams={URLsearchParams} setURLsearchParams={setURLsearchParams} color={color} darkMode={darkMode}/>
      </div>

      {loading ? (
        <div className="flex xl:w-[90%] xl:mx-auto ease-in-out duration-500 flex-wrap max-sm:justify-around gap-7 mx-[25px] my-[33px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <SkeletonLoader key={item} color={color} darkMode={darkMode} rippleEffect={rippleEffect}/>
          ))}
        </div>
      ) : (
        <div className="flex xl:w-[90%] xl:mx-auto ease-in-out duration-500 flex-wrap max-sm:justify-around gap-7 mx-[25px] my-[33px]">
          {filteredCountries.length > 0 ? (
            filteredCountries
            .sort((a, b) => a.name.common.localeCompare(b.name.common)) // Sorting alphabetically
            .map((country, index) => (
              <CardComponent key={index} image={country.flags.svg} title={country.name.common} capital={country.capital?.[0] || "N/A"} population={country.population} region={country.region} color={color} darkMode={darkMode}
                onClick={() => {navigate(`/${country.region.toLowerCase()}/${country.cca3}`); }}/>)))
                :
              (<div className="h-[100vh]"> <p className="mt-[40%] text-center text-gray-500">No countries found</p></div>)}
         </div>
      )}

      
    </div>
  );
};

export default Home;
