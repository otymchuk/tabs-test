import {combineReducers} from 'redux';
import data from './modules/cinema/reducer';
const rootReducer = combineReducers({
    data: data,
});
export default rootReducer;
