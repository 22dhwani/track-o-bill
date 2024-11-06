
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define the type for the transaction data
interface Transaction {
    id: number; // Adjust the type according to your data structure
    amount: number; // Adjust the type according to your data structure
    date: string; // Adjust the type according to your data structure
    // Add other fields as necessary
}

const signupSlice = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getAllTransactions: builder.query<Transaction[], void>({
            query: () => '/list_all_transactions',
        }),
    }),
});

export const { useGetAllTransactionsQuery } = signupSlice;
export default signupSlice