import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://147.93.94.210:6005/api/v1",
    baseUrl: "http://10.0.70.188:6005/api/v1",

    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["package"],
  endpoints: () => ({}),
});
// export const imageUrl = "http://147.93.94.210:6005";
export const imageUrl = "http://10.0.70.188:6005";
