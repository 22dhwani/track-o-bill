
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const groupSlice = createApi({
    reducerPath: 'groupSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getGroups: builder.query<unknown, void>({
            query: () => '/groups',
        }),
    }),
});

export const { useGetGroupsQuery } = groupSlice;
export default groupSlice;