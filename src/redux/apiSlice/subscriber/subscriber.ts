import { api } from "@/redux/api/baseApi";

const subscriber = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriber: builder.query({
      query: () => ({
        url: "/dashboard/total-subscriber",
        method: "GET",
      }),
    }),

    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/dashboard/subscriber/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetSubscriberQuery, useDeleteSubscriberMutation } = subscriber;
