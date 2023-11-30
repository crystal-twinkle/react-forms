import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { countriesAPI } from "../services/countriesAPI";
import { countriesReducer } from "./reducers/countriesSlice";

const rootReducer = combineReducers({
  [countriesAPI.reducerPath]: countriesAPI.reducer,
  countries: countriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
