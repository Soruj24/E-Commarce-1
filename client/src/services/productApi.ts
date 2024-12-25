import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    name: string;
    category?: string; // Add other relevant fields if needed
    price?: number;
}

interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
}

interface ProductsQueryParams {
    search?: string;
    page?: number;
    limit?: number;
    filterBy?: string; // Example: category
    sortBy?: string; // Example: price
}

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, ProductsQueryParams>({
            query: ({ search, page = 1, limit = 10, filterBy, sortBy }) => {
                const params = new URLSearchParams();

                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (filterBy) params.append('filterBy', filterBy);
                if (sortBy) params.append('sortBy', sortBy);

                return `products?${params.toString()}`;
            },
            providesTags: (result) =>
                result && Array.isArray(result.products)
                    ? [
                        ...result.products.map(({ id }) => ({ type: 'Products', id }) as const),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation<Product, Partial<Product>>({
            query(body) {
                return {
                    url: `product`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        getProduct: build.query<Product, number>({
            query: (id) => `product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        updateProduct: build.mutation<Product, Partial<Product>>({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `product/${id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
        }),
        deleteProduct: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `product/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
