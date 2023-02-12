import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", //not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  phoyoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    checkingCredentials: (state, { payload }) => {},
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
