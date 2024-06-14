import { BookmarkService } from "../services/indexServices";
import { Dispatch } from "redux";


const types = {
  GET_BOOKMARKS: 'GET_BOOKMARKS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const addBookmark = ({ restaurantId }: { restaurantId: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.addBookmark({restaurantId})
      .then((bookmarkResponse: { status: boolean; message: string; data?: any; }) => {
        dispatch({
            type: types.GET_BOOKMARKS,
            payload: bookmarkResponse.data ? bookmarkResponse.data : null,
        });
        dispatch({
            type: types.SET_IS_LOADING,
            payload: false,
        });
    })  
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const removeBookmark = ({ restaurantId }: { restaurantId: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.removeBookmark({restaurantId})
      .then((bookmarkResponse: { status: boolean; message: string; data?: any; }) => {
        dispatch({
            type: types.GET_BOOKMARKS,
            payload: bookmarkResponse.data ? bookmarkResponse.data : null,
        });
        dispatch({
            type: types.SET_IS_LOADING,
            payload: false,
        });
      })
  
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getBookmarks = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.getBookmarks()
      .then((bookmarkResponse: { status: boolean; message: string; data?: any; }) => {
        dispatch({
            type: types.GET_BOOKMARKS,
            payload: bookmarkResponse.data ? bookmarkResponse.data : null,
        });
        dispatch({
            type: types.SET_IS_LOADING,
            payload: false,
        });
      })
  
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default {types, addBookmark, removeBookmark, getBookmarks};