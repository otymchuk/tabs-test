import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
// import DevTools from '../containers/DevTools.js';

const store = compose(
    applyMiddleware(thunkMiddleware),
    // DevTools.instrument()
)(createStore)(rootReducer);


export default store

