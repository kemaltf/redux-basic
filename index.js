const redux = require("redux");

const CAKE_ORDERED = "CAKE_ORDERED";

// 4. define action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

const createStore = redux.createStore;

// 2. declare initial state
const initialState = {
  numOfCakes: 10,
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
const subscribe = store.subscribe(() => {
  // when the state changes, this function will be called
  console.log("Updated State ", store.getState());
});

// 5. dispatch action to the store
// when we dispatch action, the reducer sees the action type is CAKE_ORDERED.
// It will then try to match the switch cases and the reducer function
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// 6. unsubscribe
// at the end we simply unsubscribe to any changes in the store
// if you try to dispatch after unsubscribe statement you wont see the log statement
// this is because we have unsubscribe function
unsubscribe();
