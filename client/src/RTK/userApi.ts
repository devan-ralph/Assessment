import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api` }), // Replace '/api' with your API's base URL
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
		}),
		fetchUser: builder.query({
			query: (id) => `/users/${id}`, // Replace with the correct endpoint to fetch a user
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),
		createUser: builder.mutation({
			query: (credentials) => ({
				url: "/register",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useLoginUserMutation, useCreateUserMutation, useFetchUserQuery, useLogoutUserMutation } = userApi;
