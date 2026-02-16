import { apiSlice } from './apiSlice';

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => '/quiz',
      providesTags: ['Quiz'],
    }),
    startQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quiz/${quizId}/start`,
        method: 'POST',
      }),
      invalidatesTags: ['Progress'],
    }),
    submitQuiz: builder.mutation({
      query: (data) => ({
        url: '/quiz/submit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Progress', 'Dashboard', 'Quiz'],
    }),
    getLeaderboard: builder.query({
      query: () => '/quiz/leaderboard',
      providesTags: ['Quiz'],
    }),
  }),
});

export const { 
  useGetQuizzesQuery,
  useStartQuizMutation,
  useSubmitQuizMutation,
  useGetLeaderboardQuery,
} = quizApiSlice;
