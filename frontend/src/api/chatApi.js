import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      headers.set("Authorization", authHeader.Authorization);
      return headers;
    },
  }),
  tagTypes: ["Channel", "Message"],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => "channels",
      providesTags: ["Channel"],
    }),
    getMessages: builder.query({
      query: () => "messages",
      providesTags: ["Message"],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "messages",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

const socket = io("http://localhost:3001");
const handleNewMessage = (payload) => chatApi.endpoints.getMessage.invalidate();

export const setupSocket = () => {
  socket.on("newMessage", handleNewMessage);

  return () => socket.off("newMessage", handleNewMessage);
};

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
