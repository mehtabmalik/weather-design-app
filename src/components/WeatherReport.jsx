import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiData = {
  key: "07acc78e2200198960a931df88bc4fbb",
  base: "https://api.openweathermap.org/data/2.5/forecast?",
  cnt: 44,
};
const fetchWeatherForecast = async () => {
  const { data } = await axios.get(
    `${apiData.base}q=Pakistan&cnt=${apiData.cnt}&APPID=${apiData.key}`
  );
  return data;
};
const WeatherReport = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Pakistan"],
    queryFn: fetchWeatherForecast,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl mb-4">
        Weather Forecast for Pakistan
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data.list.map((day, index) => (
          <div className=" p-4 rounded-lg shadow-md mx-2 mb-4 flex flex-col items-center text-center border-2">
            <div className="border-b-2 w-full pb-2">
              <h1 className="text-xl">Forcast</h1>
            </div>
            <div key={index} className="pt-3">
              <p className="font-bold">
                {new Date(day.dt * 1000).toDateString()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="my-2"
              />
              <div>
                <p className="text-3xl font-bold">
                  <p>{Math.floor(day.main.temp - 273.15)}°C</p>
                </p>
                <p className="text-lg">{day.weather[0].main}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherReport;
