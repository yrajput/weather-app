import Autocomplete from './autocomplete';
import React, { useEffect, useState } from "react";
import "./Weathercard.css";
import { useDispatch, useSelector } from "react-redux";
import HourlyWeatherCard from './HourlyWeatherCard';
import {
  getWeather,
  setLocation,
  setDays,
  setSelectedDay,
  displayHourlyData,
} from "./weather";

export default function Weathercard() {
  const dispatch = useDispatch();


const { days, location, selectedDay, hourlyData, hourlyForecast} = useSelector((state) => {
    return {
      days: state.days,
      location: state.location,
      selectedDay: state.selectedDay,
      hourlyData: state.hourlyData,
      hourlyForecast: state.hourlyForecast
    }
  });

  useEffect(() => {
    dispatch(getWeather());
  }, [location]);

  useEffect(() => {
    dispatch(displayHourlyData());
  }, [selectedDay]);

  return (
    <div>
      <div className="Location">{location}</div>
      <Autocomplete />
      <div className="WeatherList">
        {(days.slice(0, 5)).map((day) =>
          <div className="IndividualCard" key={day.date} onClick={() => { dispatch(setSelectedDay(day.id)) }}>
            <div className="DayName"> {day.name} </div>
            <div className="DayDate"> {day.date} </div>
            <div className="DayTemp"> {day.temp} </div>
            <div className="DayForecast"> {day.forecast} </div>
            <img src={day.img}></img>
          </div>)}
      </div>
      <HourlyWeatherCard/>
    </div>
  );
}
