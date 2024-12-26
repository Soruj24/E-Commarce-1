import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the Category interface
export interface Category {
    id: number;
    name: string;
}

type CategoriesResponse = Category[];

// Create the API service
export const categoryApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['Categories'],
    endpoints: (build) => ({
        // Get all categories
        getCategories: build.query<CategoriesResponse, void>({
            query: () => 'categories',
            providesTags: (result) =>
                Array.isArray(result)
                    ? [
                        ...result.map(({ id }) => ({ type: 'Categories', id } as const)),
                        { type: 'Categories', id: 'LIST' },
                    ]
                    : [{ type: 'Categories', id: 'LIST' }],
        }),
        // Add a new category
        addCategory: build.mutation<Category, Partial<Category>>({
            query(body) {
                return {
                    url: `categories`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
        }),
        // Get a specific category by ID
        getCategory: build.query<Category, number>({
            query: (id) => `category/${id}`,
            providesTags: (result, error, id) => [{ type: 'Categories', id }],
        }),
        // Update a category by ID
        updateCategory: build.mutation<Category, Partial<Category>>({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `category/${id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Categories', id }],
        }),
        // Delete a category by ID
        deleteCategory: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `category/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (result, error, id) => [{ type: 'Categories', id }],
        }),
    }),
});

// Export hooks for the API
export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
