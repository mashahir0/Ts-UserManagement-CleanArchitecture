import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearAdmin } from "../../domain/redux/slilce/adminSlice";

interface RefreshResponse {
  accessToken: string;
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
> = async (args, api, extraOptions = {}) => { // ✅ Provide default value for extraOptions
  let result = await baseQueryAdmin(args, api, extraOptions);


  if (
    result?.error?.status === 401 && // If token expired
    (args as FetchArgs).url !== "/refresh-token"
  ) {
    console.log("Refreshing token before retrying request...");

    // Fetch new access token
    const refreshResult = await baseQueryAdmin(
      {
        url: "/refresh-token",
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent
      },
      api,
      extraOptions
    );



    if (refreshResult.data) {
      // ✅ Save the new access token
      const newAccessToken = (refreshResult.data as RefreshResponse).accessToken; // ✅ Corrected property name

      localStorage.setItem("adminToken", newAccessToken);

      // ✅ Ensure `extraOptions` has a `headers` object before using it
      extraOptions = extraOptions || {}; // Ensure `extraOptions` exists
      (extraOptions as Record<string, any>).headers = { 
        ...(extraOptions as Record<string, any>).headers, 
        authorization: `Bearer ${newAccessToken}` 
      };

      // ✅ Retry the original request with new token
      result = await baseQueryAdmin(args, api, extraOptions);
    } else {
      console.log("Refresh token failed, logging out...");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("refreshToken");
      api.dispatch(clearAdmin());
      return refreshResult;
    }
  }

  return result;
};
