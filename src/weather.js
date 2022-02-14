

export const initialState = {
    days: [
      {name: 'Monday', date: 'March 1st, 1:00 pm', temp: '79', forecast: 'cloudy'},
      {name: 'Tuesday', date: 'March 2nd, 1:00 pm',temp: '79', forecast: 'cloudy'},
      {name: 'Wednesday', date: 'March 3rd, 1:00 pm',temp: '79', forecast: 'cloudy'},
      {name: 'Thursday', date: 'March 4th, 1:00 pm',temp: '79', forecast: 'cloudy'},
      {name: 'Friday', date: 'March 5th, 1:00 pm',temp: '79', forecast: 'cloudy'},
    ],
    location: 'Boise, Idaho',
  }

  //actions
  export function setDays(data){
    return {
      type: 'UPDATE_WEATHER',
      payload: data.daily
    }
  }


  //weather reducer 
  export default function reducer (state = initialState , actions){
      switch(actions.type){
          case 'UPDATE_WEATHER':
            return {
              ...state,
              days: [actions.payload]
            }
          default:
            return state
      }
  }



