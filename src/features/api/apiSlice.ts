import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { keycloak } from "../../keycloakConfig";

export const baseUrl = "http://localhost:4000/api/v1";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['Users', 'Airlines', 'TourismAgencies', 'TravelPackages', 'Travel'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: (headers) => {
    //   if (keycloak.token) {
    //     headers.set("Authorization", `Bearer ${keycloak.token}`);
    //   }
    //   return headers;
    // },
  }),
});