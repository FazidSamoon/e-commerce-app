import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      user
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
