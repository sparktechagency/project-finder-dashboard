import { api } from "../api/baseApi";

const subscriptions = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: "/package",
        method: "GET",
      }),
      providesTags: ["subcription"],
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subcription"],
    }),

    updateSubscription: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/package/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subcription"],
    }),
  }),
});
export const {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptions;
