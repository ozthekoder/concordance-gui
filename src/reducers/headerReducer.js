import {SET_FILE} from '../constants/actions';
import initialState from './initialState';
//import immutable from 'immutable';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const handlers = {
  [SET_FILE]: (state, action) => {
  const { file } = action.payload;
    return Object.assign({}, state, { file });
  }
};

export default function headerReducer(state = initialState.headerReducer, action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}
