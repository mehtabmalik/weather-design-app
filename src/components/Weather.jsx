import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tabs } from "antd";

const apiData = {
  key: "07acc78e2200198960a931df88bc4fbb",
  base: "https://api.openweathermap.org/data/2.5/weather?",
  units: "metric",
};
const fetchWeatherForecast = async ({ queryKey }) => {
  const [_, cityName, countryName, latitude, longitude, zipcode, countryCode] =
    queryKey;

  let url = "";
  if (latitude && longitude) {
    url = `${apiData.base}lat=${latitude}&lon=${longitude}&units=${apiData.units}&APPID=${apiData.key}`;
  } else if (cityName && countryName) {
    url = `${apiData.base}q=${cityName},${countryName}&units=${apiData.units}&APPID=${apiData.key}`;
  } else if (zipcode && countryCode) {
    url = `${apiData.base}zip=${zipcode},${countryCode}&units=${apiData.units}&APPID=${apiData.key}`;
  }
  console.log(url);
  if (!url) throw new Error("No valid input provided for API call");

  const { data } = await axios.get(url);
  return data;
};

const Weather = () => {
  const [cityName, setCityName] = useState();
  const [countryName, setCountryName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [zipcode, setZipCode] = useState();
  const [countryCode, setCountryCode] = useState();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "weatherForecast",
      cityName,
      countryName,
      latitude,
      longitude,
      zipcode,
      countryCode,
    ],
    queryFn: fetchWeatherForecast,
    enabled: false,
  });

  const submitButton = (e) => {
    e.preventDefault();

    if ((zipcode && !countryCode) || (!zipcode && countryCode)) {
      alert("Please enter the values for both zip code and country code.");
      return;
    }
    if ((cityName && !countryName) || (!cityName && countryName)) {
      alert("Please enter the values for both city and country.");
      return;
    }
    if ((latitude && !longitude) || (!latitude && longitude)) {
      alert("Please enter the values for both latitude and longitude.");
      return;
    }
    if (
      (cityName && countryName) ||
      (latitude && longitude) ||
      (zipcode && countryCode)
    ) {
      refetch();
    } else {
      alert("Please enter valid query parameters.");
    }
  };

  if (isLoading) return <p>Loading weather forecast...</p>;
  if (error) return <p>Error fetching weather data: {error.message}</p>;

  return (
    <div className="sm:flex">
      <div className="p-3 w-full">
        <h1 className="p-3 sm:p-3 md:p-4 sm:mb-6 tracking-wider bg-cyan-400 w-full text-xl sm:text-2xl md:text-3xl flex font-bold justify-center rounded-lg">
          WEATHER UPDATE
        </h1>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "City Info",
              key: "1",
              children: (
                <div className="md:flex">
                  <form action="" className="m-auto w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 box-border text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      onChange={(e) => setCityName(e.target.value)}
                      placeholder="Enter city name"
                      required
                    />
                  </form>
                  <form className="m-auto md:pl-2 w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 box-border text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      onChange={(e) => setCountryName(e.target.value)}
                      placeholder="Enter country name"
                      required
                    />
                  </form>
                </div>
              ),
            },
            {
              label: "Geo Measurements",
              key: "2",
              children: (
                <div className="md:flex">
                  <form action="" className="m-auto w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 box-border text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      placeholder="Enter latitude"
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </form>
                  <form action="" className="m-auto md:pl-2 w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 box-border text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      placeholder="Enter longitude"
                      onChange={(e) => setLongitude(e.target.value)}
                      required
                    />
                  </form>
                </div>
              ),
            },
            {
              label: "Zip Code",
              key: "3",
              children: (
                <div className="md:flex">
                  <form action="" className="m-auto w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      placeholder="Enter zip code"
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </form>
                  <form action="" className="m-auto md:pl-2 w-full">
                    <input
                      className="w-full p-2 mb-1 sm:p-2 border-2 box-border text-[14px] sm:text-[16px] rounded-lg"
                      type="text"
                      name="name"
                      placeholder="Enter country code"
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                  </form>
                </div>
              ),
            },
          ]}
        />
        <button
          onClick={submitButton}
          className="p-3 w-full mt-3 sm:mt-5 bg-cyan-400 border-0 font-bold text-xl rounded-md cursor-pointer hover:bg-cyan-500 transition-colors duration-300"
          type="submit"
        >
          Check Status
        </button>
      </div>
      <div className="flex p-3 w-full">
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
              <img
                className="size-24"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </div>
            <div className="w-full">
              <p className="text-4xl py-3 font-bold">
                {Math.round(data.main.temp)}°C
              </p>
              <h2 className="text-3xl pb-3 font-bold">
                {data.weather[0].main}
              </h2>
              <div className="w-full">
                <div className="sm:flex w-full gap-2 mb-2">
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">High/Low</h2>
                    <p>
                      {Math.round(data.main.temp_max)}°C /
                      {Math.round(data.main.temp_min)}°C
                    </p>
                  </div>
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Humidity</h2>
                    <p>{data.main.humidity}%</p>
                  </div>
                </div>
                <div className="sm:flex w-full gap-2 mb-2">
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Pressure</h2>
                    <p>{data.main.pressure} hPa</p>
                  </div>
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Visibility</h2>
                    <p>{data.visibility / 1000} km</p>
                  </div>
                </div>
                <div className="sm:flex w-full gap-2 mb-2">
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Wind</h2>
                    <p>{data.wind.speed} km/h</p>
                  </div>
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Wind Direction</h2>
                    <p>{data.wind.deg}°</p>
                  </div>
                </div>
                <div className="sm:flex w-full gap-2 mb-2">
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
                    <h2 className="font-semibold">Sunrise</h2>
                    <p>
                      {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-5 mb-2 sm:mb-0 border-2 rounded-xl p-3 w-full justify-between">
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
