const redux = require("redux");
const axios = require("axios");
const createStore = redux.createStore;
// import thunk from redux
const thunkMiddleware = require("redux-thunk").default;
// call applyMiddleware from redux
const applyMiddleware = redux.applyMiddleware;

// 1. state
const initialState = {
  loading: false,
  user: [],
  error: "",
};

//2. action
// declaring the constants for action types
const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
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

// define our action creator
const fetchUsers = () => {
  // instead return object we return a function
  return function (dispatch) {
    // this action creator will set the loading to true
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // response data from the user
        const users = res.data.map((user) => user.id);
        dispatch(fetchUserSucceess(users));
      })
      .catch((err) => {
        //err.message;
        dispatch(fetchUserFailed(err.message));
      });
  };
};
// pass thunkMiddleware as middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
