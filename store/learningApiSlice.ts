import { apiSlice } from './apiSlice';

export const learningApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: () => '/chapters',
      providesTags: ['Learning'],
    }),
    getChapterDetails: builder.query({
      query: (id) => `/chapters/${id}`,
      providesTags: ['Learning'],
    }),
    getChapterLessons: builder.query({
      query: (chapterId) => `/lessons/chapter/${chapterId}`,
      providesTags: ['Learning'],
    }),
    getLessonDetail: builder.query({
      query: (id) => `/lessons/${id}`,
      providesTags: ['Learning'],
    }),
  }),
});

export const { 
  useGetChaptersQuery, 
  useGetChapterDetailsQuery,
  useGetChapterLessonsQuery,
  useGetLessonDetailQuery
} = learningApiSlice;
