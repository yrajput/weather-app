
export const initialState = {
  days: [
    
  ],
  location: 'Boise, Idaho',
}

//actions
export function setDays(data) {
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

export function getWeather() { return async (dispatch, getState) => {
  
  let firstState = getState()
  const loc = firstState.location
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
        dispatch(setDays(response.daily))

      } catch {
        console.log("error");
      }
  } catch {
    console.log("error");
  }
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
            img: 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png',
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

