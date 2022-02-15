import React, { useEffect } from 'react'
import './Weathercard.css';
import { useDispatch, useSelector } from 'react-redux'
import { GetWeatherData } from './GetWeatherData';
import { getWeather, setLocation, setDays, setSelectedDay, setHourly, getHourlyWeather } from './weather';



export default function Weathercard() {

  const dispatch = useDispatch();

  const { days, location, selectedDay} = useSelector((state) => {
    return {
      days: state.days,
      location: state.location,
      selectedDay: state.selectedDay
    }
  })
  useEffect(() => {
    getWeather()
    //console.log("after getWeather call: data", setTimeout(data/*.then(result=> result.data)*/, 5000))
    //console.log(data);
    //dispatch((setDays(data)))
    //dispatch(setLocation('Chicago'))
    //console.log("location is now", location)
  }, [])
  
  useEffect(() => {
    dispatch(getHourlyWeather())

  }, [selectedDay])
  return (
    <div>
      <div className="Location">{location}</div>
      <div className="WeatherList">
        {days.map((day) =>
          <div className="IndividualCard" key={day.name}  onClick={() => {dispatch(setSelectedDay(day.id))}} >
            <div className="DayName"> {day.name} </div>
            <div className="DayDate"> {day.date} </div>
            <div className="DayTemp"> {day.temp} </div>
            <div className="DayForecast"> {day.forecast} </div>
            <div className="DayForecast"> {day.id} </div>
          </div>)}
      <div>{selectedDay}</div>
      </div>
    </div>
  )
}


