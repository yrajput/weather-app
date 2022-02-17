export const initialState = {

  days: [

  ],
  location: 'Boise, Idaho',
  selectedDay: undefined,
  hourlyForecast: [
    { hour: '', hourlyTemp: '', hourlyCondition: '' }
  ],
  lat: 43.6150,
  long: -116.2023
}


//actions
export function setDays(data) {
  return {
    type: "UPDATE_WEATHER",
    payload: data,
  };
}

export function setLocation(location) {
  return {
    type: "UPDATE_LOCATION",
    payload: location,
  };
}

export function setLatitude(latitude) {
  return {
    type: 'UPDATE_LATITUDE',
    payload: latitude
  }
}

export function setLongitude(longitude) {
  return {
    type: 'UPDATE_LONGITUDE',
    payload: longitude
  }
}

export function setHourly(data) {
  return {
    type: "UPDATE_HOURLY",
    payload: data,
  };
}

export function setSelectedDay(day) {
  return {
    type: "UPDATE_SELECTED_DAY",
    payload: day,
  };
}


export function setCitySuggestions(data) {
  return {
    type: 'UPDATE_CITY_SUGGESTIONS',
    payload: data
  }
}


export function getHourlyWeather() {
  return async (dispatch, getState) => {
    let firstState = getState()
    try {
      const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + firstState.lat + '&lon=' + firstState.long + '&exclude=current,minutely,alert&units=imperial&appid=1a13d17aac6980fdbd320530b0d4ab6a'
      const response = await fetch(url)
        .then(response => response.json())
      dispatch(setHourly(response.hourly))
    } catch {
      console.log("hourly error");
    }
  };
}



export function getWeather() {
  return async (dispatch, getState) => {

    let firstState = getState()
    const lat = firstState.lat
    const long = firstState.long
    try {
      const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=current,minutely,alert&units=imperial&appid=1a13d17aac6980fdbd320530b0d4ab6a'
      const response = await fetch(url)
        .then(response => response.json())
      dispatch(setDays(response.daily))
      dispatch(setHourly(response.hourly))
    } catch {
      console.log("error");
    }
  }

}

//weather reducer 

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case "UPDATE_WEATHER":
      return {
        ...state,
        days: actions.payload.map((day, index) => {

          let date = (new Date(day.dt * 1000))
          return {
            name: date.toLocaleString("en-US", { weekday: "long" }),
            date: date.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
            temp: Math.round(day.temp.day) + '\xB0F',
            forecast: day.weather[0].description,
            id: index,
            img: 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png',
          }
        }),
        selectedDay: undefined
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: actions.payload
      }
    case 'UPDATE_HOURLY':
      const startingIndex = state.selectedDay * 24
      const hourlyArray = actions.payload.slice(startingIndex, startingIndex + 24)
      return {
        ...state,
        hourlyForecast: hourlyArray.map((hour) => {
          let time = new Date(hour.dt * 1000);
          return {

            hour: time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            hourlyTemp: Math.round(hour.temp) + "\xB0F",
            hourlyCondition: hour.weather[0].description,
            img:
              "http://openweathermap.org/img/wn/" +
              hour.weather[0].icon +
              "@2x.png",
          };
        }),
      };
    case "UPDATE_SELECTED_DAY":
      if (state.selectedDay === actions.payload) {
        return {
          ...state,
          selectedDay: undefined,
        };
      } else {
        return {
          ...state,
          selectedDay: actions.payload,
        };
      }

    case 'UPDATE_SELECTED_DAY':
      return {
        ...state,
        selectedDay: actions.payload,
      }
    case 'UPDATE_LATITUDE':
      return {
        ...state,
        lat: actions.payload,
      }

    case 'UPDATE_LONGITUDE':
      return {
        ...state,
        long: actions.payload,
      }
    default:
      return state;
  }
}
