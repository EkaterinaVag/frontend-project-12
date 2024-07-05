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
    baseUrl: urlPathMessages(),
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      headers.set("Authorization", authHeader.Authorization);
      return headers;
    },
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ["Message"],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: "POST",
        body: message,
        invalidatesTags: ["Message"],
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
