import { checkingCredentials, login, logout } from "./authSlice";
import axios from "axios";

export const startCreatingUser =
  ({ name, email, password }) =>
  async dispatch => {
    try {
      dispatch(checkingCredentials());

      const { data } = await axios.post("api/auth/new", { name, email, password });

      if (data.ok) {
        dispatch(login(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(logout(error.response.data.msg));
    }
  };

export const startLogin =
  ({ email, password }) =>
  async dispatch => {
    try {
      dispatch(checkingCredentials());

      const { data } = await axios.post("api/auth", { email, password });

      if (data.ok) {
        dispatch(login(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(logout(error.response.data.msg));
    }
  };
