// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/user', credentials: 'include' }), 
//   endpoints: (builder) => ({
//     register: builder.mutation<any, { name: string, email: string, password: string }>({
//       query: (user) => ({
//         url: '/register',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     login: builder.mutation<any, { email: string, password: string }>({
//       query: (credentials) => ({
//         url: '/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     getUsers: builder.query<any, void>({
//       query: () => ({
//         url: '/admin/users',
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }),
//     }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation, useGetUsersQuery } = userApi;


import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
  reducerPath:'userApi',
  baseQuery:baseQueryWithReauth,
  endpoints:(builder) => ({
    register: builder.mutation<any, { name: string, email: string, password: string }>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    
    login: builder.mutation<any, { email: string, password: string }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation<any, { token: string }>({
      query: (googleData) => ({
        url: "/auth/google",
        method: "POST",
        body: googleData,
      }),
    }),

  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  
} = userApi