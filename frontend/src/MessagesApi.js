import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiPath = "/api/v1";
const urlPathMessages = () => [apiPath, "messages"].join("/");

export const messagesApi = createApi({
  reducerPath: "messages",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      headers.set("Authorization", authHeader.Authorization);
      return headers;
    },
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => urlPathMessages(),
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
