import React, {Component} from 'react'
import './App.css';
import Weathercard from './Weathercard';

class App extends Component {
  state = {
    days: [
      {name: 'Monday', temp: '79', forecast: 'cloudy'},
      {name: 'Tuesday', temp: '79', forecast: 'cloudy'},
      {name: 'Wednesday', temp: '79', forecast: 'cloudy'},
      {name: 'Thursday', temp: '79', forecast: 'cloudy'},
      {name: 'Friday', temp: '79', forecast: 'cloudy'},
    ],
  }
  render () {
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

}

export default App;
