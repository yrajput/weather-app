import React, { useEffect} from 'react'
import './Weathercard.css';
import { useDispatch, useSelector} from 'react-redux'
import { GetWeatherData } from './GetWeatherData';
import { getWeather, setLocation, setDays } from './weather';



export default function Weathercard () {

  const dispatch = useDispatch();

  const {days, location} = useSelector((state) => {
    return{
      days: state.days ,
      location: state.location , 
    }
  })
  useEffect(()=>{
    const data = getWeather();
    console.log("after getWeather call: data", setTimeout(data/*.then(result=> result.data)*/, 5000))

    dispatch((setDays(data)))
    //dispatch(setLocation('Chicago'))
  },[])
  return (
    <div>
      <div className="Location">{location}</div>
      <div className="WeatherList">
        {days.map((day) =>
          <div className="IndividualCard" key={day.name}>
            <div className="DayName"> {day.name} </div>
            <div className="DayDate"> {day.date} </div>
            <div className="DayTemp"> {day.temp} </div>
            <div className="DayForecast"> {day.forecast} </div>
            </div>)}
      </div>
    </div>
  )
}


