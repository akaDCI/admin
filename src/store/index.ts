import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./queries/base";
import { authAPI } from "./queries/auth";
import auth from "./slices/auth";
import { clusterApi } from "./queries/cluster";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [clusterApi.reducerPath]: clusterApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(authAPI.middleware)
      .concat(clusterApi.middleware),
  // .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
