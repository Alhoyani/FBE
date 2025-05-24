import { apiSlice } from "@/app/api/apiSlice";

export const templatesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () => ({
        url: '/api/categories/',
        method: 'GET',
      }),
    }),
    getTemplates: builder.query<any[], void>({
      query: () => ({
        url: '/api/templates/',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for the queries
export const { useGetCategoriesQuery, useGetTemplatesQuery } = templatesApiSlice;
