import AuthenticationService from '../services/AuthenticationService';
import StorageService from '../services/StorageService';
import UserService from '../services/UserService';
import BookmarkAction from './BookmarkAction';
import CartAction from './CartAction';
import { Dispatch } from 'redux'; // Import Dispatch type from Redux

interface UserData {
  // Define the structure of your user data object
}

const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  SET_USER_DATA: 'SET_USER_DATA',
};

const setIsAppLoading = (isAppLoading: boolean) => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const setToken = (token: string) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: types.SET_FIRST_TIME_USE,
    payload: false,
  };
};

const setUserData = (userData: UserData | null) => ({
  type: types.SET_USER_DATA,
  payload: userData,
});


const appStart = () => {
  return (dispatch: Dispatch<any>, getState: any) => {
    StorageService.getFirstTimeUse().then((isFirstTimeUse: string | null) => {
      const isFirstTime = isFirstTimeUse === null ? true : false;
      dispatch({
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTime,
      });
    });    
    StorageService.getToken().then((token: string | null) => {
      if (token !== null) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
        UserService.getUserData().then((userResponse: any) => {
          if (userResponse?.status) {
            dispatch({
              type: types.SET_USER_DATA,
              payload: userResponse?.data,
            });
            dispatch(CartAction.getCartItems());
            dispatch(BookmarkAction.getBookmarks());
            dispatch({
              type: types.SET_IS_APP_LOADING,
              payload: false,
            });
          } else if (userResponse?.message === 'TokenExpiredError') {
            AuthenticationService.refreshToken().then((tokenResponse: any) => {
              if (tokenResponse?.status) {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: tokenResponse?.data,
                });
                UserService.getUserData().then((userResponse: any) => {
                  if (userResponse?.status) {
                    dispatch({
                      type: types.SET_USER_DATA,
                      payload: userResponse?.data,
                    });
                    dispatch({
                      type: types.SET_IS_APP_LOADING,
                      payload: false,
                    });
                  }
                });
              } else {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: '',
                });
                dispatch({
                  type: types.SET_IS_APP_LOADING,
                  payload: false,
                });
              }
            });
          }
        });
      }
      dispatch({
        type: types.SET_IS_APP_LOADING,
        payload: false,
      });
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  appStart,
  setIsFirstTimeUse,
  setUserData,
  types,
};
