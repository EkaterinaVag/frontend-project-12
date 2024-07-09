import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
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
    addChannel: builder.mutation({
      query: (channelName) => ({
        url: "channels",
        method: "POST",
        body: { name: channelName },
      }),
      invalidatesTags: ["Channel"],
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

const socket = io();
const handleNewMessage = () => chatApi.endpoints.getMessage.invalidate();
const handleNewChannel = () => chatApi.endpoints.getChannels.invalidate();

export const setupSocket = () => {
  socket.on("newMessage", handleNewMessage);
  socket.on("newChannel", handleNewChannel);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("newChannel", handleNewChannel);
  };
};

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
