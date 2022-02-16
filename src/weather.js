
export const initialState = {
  days: [ ],
  location: 'Boise, Idaho',
  selectedDay: undefined,
  hourlyForecast: [ ],
  coords: {
    lat: 43.6135,
    long: -116.2035,
  }

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

export function setHourly(data) {
  return {
    type: 'UPDATE_HOURLY',
    payload: data
  }
}

export function setSelectedDay(day) {
  return {
    type: 'UPDATE_SELECTED_DAY',
    payload: day,
  }
}

export function setLatLon(lat, lon) {
  return {
    type: 'UPDATE_LAT_LON',
    payload: {lat: lat, lon: lon},
  }
}

export function getCoords() { return async(dispatch, getState) => {
    let firstState = getState()
    const loc = firstState.location
    try {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid=8230789c2223488861ff99d985309312'
      const data = await fetch(url)
        .then(response => response.json())
      const lat = data.coord.lat
      const long = data.coord.lon
      dispatch(setLatLon(lat, long))
    } catch {
      console.log("coords error")
    }
  }
}

export function getHourlyWeather() {return async (dispatch, getState) => {
  let firstState = getState()
    try {
        const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+firstState.coords.lat+'&lon='+firstState.coords.long+'&exclude=current,minutely,alert&units=imperial&appid=8230789c2223488861ff99d985309312'
        const response = await fetch(url)
          .then(response => response.json())
        dispatch(setHourly(response.hourly))
      } catch {
        console.log("error for hourly");
      }
  }
}


export function getWeather() { return async (dispatch, getState) => {
  let firstState = getState()
    try {
      const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+firstState.coords.lat+'&lon='+firstState.coords.long+'&exclude=current,minutely,alert,hourly&units=imperial&appid=8230789c2223488861ff99d985309312'
      const response = await fetch(url)
        .then(response => response.json())
      dispatch(setDays(response.daily))
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
        days: actions.payload.map((day, index) => {
          let date = (new Date(day.dt*1000))
          return {
            name: date.toLocaleString("en-US", {weekday: "long"}),
            date: date.toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
            temp: day.temp.day,
            forecast: day.weather[0].description,
            id: index,
            img: 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png',
          }
        }),
        selectedDay: undefined,
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: actions.payload
      }
    case 'UPDATE_HOURLY':
      const startingIndex = state.selectedDay * 24
      const hourlyData = actions.payload.slice(startingIndex, startingIndex+24) 
      return {
        ...state,
        hourlyForecast: hourlyData.map((hour) => {
          let time = (new Date(hour.dt*1000))
          return {
            hour: time.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit'}),
            hourlyTemp: hour.temp + '\xB0F',
            hourlyCondition: hour.weather[0].description,
            img: 'http://openweathermap.org/img/wn/' + hour.weather[0].icon + '@2x.png',
          }
        })
      }
    case 'UPDATE_SELECTED_DAY':
      if (state.selectedDay === actions.payload) {
        return {
          ...state,
          selectedDay: undefined
        }
      } else {
        return {
          ...state,
          selectedDay: actions.payload,
        }
      }
    case 'UPDATE_LAT_LON':
      return {
        ...state,
        coords: {
          lat: actions.payload.lat,
          long: actions.payload.lon,
        }
      }
    default:
      return state
  }
}

