import { useSelector, useDispatch } from "react-redux";

export default function HourlyWeatherCard() {
  const { hourlyForecast } = useSelector((state) => {
    return {
      hourlyForecast: state.hourlyForecast,
    };
  });

  return (
    <div className="HourContainer">
      <div className="HourCard">
        {hourlyForecast.map((hour) => (
          <div className="IndividualHourCard" key={hour.hour}>
            <div className="hourTime"> {hour.hour} </div>
            <div className="hourTemp"> {hour.hourlyTemp} </div>
            <div className="hourCondition"> {hour.hourlyCondition} </div>
            <img className="HourImage" src={hour.img}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
