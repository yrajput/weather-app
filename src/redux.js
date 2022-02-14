import reducer from "./weather";
import {createStore} from 'redux'

export default createStore(
    reducer
);