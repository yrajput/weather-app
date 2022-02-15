import { useSelector, useDispatch } from "react-redux";

export default function HourlyWeatherCard() {
    const {hourlyForecast} = useSelector((state) => {
        return {
            hourlyForecast: state.hourlyForecast
        }
    })

    return (
        <div>
            <div className="hourcard">
            {hourlyForecast.map((hour) =>
                <div className="IndividualCard" key={hour.hour} >
                <div className="hourTime"> {hour.hour} </div>
                <div className="hourTemp"> {hour.hourlyTemp} </div>
                <div className="hourCondition"> {hour.hourlyCondition} </div>
                </div>)}
            </div>
        </div>
    )
}