import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userSlice } from './userSlice';
import Cookies from 'js-cookie';

interface GroupData {
    group_name: string;
}
interface MemberData {
    email_id: string;
    group_id: number;
}
const groupSlice = createApi({
    reducerPath: 'groupSlice',
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
    tagTypes: ['Group'],
    endpoints: (builder) => ({
    createGroup: builder.mutation<GroupData, GroupData>({
        query: (groupData) => ({
            url: '/create_group',
            method: 'POST',
            body: groupData,
        }),
        transformResponse: (response: GroupData) => response,
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                await queryFulfilled;
                dispatch(userSlice.util.invalidateTags(['User']));
            } catch (error) {
                console.error('Failed to create group:', error);
            }
        },
        
        invalidatesTags: [{ type: 'Group', id: 'LIST' }], // Adjust the type and id as necessary

    }),
    joinGroup: builder.mutation<MemberData, MemberData>({
        query: (memberData) => ({
            url: '/join_group',
            method: 'POST',
            body: memberData,
        }),
        transformResponse: (response: MemberData) => response,
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                await queryFulfilled;
                dispatch(userSlice.util.invalidateTags(['User']));
            } catch (error) {
                console.error('Failed to join group:', error);
            }
        },
        
        invalidatesTags: [{ type: 'Group', id: 'LIST' }], // Adjust the type and id as necessary

    }),
    }),
});

export const { useCreateGroupMutation, useJoinGroupMutation } = groupSlice;
export default groupSlice;