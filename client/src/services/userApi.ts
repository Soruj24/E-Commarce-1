// Import necessary functions from RTK Query and Redux
import { logOut, setCredentials } from '@/features/userSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enhanced baseQuery with reauthorization logic
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.accessToken; // Safely access the token
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);


    // Check for unauthorized or expired token
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        console.log('Access token expired. Attempting to refresh...');

        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
        console.log("refreshToken", refreshToken)
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh-token',
                    method: 'POST',
                    body: { refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult?.data) {
                const { accessToken } = refreshResult.data;


                // Update Redux state with the new access token
                api.dispatch(
                    setCredentials({ accessToken, user: user || api.getState()?.user?.user, })
                );

                // Save the new access token to localStorage
                localStorage.setItem('accessToken', accessToken);

                // Retry the original query
                result = await baseQuery(args, api, extraOptions);
            } else {
                console.error('Failed to refresh token. Logging out...');
                api.dispatch(logOut());
            }
        } else {
            console.error('Refresh token not found. Logging out...');
            api.dispatch(logOut());
        }
    }

    return result;
};

// Define User Interfaces
export interface User {
    id: number;
    name: string;
    email: string;
}

type UsersResponse = User[];

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignInResponse {
    id: number;
    name: string;
    email: string;
    token: string; // JWT or session token
}

// Create the User API
// Updated User API with Logout Endpoint
export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryWithReauth, // Use enhanced baseQuery
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, void>({
            query: () => 'user',
            providesTags: (result) =>
                Array.isArray(result)
                    ? [
                        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }], // Fallback if result is not an array
        }),

        addUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: 'user/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),

        signIn: build.mutation<SignInResponse, SignInCredentials>({
            query: (credentials) => ({
                url: 'auth/logIn',
                method: 'POST',
                body: credentials,
            }),
        }),

        getUser: build.query<User, number>({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),

        updateUser: build.mutation<User, Partial<User>>({
            query: ({ id, ...body }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),

        deleteUser: build.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),

        logout: build.mutation<void, void>({
            queryFn: async (_arg, api, _extraOptions, baseQuery) => {
                try {
                    // Call the backend logout endpoint if necessary
                    const response = await baseQuery({
                        url: 'auth/logOut',
                        method: 'POST',
                    });

                    if (response.error) {
                        throw response.error;
                    }

                    // Clear tokens from localStorage
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');

                    // Dispatch the logOut action to update state
                    api.dispatch(logOut());

                    return { data: undefined };
                } catch (error) {
                    console.error('Logout failed:', error);
                    return { error };
                }
            },
        }),
    }),
});

// Export hooks for the User API endpoints
export const {
    useGetUsersQuery,
    useAddUserMutation,
    useSignInMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useLogoutMutation, // New logout hook
} = userApi;

