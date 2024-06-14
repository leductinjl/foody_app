import { configureStore } from '@reduxjs/toolkit';
import Reducers from './reducers/indexReducers';

const Store = configureStore({
  reducer: Reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof Store.getState>;

// Define the AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof Store.dispatch;

// Selector to get the token from the state
const getToken = () => Store?.getState()?.generalState?.token;

export { Store, getToken };
