// frontend/src/features/api/userSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Adjust the import based on your User type definition
import Cookies from 'js-cookie'; // Make sure to install js-cookie if you haven't already

interface UserData {
    user_id: number; // Assuming user_id is a number
    username: string;
    groups_joined: Array<any>; // Adjust the type based on the structure of the group objects
    groups: Array<any>; // Adjust the type based on the structure of the group objects
  }
// Define a service using a base URL and expected endpoints
export const userSlice = createApi({
    reducerPath: 'userSlice',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            // Get the auth token from cookies
            const token = Cookies.get('userToken'); // Replace 'authToken' with your actual cookie name
            if (token) {
                headers.set('Authorization', `token ${token}`); // Set the Authorization header
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query<UserData, void>({
            query: () => `user`,
            // Lifecycle methods
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    // Handle successful fetch
                    console.log('User fetched successfully:', data);
                } catch (error) {
                    // Handle error
                    console.error('Failed to fetch user:', error);
                }
            },
            transformResponse: (response: UserData) => response,
        }),
        getUserGroups: builder.query<UserData, void>({
            query: (group_id) => `user/${group_id}`,
            // Lifecycle methods
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    // Handle successful fetch
                    console.log('User fetched successfully:', data);
                } catch (error) {
                    // Handle error
                    console.error('Failed to fetch user:', error);
                }
            },
            transformResponse: (response: UserData) => response,
        }),
    }),
});

// Export hooks for usage in functional components


export const { useGetUserQuery, useGetUserGroupsQuery } = userSlice;