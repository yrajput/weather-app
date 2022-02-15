
export const initialState = {
  days: [
    { name: 'Monday', date: 'March 1st, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Tuesday', date: 'March 2nd, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Wednesday', date: 'March 3rd, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Thursday', date: 'March 4th, 1:00 pm', temp: '79', forecast: 'cloudy' },
    { name: 'Friday', date: 'March 5th, 1:00 pm', temp: '79', forecast: 'cloudy' },
  ],
  location: 'Boise, Idaho',
  selectedDay: 0,
  hourlyForecast: [ 
    { hour: '', hourlyTemp: '', hourlyCondition: '' }
  ]
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

export function getHourlyWeather() {return async (dispatch) => {
  try {
      //console.log("in hourly Call")
      const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=current,minutely,alert&units=imperial&appid=8230789c2223488861ff99d985309312'
      const response = await fetch(url)
        .then(response => response.json())
      //dispatch(setDays(response.daily))
      dispatch(setHourly(response.hourly))
      console.log("after dispatch hourly")
    } catch {
      console.log("error for hourly");
    }
  }
}

export const getWeather = async (dispatch) => {
  try {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=current,minutely,alert&units=imperial&appid=8230789c2223488861ff99d985309312'
    const response = await fetch(url)
      .then(response => response.json())
    dispatch(setDays(response.daily))
    //dispatch(setHourly(response.hourly))
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
        days: actions.payload.map((day, index) => {
          let date = (new Date(day.dt*1000))
          return {
            name: date.toLocaleString("en-US", {weekday: "long"}),
            date: date.toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
            temp: day.temp.day + '\xB0F',
            forecast: day.weather[0].description,
            id: index
          }
        })
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: actions.payload
      }
    case 'UPDATE_HOURLY':
      const startingIndex = state.selectedDay * 23
      console.log("starting index", startingIndex)
      const hourlyArray = actions.payload.slice(startingIndex, startingIndex+24)
      console.log(actions.payload)
      return {
        ...state,
        hourlyForecast: hourlyArray.map((hour, index) => {
          return {
            hour: index,
            hourlyTemp: hour.temp + '\xB0F',
            hourlyCondition: hour.weather[0].description,
          }
        })
      }
    case 'UPDATE_SELECTED_DAY':
      console.log("In updated Selected day")
      return {
        ...state,
        selectedDay: actions.payload,
      }
    default:
      return state
  }
}



