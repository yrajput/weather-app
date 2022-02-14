import React, {Component} from 'react'


class Weathercard extends Component {
    state = {
        days: [
          {name: 'Monday', temp: '79', forecast: 'cloudy'},
          {name: 'Tuesday', temp: '79', forecast: 'cloudy'},
          {name: 'Wednesday', temp: '79', forecast: 'cloudy'},
          {name: 'Thursday', temp: '79', forecast: 'cloudy'},
          {name: 'Friday', temp: '79', forecast: 'cloudy'},
        ],
      }
  render() {
      
    return (
      <div>
        <ul className="WeatherList">
          {this.state.days.map((day) =>
            <div key={day.name}>{day.name} {day.temp} {day.forecast}</div>)}
        </ul>
      </div>
    )
  }
}

export default Weathercard