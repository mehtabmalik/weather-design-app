import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = {
  key: "07acc78e2200198960a931df88bc4fbb",
  base: "https://api.openweathermap.org/data/3.0/onecall",
  lat: 31.5497, // Latitude for Lahore, Pakistan
  lon: 74.3436, // Longitude for Lahore, Pakistan
  units: "metric", // Metric units for temperature (Celsius)
};
const fetchWeatherForecast = async () => {
  try {
    console.log("apI:::", api);
    const { data } = await axios.get(
      `${api.base}?lat=${api.lat}&lon=${api.lon}&exclude=hourly,minutely&units=${api.units}&appid=${api.key}`
    );
    console.log("Response Data:::", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("Error::::", error);
  }
};

const WeatherReport = () => {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["weatherForecast"],
  //   queryFn: fetchWeatherForecast,
  // });

  useEffect(() => {
    fetchWeatherForecast();
    return () => {};
  }, []);

  // if (isLoading) return <p>Loading weather forecast...</p>;
  // if (error) return <p>Error fetching weather data</p>;

  return <div className="p-5">Weather</div>;
};

export default WeatherReport;
