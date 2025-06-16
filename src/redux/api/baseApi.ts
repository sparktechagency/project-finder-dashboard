import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://10.0.70.188:6005/api/v1",
    baseUrl: "http://147.93.94.210:6005/api/v1",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["package"],
  endpoints: () => ({}),
});
export const imageUrl = "http://147.93.94.210:6005";
