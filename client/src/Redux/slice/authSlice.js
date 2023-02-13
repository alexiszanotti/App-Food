import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-authenticated", //checking, authenticated
  uid: null,
  email: null,
  name: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.name = payload.name;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = payload.errorMessage;
    },
    checkingCredentials: state => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
