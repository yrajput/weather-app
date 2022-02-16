import React, { useEffect, useState } from "react";
import "./Weathercard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeather,
  setLocation,
  setDays,
  setSelectedDay,
  setHourly,
  getHourlyWeather,
  getCoords,
} from "./weather";

export default function Weathercard() {
  const dispatch = useDispatch();

  const { days, location, selectedDay, coords } = useSelector((state) => {
    return {
      days: state.days,
      location: state.location,
      selectedDay: state.selectedDay,
      coords: state.coords,
    };
  });
  const [newLocation, setNewLocation] = useState(location);
  const changeLocation = (event) => {
    setNewLocation(event.target.value);
  };

  useEffect(() => {
    dispatch(getWeather());
  }, [coords]);

  useEffect(() => {
    dispatch(getHourlyWeather());
  }, [selectedDay]);

  return (
    <div>
      <div className="Location">{location}</div>
      <input
        type="text"
        name="location"
        value={newLocation}
        onChange={changeLocation}
      />
      <button
        type="button"
        onClick={() => {
          dispatch(setLocation(newLocation));
          dispatch(getCoords());
        }}
      >
        Submit
      </button>
      <div className="WeatherList">
        {days.slice(0, 5).map((day) => (
          <div
            className="IndividualCard"
            key={day.date}
            onClick={() => dispatch(setSelectedDay(day.id))}
          >
            <div className="DayName"> {day.name} </div>
            <div className="DayDate"> {day.date} </div>
            <div className="DayTemp"> {day.temp} </div>
            <div className="DayForecast"> {day.forecast} </div>
            <img src={day.img}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
