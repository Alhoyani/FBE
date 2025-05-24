// features/loading/loadingSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  requestsInProgress: number;
}

const initialState: LoadingState = {
  requestsInProgress: 0,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Increase count on any '/pending' action
    builder.addMatcher(
      (action) => action.type.endsWith('/pending') && !location.pathname.includes('/Loading'),
      (state) => {
        state.requestsInProgress += 1;
      },
    );

    // Decrease count on any '/fulfilled' or '/rejected' action
    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        // Make sure we never go below zero
        state.requestsInProgress = Math.max(0, state.requestsInProgress - 1);
      },
    );
  },
});

export default loadingSlice.reducer;
