import React, { useEffect,useState } from 'react'
import './Weathercard.css';
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, setLocation } from './weather';


export default function Weathercard() {

  const dispatch = useDispatch();

  const { days, location } = useSelector((state) => {
    return {
      days: state.days,
      location: state.location,
    }
  })
  const [newLocation, setNewLocation] = useState(location);
  const changeLocation = (event) => {
    setNewLocation(event.target.value);
  }

  useEffect(() => {
    console.log("TEST TEST")
    getWeather()
  }, [location])

  return (
    <div>
      <div className="Location">{location}</div>
      <input type="text" name="location" value={newLocation}
               onChange={changeLocation}/>
        <button type="button" onClick={() => dispatch(setLocation(newLocation))}>Submit</button>
      <div className="WeatherList">
        {days.map((day) =>
          <div className="IndividualCard" key={day.date}>
            <div className="DayName"> {day.name} </div>
            <div className="DayDate"> {day.date} </div>
            <div className="DayTemp"> {day.temp} </div>
            <div className="DayForecast"> {day.forecast} </div>
          </div>)}
      </div>
    </div>
  )
}


