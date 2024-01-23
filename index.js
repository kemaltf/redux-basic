const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// 4. define action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// 2. declare initial state
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

// 3. declare reducer
const reducer = (state = initialState, action) => {
  // reducer see the action from the store
  // and simply return a new state
  // based on the action
  switch (action.type) {
    case CAKE_ORDERED:
      // when the action is CAKE_ORDERED
      // then simply decrease the number of cakes (return)
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      // when the action is CAKE_RESTOCKED
      // then simply increase the number of cakes
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload, //action.payload allows us to add more than 1 cake
      };
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// 1. create store
// this is where we create our redux store
// the create store method from the redux
// library accepts a parameter the reducer
// function which controls how the state transitions happen
// and this in turn contains the initial state of the application
const store = createStore(reducer);
console.log("Initial State ", store.getState()); // Initial State  { numOfCakes: 10 }

// 4. subscribe to the store
const unsubscribe = store.subscribe(() => {
  // when the state changes, this function will be called
  console.log("Updated State ", store.getState());
});

// 5. dispatch action to the store
// when we dispatch action, the reducer sees the action type is CAKE_ORDERED.
// It will then try to match the switch cases and the reducer function
// we can do this, but there is an alternative way
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(10));

// 5. alternative way
// the first parameter is the action creator object,
// the second argument is what we are going to bind it
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch,
);
// now to dispatch the action we can do like this
actions.orderCake();
actions.restockCake(10);
actions.orderIceCream();
actions.restockIceCream(10);

// 6. unsubscribe
// at the end we simply unsubscribe to any changes in the store
// if you try to dispatch after unsubscribe statement you wont see the log statement
// this is because we have unsubscribe function
unsubscribe();
