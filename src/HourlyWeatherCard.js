import { useSelector, useDispatch } from "react-redux";

export default function HourlyWeatherCard() {
    const {hourlyForecast} = useSelector((state) => {
        return {
            hourlyForecast: state.hourlyForecast
        }
    })

    return (
        <div>
            <div className="HourCard">
                <h2>Hourly Forecast</h2>
            {hourlyForecast.map((hour) =>
                <div className="IndividualHourCard" key={hour.hour} >
                    <div className="hourTime"> {hour.hour} </div>
                    <div className="hourTemp"> {hour.hourlyTemp} </div>
                    <div className="hourCondition"> {hour.hourlyCondition} </div>
                    <img className="hourImg" src= {hour.img} ></img>
                </div>)}
            </div>
        </div>
    )
}