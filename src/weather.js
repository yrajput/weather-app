
export const initialState = {
  days: [
    { name: 'Monday', date: 'March 1st, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Tuesday', date: 'March 2nd, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Wednesday', date: 'March 3rd, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Thursday', date: 'March 4th, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Friday', date: 'March 5th, 1:00 pm', temp: '79', forecast: 'cloudy' },
  ],
  location: 'Boise, Idaho',
}

//actions
export function setDays(data) {
  data.splice(5);
  return {
    type: 'UPDATE_WEATHER',
    payload: data
  }
}

export function setLocation(location) {
  return {
    type: 'UPDATE_LOCATION',
    payload: location
  }
}

export const getWeather = async (dispatch) => {
  try {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=current,minutely,alert,hourly&units=imperial&appid=8230789c2223488861ff99d985309312'
    const response = await fetch(url)
      .then(response => response.json())
    console.log(response.city)
    dispatch(setDays(response.daily))
  } catch {
    console.log("error");
  }
}


//weather reducer 
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case 'UPDATE_WEATHER':
      return {
        ...state,
        days: actions.payload.map((day) => {
          let date = (new Date(day.dt*1000))
          return {
            name: date.toLocaleString("en-US", {weekday: "long"}),
            date: date.toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
            temp: day.temp.day + '\xB0F',
            forecast: day.weather[0].description,
          }
        })
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: actions.payload
      }
    default:
      return state
  }
}



