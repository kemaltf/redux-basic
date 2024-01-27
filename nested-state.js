const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const produce = require("immer").produce;

initialState = {
  name: "John",
  address: {
    city: "London",
    country: "UK",
    street: "123 Main St",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };
      // immer works translates the above code into the below
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer, applyMiddleware(logger));
console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() => {
  // console.log("Updated State", store.getState());
});
store.dispatch(updateStreet("456 Main St"));
unsubscribe();
