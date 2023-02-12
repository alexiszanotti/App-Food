import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleOAuthProvider } from "@react-oauth/google";
dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='907949072856-gnarm67dgi4me5to2rm7prff1tkj33rt.apps.googleusercontent.com'>
        ;
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
