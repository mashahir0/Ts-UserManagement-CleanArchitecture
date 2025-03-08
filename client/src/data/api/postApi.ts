import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addPost: builder.mutation<{ message: string }, { text: string }>({
        query: (newPost) => ({
          url: "/post/add-post",
          method: "POST",
          body: newPost,
        }),
      }),
  }),
});

export const {
  useAddPostMutation
} = postApi;
