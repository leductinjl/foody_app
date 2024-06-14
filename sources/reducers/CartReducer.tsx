import CartAction from "../actions/CartAction";

const initialState = {
  cart: {},
  isLoading: false,
};

export default (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case CartAction.Carttypes.GET_CART_ITEMS:
      return {...state, cart: action?.payload};
    case CartAction.Carttypes.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};