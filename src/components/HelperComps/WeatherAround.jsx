import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTemperatureHigh, FaWind, FaCloud, FaTint } from 'react-icons/fa';

const WeatherAround = ({ pin }) => {
  const imgarray = {
    cold: 'https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=800',
    hot: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800',
    normal: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=800',
  };

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?zip=${pin}&appid=ae5a299ee922494143d6c00590816e54`;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(apiurl);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [pin]);

  if (!weatherData) return <p className="text-center text-gray-500">Loading weather data...</p>;

  const tempCelsius = parseFloat((weatherData.main.temp - 273.15).toFixed(2));
  let imgsrc = tempCelsius < 10 ? imgarray.cold : tempCelsius <= 20 ? imgarray.normal : imgarray.hot;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Current Weather in <span className="text-blue-500">{weatherData.name}</span></h1>
      <div className="relative bg-cover bg-center rounded-lg h-64 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${imgsrc})` }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-3xl flex items-center gap-2 font-semibold">
            <FaTemperatureHigh /> {tempCelsius} °C
          </h2>
          <p className="text-lg flex items-center gap-2 mt-2">
            <FaCloud /> {weatherData.weather[0].main}
          </p>
          <p className="text-lg flex items-center gap-2 mt-1">
            <FaWind /> {weatherData.wind.speed} m/s
          </p>
          <p className="text-lg flex items-center gap-2 mt-1">
            <FaTint /> {weatherData.main.humidity}% Humidity
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAround;