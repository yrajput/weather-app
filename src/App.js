import React, {Component} from 'react'
import './App.css';
import HourlyWeatherCard from './HourlyWeatherCard';
import Weathercard from './Weathercard';

function App (){
  
  return (
    <div className="App">
      <header>
        <h1>Here's Your 5-day Forecast</h1>
      </header>
      <div>
        <Weathercard />
      </div>
      <HourlyWeatherCard />
    </div>
  );
}



export default App;
