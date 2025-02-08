import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTemperatureHigh, FaWind, FaCloud, FaTint } from 'react-icons/fa';
import Image from 'next/image';

const WeatherAround = ({ pin }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherBackground = (temp) => {
    if (temp < 10) {
      return {
        image: '/weather-backgrounds/cold.jpg',
        gradient: 'from-blue-500/50 to-blue-700/50',
        theme: 'cold'
      };
    } else if (temp > 25) {
      return {
        image: '/weather-backgrounds/hot.webp',
        gradient: 'from-orange-500/50 to-red-700/50',
        theme: 'hot'
      };
    } else {
      return {
        image: '/weather-backgrounds/normal.jpg',
        gradient: 'from-green-500/50 to-blue-500/50',
        theme: 'normal'
      };
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // First get coordinates from postal code
        const geoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: `${pin}, Canada`,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
              region: 'ca'
            },
          }
        );

        if (geoResponse.data.status === "OK" && geoResponse.data.results.length > 0) {
          const { lat, lng } = geoResponse.data.results[0].geometry.location;
          
          // Then fetch weather using coordinates
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: lat,
                lon: lng,
                appid: 'ae5a299ee922494143d6c00590816e54'
              }
            }
          );
          
          setWeatherData(weatherResponse.data);
          setError(null);
        } else {
          setError("Location not found. Please check your postal code.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch weather data");
      }
    };

    if (pin) {
      fetchWeather();
    }
  }, [pin]);

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <p className="text-red-700">{error}</p>
    </div>
  );
  
  if (!weatherData) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const tempCelsius = Math.round(weatherData.main.temp - 273.15);
  const weatherBg = getWeatherBackground(tempCelsius);

  // Get weather icon from OpenWeather
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  return (
    <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={weatherBg.image}
          alt="Weather background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${weatherBg.gradient}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-6">
          {/* Location Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Weather in <span className="text-indigo-600">{weatherData.name}</span>
            </h1>
            <p className="text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Main Weather Display */}
          <div className="w-full bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <img 
                  src={weatherIcon} 
                  alt={weatherData.weather[0].description}
                  className="w-24 h-24"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-5xl font-bold text-gray-800">
                    {tempCelsius}°C
                  </h2>
                  <p className="text-lg text-gray-600 capitalize">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaWind className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {weatherData.wind.speed} m/s
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaTint className="text-green-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {weatherData.main.humidity}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaTemperatureHigh className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {Math.round(weatherData.main.feels_like - 273.15)}°C
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaCloud className="text-purple-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Cloudiness</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {weatherData.clouds.all}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAround;