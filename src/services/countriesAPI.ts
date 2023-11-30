import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IResponse {
  name: {
    common: string;
  };
}

export const countriesAPI = createApi({
  reducerPath: "PokemonAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => {
    return {
      getCountries: builder.query<IResponse[], object>({
        query: () => ({
          url: "/all",
        }),
      }),
    };
  },
});

export const { useGetCountriesQuery } = countriesAPI;
