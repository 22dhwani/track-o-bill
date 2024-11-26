import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface TransactionData {
    group_id: number;
    payer_id: number;
    transaction_adder: number;
    users_involved: number[];
    amount_users_own: number[];
    total_amount: number;
    name: string;
}

interface TransactionResponse {
    detail: string;
}

const transactionSlice = createApi({
    reducerPath: 'transactionSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = Cookies.get('userToken');
            if (token) {
                headers.set('Authorization', `token ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Transaction'],
    endpoints: (builder) => ({
        createTransaction: builder.mutation<TransactionResponse, TransactionData>({
            query: (transactionData) => ({
                url: '/add_transaction',
                method: 'POST',
                body: transactionData,
            }),
            transformErrorResponse: (response: { status: number; data: any }) => {
                return {
                    status: response.status,
                    data: response.data
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.error('Transaction error:', error);
                    if (error.error?.data?.detail) {
                        throw new Error(error.error.data.detail);
                    } else {
                        throw new Error('Failed to create transaction');
                    }
                }
            },
            invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
        }),
    }),
});

export const { useCreateTransactionMutation } = transactionSlice;
export default transactionSlice; 