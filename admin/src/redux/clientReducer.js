import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getClientStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getClientSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.clients = action.payload;
    },
    getClientFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getClientFail, getClientStart, getClientSuccess } =
  clientSlice.actions;
export default clientSlice.reducer;
