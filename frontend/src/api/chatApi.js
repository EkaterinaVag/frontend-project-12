import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleSocketEvents from './handleSocketEvents';

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
        handleSocketEvents(
          'newChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
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
        handleSocketEvents(
          'renameChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
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
        handleSocketEvents(
          'removeChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
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
        handleSocketEvents(
          'newMessage',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        );
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
