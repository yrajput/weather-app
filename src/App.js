import React, {Component} from 'react'
import './App.css';
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
    </div>
  );
}



export default App;
