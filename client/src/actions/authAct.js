import axios from "axios";

import { setAlert } from "./alertAct";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";

import setAuthToken from "../utils/setAuthToken";

// This fct is for REGISTER a USER
export const registerAct = (
  apiUrl,
  name,
  email,
  password
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log("registerAct", apiUrl, name, email, password);
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(`${apiUrl}/api/users`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser(apiUrl));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, null, "error")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// This fct is to LOAD a USER
// Check if there is a TOKEN if there is
// Then put it in the global header
export const loadUser = apiUrl => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  console.log("loadUSer", apiUrl);
  try {
    const res = await axios.get(`${apiUrl}/api/auth`);

    console.log("loadUser", res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// To LOGIN a USER
export const loginAct = (apiUrl, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // console.log("loginAct", apiUrl, email, password);
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${apiUrl}/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser(apiUrl));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, null, "error")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// To LOGOUT a user
export const logoutAct = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};