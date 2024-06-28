import { configureStore } from "@reduxjs/toolkit";
import { channelsApi } from "./ChannelsApi";
import { messagesApi } from "./MessagesApi";

export const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      channelsApi.middleware,
      messagesApi.middleware
    ),
});
