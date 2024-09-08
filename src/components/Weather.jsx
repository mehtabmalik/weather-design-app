import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiData = {
  key: "07acc78e2200198960a931df88bc4fbb",
  base: "https://api.openweathermap.org/data/2.5/weather?",
  units: "metric", // Metric units for temperature (Celsius)
};

// Fetch weather forecast function
const fetchWeatherForecast = async ({ queryKey }) => {
  const [_, cityName, countryName] = queryKey; // extract city and country from queryKey

  try {
    const { data } = await axios.get(
      `${apiData.base}q=${cityName},${countryName}&units=${apiData.units}&APPID=${apiData.key}`
    );
    return data;
  } catch (error) {
    throw new Error("Unable to fetch weather data");
  }
};

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["weatherForecast", cityName, countryName],
    queryFn: fetchWeatherForecast,
    enabled: false, // Disable automatic query on component mount
  });

  const submitButton = (e) => {
    e.preventDefault();
    if (cityName && countryName) {
      refetch(); // Trigger refetch with updated queryKey
    }
  };

  useEffect(() => {
    console.log("first");
    console.log(
      setTimeout(() => {
        console.log("second");
      }, 3000)
    );
    console.log("3rd");
    console.log(
      setTimeout(() => {
        console.log("4th");
      }, 1000)
    );
  }, []);

  if (isLoading) return <p>Loading weather forecast...</p>;
  if (error) return <p>Error fetching weather data: {error.message}</p>;

  return (
    <div className="flex w-full">
      <form className="p-5 w-full" onSubmit={submitButton}>
        <h1 className="p-3 sm:p-3 md:p-4 sm:mb-6 tracking-wider bg-cyan-400 w-full text-xl sm:text-2xl md:text-3xl flex font-bold justify-center rounded-lg">
          WEATHER UPDATE
        </h1>
        <label className="block mb-1 sm:mb-2 font-bold">City Name:</label>
        <input
          className="w-full p-1 mb-2 sm:p-2 border-2 box-border text-[16px] rounded-lg"
          type="text"
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
          required
        />

        <label className="block mb-1 sm:mb-2 font-bold">Country Name:</label>
        <input
          className="w-full p-1 mb-2 sm:p-2 border-2 box-border text-[16px] rounded-lg"
          type="text"
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Enter country name"
          required
        />

        <button
          className="p-3 w-full mt-3 sm:mt-5 bg-cyan-400 border-0 font-bold text-xl rounded-md cursor-pointer hover:bg-cyan-500 transition-colors duration-300"
          type="submit"
        >
          Check Status
        </button>
      </form>
      <div className="flex p-5 w-full">
        {data && (
          <div className="p-3 w-full">
            <h1 className="py-4 font-bold text-xl border-b-2">Weather</h1>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">
                  {data.name}, {data.sys.country}
                </h3>
                <p>{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-4xl py-3 font-bold">
                {Math.round(data.main.temp)}°C
              </p>
              <h2 className="text-3xl pb-3 font-bold">
                {data.weather[0].main}
              </h2>
              <div className="w-full">
                <div className="flex w-full gap-2">
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">High/Low</h2>
                    <p>
                      {Math.round(data.main.temp_max)}°C /{" "}
                      {Math.round(data.main.temp_min)}°C
                    </p>
                  </div>
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Humidity</h2>
                    <p>{data.main.humidity}%</p>
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Pressure</h2>
                    <p>{data.main.pressure} hPa</p>
                  </div>
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Visibility</h2>
                    <p>{data.visibility / 1000} km</p>
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Wind</h2>
                    <p>{data.wind.speed} km/h</p>
                  </div>
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Wind Direction</h2>
                    <p>{data.wind.deg}°</p>
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Sunrise</h2>
                    <p>
                      {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-5 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Sunset</h2>
                    <p>
                      {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
