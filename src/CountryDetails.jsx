import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";

const CountryDetails = ({ darkMode, color, setSearchQuery, rippleEffect }) => {
  useEffect(() => {
      // Reset scroll position to the top
      window.scrollTo(0, 0);
    }, []);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const countryData = useLoaderData(); // Fetch the country data returned by the loader
  const [borderCountries, setBorderCountries] = useState([]);

  // Fetch border countries when the component mounts
  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (countryData.borders?.length) {
        // if the country has any border counties then fetch info
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch border countries.");
          }
          const dataOfBorderCountries = await response.json();
          setBorderCountries(dataOfBorderCountries); // Save the fetched border countries in state
        } catch (error) {
          console.error("Error fetching border countries:", error.message);
        }
      }
    };

    fetchBorderCountries();
    setLoading(false);
  }, [countryData.borders]);

  return (
    <div
      className={`flex flex-col w-full xl:w-[90%] transform ease-in-out duration-500 mx-auto items-center text-${color} mx-auto`}
    >
      <div
        id="back-btn"
        className={`flex RIPPLE_EFFECT w-full items-center mt-[30px]`}
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
          <i className="fa-solid fa-arrow-left"></i>
          <h1>BACK</h1>
        </div>
      </div>

      {loading ? (
        <div
          id="loader-wrapper"
          className="flex w-full justify-center items-start mt-[90px] px-[25px] max-sm:px-[15px] gap-[50px] max-md:flex-col max-md:gap-4 md:px-[40px] max-md:items-start border-2] md:h-[50vh]"
        >
          <div className="w-full max-w-[700px] min-w-[300px]">
            {" "}
            {/* FLAG loader */}
            <div className="w-full h-[300px] rounded-md  bg-mainGrayLoadDark loading_anim"></div>
          </div>
          {/*                                    COUNTRY DETAILS                       */}
          <div
            id="country-details"
            className="flex flex-col items-start h-[290px] w-full "
          >
            <div className="mb-[25px] rounded-md w-[170px] h-[35px] loading_anim bg-mainGrayLoadDark mt-[15px]">
              {" "}
            </div>

            <div className="flex w-full flex-row flex-1 lg:gap-[60px] transition-all ease-in-out duration-800 md:gap-[30px] justify-start items-start max-sm:flex-col">
              <div id="country-details" className="">
                <div className="flex gap-[10px] items-center">
                  <p className="font-[700] text-[1rem]">Population:</p>
                  <div className="loading_anim rounded-sm w-[80px] h-[11px]  bg-mainGrayLoadDark"></div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="font-[700] text-[1rem]">Region:</p>
                  <div className=" loading_anim rounded-sm w-[80px] h-[11px]  bg-mainGrayLoadDark"></div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="font-[700] text-[1rem]">Capital:</p>
                  <div className="loading_anim rounded-sm w-[80px] h-[11px]  bg-mainGrayLoadDark"></div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="text-nowrap font-[700] text-[1rem]">
                    Native Name:
                  </p>
                  <div className="loading_anim rounded-sm w-[80px] h-[11px]  bg-mainGrayLoadDark"></div>
                </div>
              </div>

              <div id="country-details-2" className="">
                <div className="flex gap-[10px] items-center">
                  <p className="text-nowrap font-[700] text-[1rem]">
                    Top Level Domain:
                  </p>
                  <div className="loading_anim rounded-sm w-[80px] h-[11px] bg-mainGrayLoadDark"></div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="text-nowrap font-[700] text-[1rem]">
                    Currencies:
                  </p>
                  <div className=" loading_anim rounded-sm w-[80px] h-[11px]  bg-mainGrayLoadDark"></div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="text-nowrap font-[700] text-[1rem]">
                    Language:
                  </p>
                  <div className=" loading_anim rounded-sm w-[80px] h-[11px] bg-mainGrayLoadDark"></div>
                </div>
              </div>
            </div>

            {/*                                    BORDER COUNTRiES                       */}
            <div className="max-md:flex-wrap my-[30px] flex items-center justify-start flex-wrap gap-[10px]">
              <h1 className="font-[700]">Border countries:</h1>
              <div className="w-[50px] h-[20px] loading_anim rounded-[3px] bg-mainGrayLoadDark"></div>
              <div className="w-[50px] h-[20px] loading_anim rounded-[3px] bg-mainGrayLoadDark"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="img_details_wrapper"
          className="flex w-full justify-center items-start mt-[90px] px-[25px] max-sm:px-[15px] gap-[50px]
    max-md:flex-col max-md:gap-4 md:px-[40px] max-md:items-start border-2] md:h-[50vh]"
        >
          <div className="w-full max-w-[700px] min-w-[300px]">
            {" "}
            {/* FLAG IMAGE */}
            <img
              className="w-full rounded-md"
              src={countryData.flags.png}
              alt=""
            />
          </div>
          {/*                                    COUNTRY DETAILS                       */}
          <div
            id="country-details"
            className="flex flex-col items-start h-[290px] w-full "
          >
            <div>
              <p className={`text-[3rem] mb-[15px]`}>
                {" "}
                {countryData.name.common}{" "}
              </p>
            </div>

            <div className="flex w-full flex-row flex-1 lg:gap-[60px] transition-all ease-in-out duration-800 md:gap-[30px] justify-start items-start max-md:flex-col">
              <div id="country-details" className="flex flex-col gap-[5px]">
                <p className="">
                  {" "}
                  <span className="text-nowrap font-[700] text-[1rem]">
                    Population:{" "}
                  </span>{" "}
                  {countryData.population}{" "}
                </p>
                <p className="">
                  {" "}
                  <span className=" text-nowrap font-[700] text-[1rem]">
                    Region:{" "}
                  </span>{" "}
                  {countryData.region}{" "}
                </p>
                <p className="">
                  {" "}
                  <span className=" text-nowrap font-[700] text-[1rem]">
                    Capital:{" "}
                  </span>{" "}
                  {countryData.capital?.[0] || "N/A"}{" "}
                </p>
                <p className="">
                  <span className="font-[700] text-[1rem] text-nowrap">
                    Native Name:{" "}
                  </span>
                  {countryData.name.nativeName &&
                  Object.values(countryData.name.nativeName)[0]?.common? Object.values(countryData.name.nativeName)[0]?.common
                    : "N/A"}
                </p>
              </div>

              <div id="country-details-2" className="flex flex-col gap-[5px]">
                <p className="text-nowrap">
                  <span className="font-[700] text-[1rem]">
                    Top Level Domain:
                  </span>
                  {countryData.tld
                    ? countryData.tld.map((value) => " " + value).join(", ")
                    : "N/A"}
                </p>
                <p className="text-nowrap">
                  <span className="font-[700] text-[1rem]">Currencies: </span>
                  {countryData.currencies
                    ? Object.values(countryData.currencies)
                        .map((cur) => `${cur.name}`)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="">
                  <span className="font-[700] text-nowrap text-[1rem]">Languages: </span>
                  {countryData.languages
                    ? Object.values(countryData.languages)
                        .map((lang) => lang)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/*                                    BORDER COUNTRiES                       */}
            <div className="max-md:flex-wrap mt-[70px] mb-[20px] flex items-center justify-start flex-wrap gap-[10px]">
              <h1 className="font-[600]">Border countries:</h1>
              {borderCountries.length > 0 ? (
                borderCountries
                  .sort((a, b) => a.cca3.localeCompare(b.cca3))
                  .map((country) =>
                    country.cca3 ? (
                      <p
                        key={country.cca3}
                        className={`rounded-2xl px-[9px] py-[2px] ${
                          darkMode ? "bg-gray-600" : "bg-gray-200"
                        } cursor-pointer max-w-[150px]`}
                        onClick={() => {
                          navigate(
                            `/${country.region.toLowerCase()}/${country.cca3}`
                          );
                          setSearchQuery("");
                        }}
                      >
                        {country.cca3}
                      </p>
                    ) : null
                  )
              ) : (
                <p>No border countries</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loader for fetching the country details
export const fetchingCountryIdUsingParams = async ({ params }) => {
  const { id } = params; // This will be the cca3 code, e.g., "GRC"

  try {
    const fetchCountryDetails = await fetch(
      `https://restcountries.com/v3.1/alpha/${id}`
    );
    if (!fetchCountryDetails.ok) {
      throw new Error("Error fetching country details.");
    }
    const countryArray = await fetchCountryDetails.json(); // The API returns an array
    return countryArray[0]; // Return the first element, which contains the country details
  } catch (error) {
    console.error("Error fetching country details:", error.message);
    throw error;
  }
};

export default CountryDetails;
