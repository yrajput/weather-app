import React, {Component} from 'react'
import './Weathercard.css';
import {connect, useDispatch, useSelector} from 'react-redux'


export default function Weathercard () {

  const dispatch = useDispatch();

  const {days, location} = useSelector((state) => {
    return{
      days: state.days ,
      location: state.location , 
    }
  })
      
  return (
    <div>
      <div className="Location">{location}</div>
      <div className="WeatherList">
        {days.map((day) =>
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


