import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearUser } from "../../domain/redux/slilce/userSlice";

interface RefreshResponse {
  access_token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/user",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 status and avoid infinite loop for refresh token endpoint
  if (
    result?.error?.status === 401 &&
    (args as FetchArgs).url !== "/refresh-token"
  ) {
    console.log("Refreshing token for sending request...");

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      "/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Save the new access token and retry the original request
      const newAccessToken = (refreshResult.data as RefreshResponse)
        .access_token;
      localStorage.setItem("userToken", newAccessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, remove token and clear user state
      localStorage.removeItem("userToken");
        api.dispatch(clearUser());
      return refreshResult;
    }
  }

  return result;
};
