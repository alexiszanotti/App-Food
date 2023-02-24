import { useDispatch, useSelector } from "react-redux";
import usersApi from "../api/usersApi";
import { checkingCredentials, clearErrorMEssage, login, logout } from "../Redux/slice";

export const useAuthStore = () => {
  const { status, errorMessage, name, email, uid } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const startLogin =
    ({ email, password }) =>
    async dispatch => {
      dispatch(checkingCredentials());
      try {
        const { data } = await usersApi.post("/api/auth", { email, password });

        localStorage.setItem("token", data.token);

        dispatch(login(data));
      } catch (error) {
        console.log(error);
        dispatch(logout(error.response.data.msg));

        setTimeout(() => {
          dispatch(clearErrorMEssage());
        }, 10);
      }
    };

  const startRegister = async ({ name, email, password }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await usersApi.post("/api/auth/new", { name, email, password });
      localStorage.setItem("token", data.token);
      dispatch(login(data));
    } catch (error) {
      dispatch(logout(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrorMEssage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(logout());

    try {
      const { data } = await usersApi("/api/auth/renew");
      localStorage.setItem("token", data.token);
      dispatch(login(data));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(logout(error.response?.data?.msg));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return {
    status,
    errorMessage,
    name,
    email,
    uid,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
