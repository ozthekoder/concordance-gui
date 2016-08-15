import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import {routerReducer as routing } from 'react-router-redux';
const rootReducer = combineReducers({
  homeReducer,
  routing
});

export default rootReducer;
