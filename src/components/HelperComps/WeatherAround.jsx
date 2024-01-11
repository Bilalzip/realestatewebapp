import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WeatherAround = ({pin}) => {
  console.log(pin)
  const imgarray = {
    cold:
      'https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=800',
    hot:
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800',
    normal:
      'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=800',
  };

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?zip=${pin}&appid=89fb8a322d4e54c406430bb4e9201fbb`;
  const [weatherData, setweatherData] = useState([]);

  useEffect(() => {
    const weather = async () => {
      try {
        const response = await axios.get(apiurl);
        setweatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    weather();
  }, []);
  let imgsrc =  imgarray.hot;
    const tempCelcius = parseFloat((weatherData?.main?.temp - 273.5).toFixed(2));;
  if (tempCelcius < 10){
    imgsrc = imgarray.cold;
  } else if (tempCelcius >= 10 && tempCelcius <= 20){
    imgsrc = imgarray.normal;
  } else {
    imgsrc = imgarray.hot;
  }

  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl font-sans mb-8'>Current Weather in <span className='text-red-500 '>{weatherData.name}</span>  </h1>
      <div className='h-1/2 md:w-full md:mt-2 rounded-md text-white'
        style={{
          backgroundImage: `url(${imgsrc})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='p-4'>
        <h1 className='flex flex-row items-center gap-4'><span className='text-xl font-bold'>Temperature : </span>  <span> {tempCelcius} °C</span>  </h1>
        <div className='flex flex-col gap-2 
        mt-2  font-sans text-xl'>
   <div>
    <span>Sky: </span>
    <span>{weatherData.weather && weatherData.weather.length > 0 ? weatherData.weather[0].main : ''}</span>
  </div>
  <div>
    <span>Wind Speed: </span>
    <span>{weatherData.wind ? weatherData.wind.speed : ''}/m</span>
  </div>
  <div>
    <span>Humidity: </span>
    <span>{weatherData.main ? weatherData.main.humidity : ''}</span>
  </div> 

  
</div>

        </div>

       
      </div>
    </div>
  );
};

export default WeatherAround;
