import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define the type for the transaction data
interface UserInfo {
    firstName: string | null; // Allow null since FormData.get can return null
    lastName: string | null;  // Allow null since FormData.get can return null
    username: string | null;   // Allow null since FormData.get can return null
    email: string | null;      // Allow null since FormData.get can return null
    password: string | null;   // Allow null since FormData.get can return null
    terms: boolean | null;     // Assuming terms is a checkbox, it can be true or false
  }
const signupSlice = createApi({
    reducerPath: 'signupApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        signUp: builder.mutation<UserInfo, UserInfo>({
            query: (userInfo) => ({
                url: '/register',
                method: 'POST',
                body: userInfo,
            }),
            // Added error handling
            async onQueryStarted(_, { queryFulfilled }) { // Corrected unused parameter
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('Error during sign up:', error);
                    // Handle error (e.g., show a notification)
                }
            },
        }),
    }),
});

export const { useSignUpMutation } = signupSlice;
export default signupSlice;