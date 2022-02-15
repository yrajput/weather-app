import reducer from "./weather";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


export default createStore(
    reducer, applyMiddleware(thunk)
);