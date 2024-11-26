import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const logoutSlice = createApi({
    reducerPath: 'logoutSlice',
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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { queryFulfilled }) { // Corrected unused parameter
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('Error during logout:', error);
                }
            },
        }),
    }),
});

export const { useLogoutMutation } = logoutSlice;
export default logoutSlice;