import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// Define the API slice
const settleUpSlice = createApi({
    reducerPath: 'settleUpSlice',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000`, prepareHeaders: (headers) => {
        const token = Cookies.get('userToken');
        if (token) {
            headers.set('Authorization', `token ${token}`);
        }
        return headers;
    } }), // Adjust base URL as needed
    endpoints: (builder) => ({
        getSettleUpData: builder.query({
            query: (group_id) => `/settle_up/${group_id}`,
            // Optional: Add additional options for error handling
            transformResponse: (response: any) => response, // Adjust response transformation if needed
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('Error during settle up:', error);
                }
            },
        }),
    }),
});

// Export the auto-generated hook for the query
export const { useGetSettleUpDataQuery } = settleUpSlice;

// Export the reducer to be included in the store
export default settleUpSlice;

