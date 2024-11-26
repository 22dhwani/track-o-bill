import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { useGroup } from '../../context/GroupContext';

interface Transaction {
    transaction_id: number;
    name: string;
    payer: string;
    payer_id: number;
    transaction_adder_id: number;
    transaction_adder: string;
    users_involved_id: number[];
    users_involved: string[];
    amount_users_own: number[];
    total_amount: number;
    date: string;
}

interface TransactionData {
    detail: Transaction[];
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
        listAllTransactions: builder.query<TransactionData, number>({
            query: (group_id) => ({
                url: `/list_all_transactions/${group_id}`,
                method: 'GET',
            }),
            transformResponse: (response: TransactionData) => response, 
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.error('Transaction error:', error);
                }
            },
        }),
        deleteTransaction: builder.mutation<TransactionResponse, number>({
            query: (transaction_id) => ({
                url: `/remove_transaction`,
                method: 'POST',
                body: {transaction_id},
            }),
            transformResponse: (response: TransactionResponse) => response,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    window.location.reload();
                } catch (error) {
                    console.error("Error deleting transaction:", error);
                }
            },          
        }),
    }),
    
});

export const { useCreateTransactionMutation, useListAllTransactionsQuery, useDeleteTransactionMutation   } = transactionSlice;
export default transactionSlice; 