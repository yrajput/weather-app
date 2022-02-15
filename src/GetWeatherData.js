import { setDays } from "./weather";
import { useDispatch} from 'react-redux';

export const GetWeatherData = async (location) => {
const dispatch = useDispatch();
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,alert,hourly&units=imperial&appid=1c5699f9ad63ee93400478e17fbacb18'
   return fetch(url).then(
    response =>{ 
            return response.json(); 
        }).then(data =>{ 
                    dispatch(setDays(data));
                })
};