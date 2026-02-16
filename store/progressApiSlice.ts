import { apiSlice } from './apiSlice';

export const progressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    completeLesson: builder.mutation({
      query: (lessonId) => ({
        url: '/progress/complete',
        method: 'POST',
        body: { lessonId },
      }),
      invalidatesTags: ['Progress', 'Dashboard', 'Learning'],
    }),
    getUserProgress: builder.query({
      query: () => '/progress',
      providesTags: ['Progress'],
    }),
  }),
});

export const { 
  useCompleteLessonMutation, 
  useGetUserProgressQuery 
} = progressApiSlice;
