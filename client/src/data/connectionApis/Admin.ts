import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearUser } from "../../domain/redux/slilce/userSlice";
import { clearAdmin } from "../../domain/redux/slilce/adminSlice";

interface RefreshResponse {
  access_token: string;
}

const baseQueryAdmin = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/admin",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAdminReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryAdmin(args, api, extraOptions);

  // Check for 401 status and avoid infinite loop for refresh token endpoint
  if (
    result?.error?.status === 401 &&
    (args as FetchArgs).url !== "/refresh-token"
  ) {
    console.log("Refreshing token for sending request...");

    // Call refresh token endpoint
    const refreshResult = await baseQueryAdmin(
      "/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Save the new access token and retry the original request
      const newAccessToken = (refreshResult.data as RefreshResponse)
        .access_token;
      localStorage.setItem("adminToken", newAccessToken);
      result = await baseQueryAdmin(args, api, extraOptions);
    } else {
      // If refresh fails, remove token and clear user state
      localStorage.removeItem("adminToken");
        api.dispatch(clearAdmin());
      return refreshResult;
    }
  }

  return result;
};
