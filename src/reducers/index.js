import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import headerReducer from './headerReducer';
import {routerReducer as routing } from 'react-router-redux';
const rootReducer = combineReducers({
  headerReducer,
  homeReducer,
  routing
});

export default rootReducer;
