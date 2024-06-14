import BookmarkAction from "../actions/BookmarkAction";

const initialState = {
  bookmarks: [],
  isLoading: false,
};

export default (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case BookmarkAction.types.GET_BOOKMARKS:
      return {...state, bookmarks: action?.payload};
    case BookmarkAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};