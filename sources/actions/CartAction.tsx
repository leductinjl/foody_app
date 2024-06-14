import CartService from "../services/CartService";
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store'; // Assuming you have a store setup

const Carttypes = {
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

interface CartActionType {
  type: string;
  payload?: any;
}

const addToCart = ({foodId}: {foodId: string}): ThunkAction<void, RootState, unknown, CartActionType> => {
  return (dispatch: Dispatch<CartActionType>) => {
    dispatch({
      type: Carttypes.SET_IS_LOADING,
      payload: true,
    });
    CartService.addToCart({foodId})
      .then(cartResponse => {
        dispatch({
          type: Carttypes.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const removeFromCart = ({foodId}: {foodId: string}): ThunkAction<void, RootState, unknown, CartActionType> => {
  return (dispatch: Dispatch<CartActionType>) => {
    dispatch({
      type: Carttypes.SET_IS_LOADING,
      payload: true,
    });
    CartService.removeFromCart({foodId})
      .then(cartResponse => {
        dispatch({
          type: Carttypes.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getCartItems = (): ThunkAction<void, RootState, unknown, CartActionType> => {
  return (dispatch: Dispatch<CartActionType>) => {
    dispatch({
      type: Carttypes.SET_IS_LOADING,
      payload: true,
    });
    CartService.getCartItems()
      .then(cartResponse => {
        dispatch({
          type: Carttypes.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: Carttypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default { Carttypes, addToCart, removeFromCart, getCartItems };
