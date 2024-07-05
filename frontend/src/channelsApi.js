import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiPath = "/api/v1";
const urlPathChannel = () => [apiPath, "channels"].join("/");

export const channelsApi = createApi({
  reducerPath: "channels",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      headers.set("Authorization", authHeader.Authorization);
      return headers;
    },
  }),
  tagTypes: ["Channel"],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => urlPathChannel(),
      providesTags: ["Channel"],
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
