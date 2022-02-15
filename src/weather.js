
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
  console.log("Changing data")
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
  
  const firstState = getState()
  const loc = firstState.location
  console.log(firstState)
  try {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid=8230789c2223488861ff99d985309312'
    const data = await fetch(url)
      .then(response => response.json())
    const lat = data.coord.lat
    const long = data.coord.lon
      try {
        const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=current,minutely,alert,hourly&units=imperial&appid=8230789c2223488861ff99d985309312'
        const response = await fetch(url)
          .then(response => response.json())
          console.log(response)
        dispatch(setDays(response.daily))

      } catch {
        console.log("error");
      }
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
            name: new Date(day.dt * 1000).toLocaleString("en-US", {weekday: "long"}),
            date: new Date(day.dt * 1000).toDateString(),
            temp: day.temp.day,
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

