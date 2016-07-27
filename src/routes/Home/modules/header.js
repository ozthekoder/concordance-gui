// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD = 'UPLOAD';

// ------------------------------------
// Actions
// ------------------------------------
export function upload (file) {
  return {
    type: UPLOAD,
    payload: file
  };
}

export const actions = {
  upload
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD]: (state, action) => {
    console.log(state);
    console.log(action);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  file: null
};

export default function headerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
