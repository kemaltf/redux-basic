const redux = require("redux");

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
      return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});
store.dispatch(updateStreet("456 Main St"));
unsubscribe();
