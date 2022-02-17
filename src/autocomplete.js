import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from './redux';
import { setLocation, setLongitude, setLatitude } from "./weather";

export default function Autocomplete() {

    const [activeSuggestion, setActiveSuggestion] = useState(undefined);    //used for key presses
    const [receivedSuggestions, setReceivedSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");


    const dispatch = useDispatch()


    useEffect(() => {
        if (userInput !== "") {
            dispatch(getCitySuggestions())
        }

    }, [userInput])

    function getCitySuggestions() {
        try {
            return async (dispatch) => {
                const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + userInput + '.json?types=place&language=en&worldview=us&access_token=pk.eyJ1IjoiaXZhbi1wYW50b2phIiwiYSI6ImNrenB0emU1cDE4Zjcydm1nNXlvMXF4NXkifQ.MrczoaoGDAg8fw4FJK90wA'
                const response = await fetch(url)
                    .then(response => response.json())


                //dispatch(setCitySuggestions(response))
                setReceivedSuggestions(response.features)

            }
        } catch {
            console.log('error in autocomplete, getCitySuggestions');
        }



    }


    function onChange(e) {
        //const{ suggestions} = this.props;
        setUserInput(e.currentTarget.value);


        //setFilteredSuggestions(filteredSuggestions);

        setShowSuggestions(e.currentTarget.value === '' ? false : true);

    }

    function onClick(e, index) {

        setUserInput(e.currentTarget.innerText)

        dispatch(setLocation(e.currentTarget.innerText))
        //console.log(receivedSuggestions)
        //console.log(index)
        dispatch(setLatitude(receivedSuggestions[index].center[1]))
        dispatch(setLongitude(receivedSuggestions[index].center[0]))





    }

    function SuggestionsList() {
        //console.log(showSuggestions);
        if (showSuggestions && userInput) {
            if (receivedSuggestions.length) {
                return ((
                    <ul className="suggestions">
                        {receivedSuggestions.map((suggestion, index) => {

                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={index} onClick={(e) => { onClick(e, index) }}  >
                                    {suggestion.place_name_en}
                                </li>
                            )
                        })}
                    </ul>
                ))
            } else {
                return (
                    <div className="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                )



            }
        }
        return (
            <div>

            </div>
        )
    }

    store.dispatch(getCitySuggestions)

    return (
        <Fragment>
            <input type="text" onChange={onChange} value={userInput} />
            <SuggestionsList />
        </Fragment>
    )
}