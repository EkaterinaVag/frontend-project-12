import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const socket = io();

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      headers.set('Authorization', authHeader.Authorization);
      return headers;
    },
  }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const handleNewChannel = (payload) => {
            chatApi.endpoints.getChannels.initiate(payload);
            updateCachedData((draft) => {
              draft.push(payload);
            });
          };

          socket.on('newChannel', handleNewChannel);
        } catch (err) {
          console.error(err);
        }
        await cacheEntryRemoved;
        socket.close();
      },
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        url: 'channels',
        method: 'POST',
        body: { name: channelName },
      }),
      invalidatesTags: ['Channel'],
    }),
    renameChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const handleRenameChannel = (payload) => {
            chatApi.endpoints.renameChannel.initiate(payload);
            updateCachedData((draft) => {
              draft.push(payload);
            });
          };

          socket.on('renameChannel', handleRenameChannel);
        } catch (err) {
          console.error(err);
        }
        await cacheEntryRemoved;
        socket.close();
      },
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const handleRemoveChannel = (payload) => {
            chatApi.endpoints.removeChannel.initiate(payload);
            updateCachedData((draft) => {
              draft.push(payload);
            });
          };

          socket.on('removeChannel', handleRemoveChannel);
        } catch (err) {
          console.error(err);
        }
        await cacheEntryRemoved;
        socket.close();
      },
      invalidatesTags: ['Channel', 'Message'],
    }),
    removeMessages: builder.mutation({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const handleNewMessage = (payload) => {
            if (chatApi.endpoints && chatApi.endpoints.getMessage) {
              chatApi.endpoints.getMessage.initiate(payload);
            }
            updateCachedData((draft) => {
              draft.push(payload);
            });
          };

          socket.on('newMessage', handleNewMessage);
        } catch (err) {
          console.error(err);
        }
        await cacheEntryRemoved;
        socket.close();
      },
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
