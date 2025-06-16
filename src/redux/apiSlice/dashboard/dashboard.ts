import { api } from "@/redux/api/baseApi";

const dashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatics: builder.query({
      query: () => ({
        url: "/dashboard/statistics",
        method: "GET",
      }),
    }),
    getChart: builder.query({
      query: () => ({
        url: "/dashboard/agency",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStaticsQuery, useGetChartQuery } = dashboard;
