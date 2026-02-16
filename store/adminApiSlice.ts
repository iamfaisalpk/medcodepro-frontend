import { apiSlice } from './apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User Management
    getAllUsers: builder.query({
      query: () => '/auth/users',
      providesTags: ['User'],
    }),
    
    // Chapter Management
    getAdminChapters: builder.query({
      query: () => '/chapters',
      providesTags: ['Learning'],
    }),
    createChapter: builder.mutation({
      query: (data) => ({
        url: '/admin/chapters',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Learning'],
    }),
    updateChapter: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/chapters/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Learning', 'Progress'],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/admin/chapters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Learning'],
    }),

    // Lesson Management
    createLesson: builder.mutation({
      query: (data) => ({
        url: '/admin/lessons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Learning'],
    }),

    // Quiz & Question Management
    getAdminQuizAnalytics: builder.query({
      query: () => '/quiz/analytics/overview',
      providesTags: ['Quiz'],
    }),
    getAdminQuizzes: builder.query({
      query: () => '/quiz',
      providesTags: ['Quiz'],
    }),
    getAdminQuestions: builder.query({
      query: (quizId) => quizId ? `/quiz/${quizId}/questions` : '/quiz/questions/all', // Need this on backend
      providesTags: ['Quiz'],
    }),
    getAllAttempts: builder.query({
      query: (params) => ({
        url: '/quiz/attempts/all',
        params
      }),
      providesTags: ['Progress'],
    }),
    createQuiz: builder.mutation({
      query: (data) => ({
        url: '/quiz/create-quiz',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/quiz/quiz/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/quiz/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: '/quiz/create-question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/quiz/question/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/quiz/question/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
    bulkUploadQuestions: builder.mutation({
      query: (formData) => ({
        url: '/quiz/bulk-upload',
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let the browser set it with boundary for multipart/form-data
        formData: true,
      }),
      invalidatesTags: ['Quiz'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAdminChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useCreateLessonMutation,
  useGetAdminQuizAnalyticsQuery,
  useGetAdminQuizzesQuery,
  useGetAdminQuestionsQuery,
  useGetAllAttemptsQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useBulkUploadQuestionsMutation,
} = adminApiSlice;
