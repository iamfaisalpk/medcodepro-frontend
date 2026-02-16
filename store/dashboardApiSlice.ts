import { apiSlice } from './apiSlice';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => '/dashboard/overview',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetStatsQuery } = dashboardApiSlice;
