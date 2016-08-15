import {SET_CONTENTS} from '../constants/actions';
import initialState from './initialState';
//import immutable from 'immutable';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const handlers = {
  [SET_CONTENTS]: (state, action) => {
    return Object.assign({}, state, { contents: action.payload });
  }
};

export default function homeReducer(state = initialState.homeReducer, action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}
