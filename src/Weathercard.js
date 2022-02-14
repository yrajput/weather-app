import React, {Component} from 'react'
import './Weathercard.css';


class Weathercard extends Component {
    state = {
        days: [
          {name: 'Monday', date: 'March 1st, 1:00 pm', temp: '79', forecast: 'cloudy'},
          {name: 'Tuesday', date: 'March 2nd, 1:00 pm',temp: '79', forecast: 'cloudy'},
          {name: 'Wednesday', date: 'March 3rd, 1:00 pm',temp: '79', forecast: 'cloudy'},
          {name: 'Thursday', date: 'March 4th, 1:00 pm',temp: '79', forecast: 'cloudy'},
          {name: 'Friday', date: 'March 5th, 1:00 pm',temp: '79', forecast: 'cloudy'},
        ],
        location: 'Boise, Idaho',
      }
  render() {
      
    return (
      <div>
        <div className="Location">{this.state.location}</div>
        <div className="WeatherList">
          {this.state.days.map((day) =>
            <div className="IndividualCard">
              <div className="DayName"> {day.name} </div>
              <div className="DayDate"> {day.date} </div>
              <div className="DayTemp"> {day.temp} </div>
              <div className="DayForecast"> {day.forecast} </div>
              </div>)}
        </div>
      </div>
    )
  }
}

export default Weathercard