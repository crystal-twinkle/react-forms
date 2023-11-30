import { createSlice } from "@reduxjs/toolkit";
import { countriesAPI, IResponse } from "../../services/countriesAPI";

interface ISomeState {
  countries: IResponse[];
  loading: boolean;
  error: boolean;
}

const initialState: ISomeState = {
  countries: [],
  loading: true,
  error: false,
};

export const countriesSlice = createSlice({
  name: "different",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      countriesAPI.endpoints.getCountries.matchPending,
      (state) => {
        state.countries = [];
        state.loading = true;
      },
    );
    builder.addMatcher(
      countriesAPI.endpoints.getCountries.matchFulfilled,
      (state, action) => {
        state.countries = action.payload;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addMatcher(
      countriesAPI.endpoints.getCountries.matchRejected,
      (state) => {
        state.countries = [];
        state.loading = false;
        state.error = true;
      },
    );
  },
});

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
