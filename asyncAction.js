const redux = require("redux");
const createStore = redux.createStore;

// 1. state
const initialState = {
  loading: false,
  user: [],
  error: "",
};

//2. action
// declaring the constants for action types
const FETCH_USER_REQUESTED = "FETCH_USER";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

//3. define the action creator (basically just a function that returns an action)
const fetchUserRequested = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUserSucceess = (user) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: user,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

//4. specify our reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const store = createStore(reducer);
