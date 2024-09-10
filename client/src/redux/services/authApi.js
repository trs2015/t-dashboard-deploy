import {api} from "./api.js";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (userData) => ({
                url: '/auth/signin',
                credentials: "include",
                method: 'POST',
                body: userData
            })
        }),
        signUp: builder.mutation({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData
            })
        }),
        signOut: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                credentials: "include",
                method: 'POST'
            })
        }),
    })
})

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;