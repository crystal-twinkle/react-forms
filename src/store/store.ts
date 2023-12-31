import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { countriesAPI } from '../services/countriesAPI';
import { countriesReducer } from './reducers/countriesSlice';
import { formReducer } from './reducers/formSlice';

const rootReducer = combineReducers({
  [countriesAPI.reducerPath]: countriesAPI.reducer,
  countries: countriesReducer,
  form: formReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(countriesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
