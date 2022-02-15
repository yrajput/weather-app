
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
  console.log("action hit", data)
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

export const getWeather = async (dispatch, getState) => {

  try {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,alert,hourly&units=imperial&appid=8230789c2223488861ff99d985309312'
    const response = await fetch(url)
      .then(response => response.json())
    console.log(response.timezone)
    dispatch(setLocation("response.timezone"))

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
          return {
            name: 'Friday',
            date: day.dt,
            temp: day.temp.day,
            forecast: day.weather.description,
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



