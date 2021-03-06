export const initialState = {
  days: [],
  location: "",
  selectedDay: undefined,
  hourlyForecast: [],
  lat: undefined,
  long: undefined,
  hourlyData: undefined,
};

//actions
export function setWeather(data) {
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
    type: "UPDATE_LATITUDE",
    payload: latitude,
  };
}

export function setLongitude(longitude) {
  console.log("action", longitude)
  return {
    type: "UPDATE_LONGITUDE",
    payload: longitude,
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
    type: "UPDATE_CITY_SUGGESTIONS",
    payload: data,
  };
}


export function displayHourlyData() {
  return {
    type: "DISPLAY_HOURLY_DATA",
  };
}


export const getLocation = () => {
  return new Promise((resolve, dispatch) =>
    window.navigator.geolocation.getCurrentPosition(
      (loc) => {resolve(loc);
    
      dispatch(setLatitude(loc.coords.latitude));
      dispatch(setLongitude(loc.coords.longitude));
      console.log(loc.coords.latitude) },
        (err) => resolve(undefined)
        )
      );
    };



export function getWeather() {
  return async (dispatch, getState) => {
    let url = "";
    let state = getState();
    if (!state.lat && !state.long) {
      const l = await getLocation();
      url =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        l.coords.latitude +
        "&lon=" +
        l.coords.longitude +
        "&exclude=current,minutely,alert&units=imperial&appid=1c5699f9ad63ee93400478e17fbacb18";
    } else {
      url =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      state.lat +
      "&lon=" +
      state.long +
      "&exclude=current,minutely,alert&units=imperial&appid=1c5699f9ad63ee93400478e17fbacb18";
    }
    state = getState();
    try {
      console.log("state long", state.long)
      const response = await fetch(url).then((response) => response.json());
      dispatch(setWeather(response));
      console.log("called api");
    } catch {
      console.log("error");
    }
  };
}

//weather reducer


export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case "UPDATE_WEATHER":
      //Object to return to state
      return {
        ...state,
        days: actions.payload.daily.map((day, index) => {
          let date = new Date(day.dt * 1000);
          return {
            name: date.toLocaleString("en-US", { weekday: "long" }),
            date: date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            temp: Math.round(day.temp.day) + "\xB0F",
            forecast: day.weather[0].description,
            id: index,
            img: 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png',
          }
        }),
        selectedDay: undefined,
        hourlyData: actions.payload.hourly,
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: actions.payload
      }
    case "UPDATE_LOCATION":
      return {
        ...state,
        location: actions.payload,
      };
    case "DISPLAY_HOURLY_DATA":
      const startingIndex = state.selectedDay * 24;
      if (state.hourlyData !== undefined) {
        const hourlyArray = state.hourlyData.slice(startingIndex, startingIndex + 24);
        return {
          ...state,
          hourlyForecast: hourlyArray.map((hour) => {
            let time = new Date(hour.dt * 1000);
            return {
              hour: time.toLocaleTimeString("en-US", {
                hour: "numeric",
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
      } else {
        return {
          ...state,
        };
      }
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
    case 'UPDATE_LATITUDE':

      return {
        ...state,
        lat: actions.payload,
      };

    case "UPDATE_LONGITUDE":
      return {
        ...state,
        long: actions.payload,
      };
    default:
      return state;
  }
}
