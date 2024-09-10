import {api} from "./api.js";

const USER_TAG = ['User'];
export const userApi = api.enhanceEndpoints({ addTagTypes: USER_TAG }).injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                credentials: "include",
                method: 'GET'
            }),
            providesTags: result => USER_TAG,
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                credentials: "include",
                method: 'GET'
            })
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: "/users",
                credentials: "include",
                method: 'POST',
                body: userData
            }),
            invalidatesTags: USER_TAG
        }),
        updateUser: builder.mutation({
            query: ({updateData, id}) => ({
                url: `/users/${id}`,
                credentials: "include",
                method: 'PUT',
                body: updateData
            }),
            invalidatesTags: USER_TAG
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                credentials: "include",
                method: 'DELETE'
            }),
            invalidatesTags: USER_TAG
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;