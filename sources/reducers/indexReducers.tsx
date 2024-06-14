import { combineReducers } from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import BookmarkReducer from './BookmarkReducer';

const Reducers = combineReducers({
  generalState: GeneralReducer,
  cartState: CartReducer,
  bookmarkState: BookmarkReducer,
});

export type RootState = ReturnType<typeof Reducers>;
export default Reducers;
