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
    renameChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `channels/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Channel"],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Channel", "Message"],
      extraReducers: (builder) => {
        builder.addCase(
          chatApi.endpoints.removeChannel.fulfilled,
          (state, action) => {
            const channelId = action.payload.id;
            const messagesToDelete = state.entities.messages.filter(
              (message) => message.channelId === channelId
            );

            messagesToDelete.forEach((message) => {
              chatApi.endpoints.removeMessages.initiate(message.id);
            });
          }
        );
      },
    }),
    removeMessages: builder.mutation({
      query: (id) => ({
        url: `messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
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
const handleNewMessage = () => chatApi.endpoints.getMessage.initiate();
const handleNewChannel = () => chatApi.endpoints.getChannels.initiate();
const handleRemoveChannel = () => chatApi.endpoints.getChannels.initiate();
const handleRenameChannel = () => chatApi.endpoints.getChannels.initiate();

export const setupSocket = () => {
  socket.on("newMessage", handleNewMessage);
  socket.on("newChannel", handleNewChannel);
  socket.on("removeChannel", handleRemoveChannel);
  socket.on("renameChannel", handleRenameChannel);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("newChannel", handleNewChannel);
    socket.off("removeChannel", handleRemoveChannel);
    socket.off("renameChannel", handleRenameChannel);
  };
};

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
