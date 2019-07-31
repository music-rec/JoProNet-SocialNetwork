import axios from "axios";

import { setAlert } from "./alertAct";

import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// This fct is for Register a User
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
